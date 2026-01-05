$files = Get-ChildItem "content/itineraries/*.mdx"
$missing = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match "featuredImage:.*placeholder") {
        # Extract title
        if ($content -match "title: `"(.*)`"") {
            $title = $matches[1]
        }
        else {
            $title = $file.Name
        }
        $missing += "$($file.Name)|$title"
    }
}

$missing | Out-File "missing_images_itineraries.txt" -Encoding utf8
