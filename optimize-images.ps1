# Image Optimization Script
# Resizes and compresses images for web performance

param(
    [string]$ImagePath = "images\explore-images",
    [int]$MaxWidth = 1920,
    [int]$JpegQuality = 85
)

# Add .NET assembly for image processing
Add-Type -AssemblyName System.Drawing

function Optimize-Image {
    param(
        [string]$FilePath,
        [int]$MaxWidth,
        [int]$JpegQuality
    )
    
    try {
        $file = Get-Item $FilePath
        $originalSize = $file.Length
        $originalSizeKB = [math]::Round($originalSize / 1KB, 2)
        
        # Load original image
        $image = [System.Drawing.Image]::FromFile($file.FullName)
        $originalWidth = $image.Width
        $originalHeight = $image.Height
        
        # Check if resizing is needed
        $needsResize = $originalWidth -gt $MaxWidth
        
        if ($needsResize) {
            # Calculate new dimensions maintaining aspect ratio
            $ratio = $MaxWidth / $originalWidth
            $newWidth = $MaxWidth
            $newHeight = [int]($originalHeight * $ratio)
            
            Write-Host "Resizing: $($file.Name)" -ForegroundColor Yellow
            Write-Host "  Original: ${originalWidth}x${originalHeight} (${originalSizeKB} KB)" -ForegroundColor Gray
            Write-Host "  New: ${newWidth}x${newHeight}" -ForegroundColor Gray
            
            # Create new bitmap with new dimensions
            $newBitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            $graphics = [System.Drawing.Graphics]::FromImage($newBitmap)
            
            # High-quality resizing
            $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            
            # Draw resized image
            $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
            
            # Create backup of original
            $backupPath = $file.FullName -replace '\.(jpg|jpeg|png)$', '.original.$1'
            if (-not (Test-Path $backupPath)) {
                Copy-Item $file.FullName $backupPath
                Write-Host "  Backup created: $backupPath" -ForegroundColor DarkGray
            }
            
            # Get file extension first
            $extension = $file.Extension.ToLower()
            
            # Save to temporary file first (can't overwrite file that's in use)
            $tempFile = [System.IO.Path]::GetTempFileName()
            $tempPath = $tempFile -replace '\.tmp$', $extension
            
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $JpegQuality)
            
            $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
            $pngCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/png" }
            
            # Close original image first (must close before saving new one)
            $image.Dispose()
            
            if ($extension -match '\.(jpg|jpeg)$' -and $jpegCodec) {
                $newBitmap.Save($tempPath, $jpegCodec, $encoderParams)
            }
            elseif ($extension -eq '.png' -and $pngCodec) {
                $newBitmap.Save($tempPath, $pngCodec)
            }
            else {
                $newBitmap.Save($tempPath)
            }
            
            # Cleanup
            $graphics.Dispose()
            $newBitmap.Dispose()
            
            # Replace original with optimized version
            Remove-Item $file.FullName -Force
            Move-Item $tempPath $file.FullName -Force
            
            # Clean up temp file if it still exists
            if (Test-Path $tempFile) {
                Remove-Item $tempFile -ErrorAction SilentlyContinue
            }
            
            # Get new file size
            $newFile = Get-Item $file.FullName
            $newSize = $newFile.Length
            $newSizeKB = [math]::Round($newSize / 1KB, 2)
            $savings = [math]::Round(($originalSize - $newSize) / 1KB, 2)
            $savingsPercent = [math]::Round((($originalSize - $newSize) / $originalSize) * 100, 1)
            
            Write-Host "  Optimized: ${newSizeKB} KB (Saved ${savings} KB, ${savingsPercent}%)" -ForegroundColor Green
        }
        else {
            Write-Host "Skipping: $($file.Name) - already ${originalWidth}px wide (${originalSizeKB} KB)" -ForegroundColor Cyan
            if ($null -ne $image) {
                $image.Dispose()
            }
        }
        
        return @{
            Processed = $needsResize
            OriginalSize = $originalSizeKB
            NewSize = if ($needsResize) { $newSizeKB } else { $originalSizeKB }
        }
    }
    catch {
        Write-Host "Error processing $FilePath : $($_.Exception.Message)" -ForegroundColor Red
        return @{ Processed = $false; Error = $_.Exception.Message }
    }
}

# Main execution
Write-Host "`n=== Image Optimization Script ===" -ForegroundColor Cyan
Write-Host "Target folder: $ImagePath" -ForegroundColor Cyan
Write-Host "Max width: ${MaxWidth}px" -ForegroundColor Cyan
Write-Host "JPEG quality: ${JpegQuality}%" -ForegroundColor Cyan
Write-Host ""

# Get all image files, sorted by size (largest first)
$images = Get-ChildItem -Path $ImagePath -File | 
    Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' -and $_.Name -notmatch '\.original\.' } |
    Sort-Object Length -Descending

if ($images.Count -eq 0) {
    Write-Host "No images found in $ImagePath" -ForegroundColor Yellow
    exit
}

Write-Host "Found $($images.Count) images to process`n" -ForegroundColor Cyan

$totalOriginal = 0
$totalNew = 0
$processedCount = 0

foreach ($image in $images) {
    $result = Optimize-Image -FilePath $image.FullName -MaxWidth $MaxWidth -JpegQuality $JpegQuality
    if ($result.Processed) {
        $totalOriginal += $result.OriginalSize
        $totalNew += $result.NewSize
        $processedCount++
    }
    Write-Host ""
}

# Summary
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Images processed: $processedCount" -ForegroundColor Green
Write-Host "Total original size: $([math]::Round($totalOriginal, 2)) KB" -ForegroundColor Gray
Write-Host "Total optimized size: $([math]::Round($totalNew, 2)) KB" -ForegroundColor Green
Write-Host "Total saved: $([math]::Round($totalOriginal - $totalNew, 2)) KB" -ForegroundColor Green
Write-Host ""

