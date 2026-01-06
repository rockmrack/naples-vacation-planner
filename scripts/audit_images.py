import os
import re

def scan_images(directory):
    if not os.path.exists(directory):
        print(f"Directory not found: {directory}")
        return

    print(f"\nScanning {directory}...")
    
    for filename in os.listdir(directory):
        if filename.endswith(".mdx"):
            filepath = os.path.join(directory, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
                
            match = re.search(r"featuredImage:\s*['\"]([^'\"]+)['\"]", content)
            if match:
                image_path = match.group(1)
                # print(f"{filename} -> {image_path}")
                
                # Check for generic indicators
                if "placeholders" in image_path or "svg" in image_path:
                    print(f"[PLACEHOLDER] {filename} -> {image_path}")
            else:
                print(f"[NO IMAGE] {filename}")

directories = [
    r"c:\Users\rossd\source\naples-vacation-planner\content\where-to-stay",
    r"c:\Users\rossd\source\naples-vacation-planner\content\hotels"
]

for d in directories:
    scan_images(d)
