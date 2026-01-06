import os
import re

HOTELS_DIR = 'c:/Users/rossd/source/naples-vacation-planner/content/hotels'
NEIGHBORHOODS_DIR = 'c:/Users/rossd/source/naples-vacation-planner/content/where-to-stay'

# Files that we specifically verified or generated unique images for. KEEP THESE.
KEEP_IMAGES = [
    # Hotels (Manually Fixed)
    'ritz-carlton-naples.mdx',
    'laplaya-beach-golf.mdx',
    'inn-on-fifth.mdx',
    'naples-grande.mdx',
    'bellasera-resort.mdx',
    'edgewater-beach-hotel.mdx',
    'ritz-carlton-tiburon.mdx', # I'll keep this one as the primary "golf" user
    'ac-hotel-naples.mdx',      # Keep this one as the primary "3rd street" user if applicable, or maybe reset? User complained about imports. I'll keep for now.
    
    # Neighborhoods (Specifics)
    'marco-island.mdx', 
    'pelican-bay.mdx',
    'old-naples.mdx',
    'vanderbilt-beach.mdx',
    'park-shore.mdx'
]

def restore_placeholders():
    count = 0
    
    # 1. Process Hotels
    for filename in os.listdir(HOTELS_DIR):
        if not filename.endswith('.mdx'): continue
        if filename in KEEP_IMAGES: continue
        
        filepath = os.path.join(HOTELS_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
        
        # Reset to hotel placeholder
        if 'featuredImage:' in content:
            new_content = re.sub(r'featuredImage:.*', 'featuredImage: /images/placeholders/hotel.svg', content)
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f: f.write(new_content)
                print(f"Reset {filename}")
                count += 1

    # 2. Process Neighborhoods
    for filename in os.listdir(NEIGHBORHOODS_DIR):
        if not filename.endswith('.mdx'): continue
        if filename in KEEP_IMAGES: continue
        
        filepath = os.path.join(NEIGHBORHOODS_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
        
        # Reset to neighborhood placeholder
        if 'featuredImage:' in content:
            new_content = re.sub(r'featuredImage:.*', 'featuredImage: /images/placeholders/where-to-stay.svg', content)
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f: f.write(new_content)
                print(f"Reset {filename}")
                count += 1
                
    print(f"Restored {count} files to placeholders.")

if __name__ == "__main__":
    restore_placeholders()
