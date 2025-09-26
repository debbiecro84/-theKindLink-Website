# PowerShell script to fix Facebook links
Get-ChildItem -Filter "*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $updatedContent = $content -replace 'href="#\" class="social-icon" aria-label="Facebook"', 'href="https://www.facebook.com/profile.php?id=61580385093642" class="social-icon" aria-label="Facebook"'
    if ($content -ne $updatedContent) {
        Set-Content -Path $_.FullName -Value $updatedContent -NoNewline
        Write-Host "Updated: $($_.Name)"
    }
}
Write-Host "Facebook links update completed!"
