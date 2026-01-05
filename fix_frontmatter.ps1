# PowerShell script to fix itinerary frontmatter
# Replaces theme/bestFor/price fields with required pace/audience fields

$itinerariesPath = "c:\Users\rossd\source\naples-vacation-planner\content\itineraries"
$files = Get-ChildItem -Path $itinerariesPath -Filter "*.mdx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Check if file has the invalid frontmatter pattern (theme: instead of pace:)
    if ($content -match 'theme:\s*"[^"]*"') {
        Write-Host "Fixing: $($file.Name)"
        
        # Replace the pattern:
        # days: N
        # theme: "..."
        # bestFor: "..."
        # price: $+
        # 
        # With:
        # days: N
        # pace: relaxed
        # audience: all
        
        $newContent = $content -replace '(days:\s*\d+)\r?\ntheme:\s*"[^"]*"\r?\nbestFor:\s*"[^"]*"\r?\nprice:\s*\$+', '$1
pace: relaxed
audience: all'
        
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "  Fixed: $($file.Name)"
    }
    else {
        Write-Host "Skipping (already valid): $($file.Name)"
    }
}

Write-Host "`nDone! Fixed all files."
