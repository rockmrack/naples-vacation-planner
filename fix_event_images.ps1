
$eventFiles = Get-ChildItem "content/events/*.mdx"
$sourceImage = "public/images/placeholders/naples-event-festival.jpg"

foreach ($file in $eventFiles) {
    $content = Get-Content $file.FullName
    $imageLine = $content | Select-String "featuredImage: (.*)"
    if ($imageLine) {
        $imagePath = $imageLine.Matches.Groups[1].Value.Trim()
        # Remove leading slash for local path resolution
        $localPath = "public" + ($imagePath -replace "/", "\")
        
        $directory = [System.IO.Path]::GetDirectoryName($localPath)
        if (-not (Test-Path $directory)) {
            New-Item -ItemType Directory -Path $directory -Force
        }

        if (-not (Test-Path $localPath)) {
            Write-Host "Creating placeholder for: $localPath"
            Copy-Item $sourceImage $localPath
        }
    }
}
