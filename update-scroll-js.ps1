# PowerShell script to update HTML files to use external scroll.js
Get-ChildItem -Filter "*.html" | ForEach-Object {
    Write-Host "Processing $($_.Name)..."
    
    $content = Get-Content $_.FullName -Raw
    
    # Check if the file has scroll-to-top JavaScript code
    if ($content -match 'scrollToTopBtn\.addEventListener') {
        # Replace the entire script block with a link to scroll.js
        $newContent = $content -replace '(?s)    <!-- Scroll to top functionality -->\s*<script>.*?</script>', '    <!-- Scroll to top functionality -->`n    <script src="scroll.js"></script>'
        
        # Write the updated content back to the file
        Set-Content $_.FullName $newContent -NoNewline
        Write-Host "  $($_.Name) updated successfully"
    } else {
        Write-Host "  $($_.Name) - no scroll JavaScript found - skipping"
    }
}

Write-Host "Scroll JavaScript update complete!"
