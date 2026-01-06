import os
import re

# Directory containing hotel content
HOTELS_DIR = 'c:/Users/rossd/source/naples-vacation-planner/content/hotels'

# Available High-Quality Assets
IMAGES = {
    'marco': '/images/placeholders/marco_island_tigertail_beach_aerial_4k.jpg',
    'golf': '/images/placeholders/naples-championship-golf-course.jpg',
    'beach_aerial': '/images/placeholders/naples_beach_aerial_4k.jpg',
    'pier': '/images/placeholders/naples_pier_sunny_winter_day_4k.jpg',
    'downtown_5th': '/images/placeholders/old_naples_5th_avenue_4k.jpg',
    'downtown_3rd': '/images/placeholders/naples_3rd_street_south_shopping_4k.png',
    'waterfront': '/images/placeholders/naples_tin_city_waterfront.jpg',
    'nature': '/images/placeholders/naples_clam_pass_boardwalk_4k.jpg',
    'resort_pool': '/images/where-to-stay/vanderbilt-beach-resort-pool.jpg',
    'sunset': '/images/placeholders/naples_pier_sunset_4k.jpg',
    'luxury_generic': '/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg'
}

def get_best_image(content, filename):
    content_lower = content.lower()
    
    # Specific Overrides (Already Fixed - skip if possible, but identifying them is safe)
    if 'ritz-carlton-naples.mdx' in filename: return None 
    if 'laplaya-beach-golf.mdx' in filename: return None
    if 'inn-on-fifth.mdx' in filename: return None
    if 'naples-grande.mdx' in filename: return None
    if 'edgewater-beach-hotel.mdx' in filename: return None
    if 'bellasera-resort.mdx' in filename: return None
    if 'ritz-carlton-tiburon.mdx' in filename: return None

    # Logic
    if 'marco island' in content_lower:
        return IMAGES['marco']
    
    if 'golf' in content_lower and ('resort' in content_lower or 'club' in content_lower):
        return IMAGES['golf']

    if 'bayfront' in content_lower or 'cove' in content_lower or 'marina' in content_lower:
        return IMAGES['waterfront']

    if 'old naples' in content_lower or '5th avenue' in content_lower or 'downtown' in content_lower:
        # Alternating logic could be added, but 5th Ave is the safest bet for downtown hotels
        if 'boutique' in content_lower:
            return IMAGES['downtown_3rd']
        return IMAGES['downtown_5th']

    if 'beachfront' in content_lower or 'on the beach' in content_lower:
        return IMAGES['beach_aerial']

    if 'vanderbilt beach' in content_lower:
        return IMAGES['luxury_generic']

    if 'north naples' in content_lower:
        return IMAGES['nature'] # Clam pass vibe

    # Fallback for affordable/standard hotels
    return IMAGES['sunset']

def process_files():
    count = 0
    for filename in os.listdir(HOTELS_DIR):
        if not filename.endswith('.mdx'):
            continue
            
        filepath = os.path.join(HOTELS_DIR, filename)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check if already using a specific image (not placeholder/svg)
        # But we want to replace "hotel-*.jpg" placeholders specifically
        current_image_match = re.search(r'featuredImage:\s*(.+)', content)
        if current_image_match:
            current_image = current_image_match.group(1).strip()
            # If it's already one of our high quality ones, skip
            if '4k' in current_image or 'dramatic' in current_image or 'placeholders/naples' in current_image:
                 continue
                 
        new_image = get_best_image(content, filename)
        
        if new_image:
            # Replace the featuredImage line
            new_content = re.sub(r'featuredImage:.*', f'featuredImage: {new_image}', content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename} -> {new_image}")
            count += 1
            
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    process_files()
