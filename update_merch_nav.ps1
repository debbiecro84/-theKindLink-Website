# PowerShell script to add Merch navigation to all HTML pages
Get-ChildItem -Filter "*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Update desktop navigation - add MERCH before ABOUT/CONTACT
    $desktopNavPattern = '(<a href="information\.html" class="nav-link[^"]*">INFORMATION</a>\s*)(<a href="about\.html" class="nav-link[^"]*">ABOUT/CONTACT</a>)'
    $desktopNavReplacement = '$1<a href="merch.html" class="nav-link">MERCH</a>$2'
    $content = $content -replace $desktopNavPattern, $desktopNavReplacement
    
    # Update mobile navigation - add MERCH before ABOUT/CONTACT
    $mobileNavPattern = '(<a href="information\.html" class="mobile-nav-link[^"]*">INFORMATION</a>\s*)(<a href="about\.html" class="mobile-nav-link[^"]*">ABOUT/CONTACT</a>)'
    $mobileNavReplacement = '$1<a href="merch.html" class="mobile-nav-link">MERCH</a>$2'
    $content = $content -replace $mobileNavPattern, $mobileNavReplacement
    
    # Only write if content changed
    if ($content -ne (Get-Content $_.FullName -Raw)) {
        Set-Content -Path $_.FullName -Value $content -NoNewline
        Write-Host "Updated: $($_.Name)"
    }
}
Write-Host "Merch navigation update completed!"
