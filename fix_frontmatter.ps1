# PowerShell script to fix itinerary frontmatter - version 2
# More aggressive pattern matching to catch all variations

$itinerariesPath = "c:\Users\rossd\source\naples-vacation-planner\content\itineraries"
$files = Get-ChildItem -Path $itinerariesPath -Filter "*.mdx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $modified = $false
    
    # Check if file has theme: but no pace:
    if (($content -match 'theme:\s*"[^"]*"') -and -not ($content -match 'pace:\s*(relaxed|balanced|fast)')) {
        Write-Host "Fixing (missing pace): $($file.Name)"
        
        # Replace theme/bestFor/price with pace/audience
        $newContent = $content -replace '(days:\s*\d+)\r?\ntheme:\s*"[^"]*"\r?\nbestFor:\s*"[^"]*"\r?\nprice:\s*[^\r\n]+', '$1
pace: relaxed
audience: all'
        
        if ($newContent -ne $content) {
            Set-Content -Path $file.FullName -Value $newContent -NoNewline
            Write-Host "  Fixed successfully"
            $modified = $true
        }
    }
    
    # Check for files that have theme: between days: and pace: (needs theme removed)
    if (-not $modified -and ($content -match 'days:\s*\d+\r?\ntheme:\s*"[^"]*"\r?\npace:')) {
        Write-Host "Fixing (removing extra theme): $($file.Name)"
        
        $newContent = $content -replace '(days:\s*\d+)\r?\ntheme:\s*"[^"]*"(\r?\npace:)', '$1$2'
        
        if ($newContent -ne $content) {
            Set-Content -Path $file.FullName -Value $newContent -NoNewline
            Write-Host "  Fixed successfully" 
        }
    }
}

Write-Host "`nDone! Checking results..."

# Verify
$remaining = Get-ChildItem -Path $itinerariesPath -Filter "*.mdx" | ForEach-Object {
    $c = Get-Content $_.FullName -Raw
    if (($c -match 'theme:') -and -not ($c -match 'pace:')) {
        $_.Name
    }
}

if ($remaining) {
    Write-Host "Files still needing fixes:"
    $remaining | ForEach-Object { Write-Host "  - $_" }
}
else {
    Write-Host "All files have pace: field now!"
}
