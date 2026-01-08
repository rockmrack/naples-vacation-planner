$restaurants = Get-ChildItem "content\restaurants\*.mdx"
$missing = @()
$placeholders = @()
$total = 0

foreach ($file in $restaurants) {
    $total++
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'featuredImage:\s*"?([^"\r\n]+)"?') {
        $imagePath = $matches[1].Trim()
        
        # Check if placeholder
        if ($imagePath -match "placeholder") {
            $placeholders += "$($file.Name) -> $imagePath"
        }
        
        # Check if file exists
        if ($imagePath.StartsWith("/")) {
            $relativePath = $imagePath.Substring(1)
        }
        else {
            $relativePath = $imagePath
        }
        
        $localPath = Join-Path "public" $relativePath
        
        if (-not (Test-Path $localPath)) {
            $missing += "$($file.Name) -> $imagePath (File NOT found)"
        }
    }
}

Write-Host "Checked $total files."
if ($placeholders.Count -gt 0) {
    Write-Host "--- Placeholders ---"
    $placeholders | ForEach-Object { Write-Host $_ }
}
if ($missing.Count -gt 0) {
    Write-Host "--- Missing Files ---"
    $missing | ForEach-Object { Write-Host $_ }
}
if ($placeholders.Count -eq 0 -and $missing.Count -eq 0) {
    Write-Host "All Clean!"
}
