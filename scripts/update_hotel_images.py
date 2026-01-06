# Directory containing content
HOTELS_DIR = 'c:/Users/rossd/source/naples-vacation-planner/content/hotels'
NEIGHBORHOODS_DIR = 'c:/Users/rossd/source/naples-vacation-planner/content/where-to-stay'

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
    
    # Specific overrides if needed
    if 'old-naples' in filename: return '/images/where-to-stay/old-naples-historic-cottage.jpg'
    if 'vanderbilt-beach' in filename: return '/images/where-to-stay/vanderbilt-beach-resort-pool.jpg'
    if 'pelican-bay' in filename: return '/images/where-to-stay/pelican-bay-tram-boardwalk.jpg'
    if 'park-shore' in filename: return '/images/where-to-stay/park-shore-venetian-village.jpg'

    # Logic
    if 'marco' in content_lower: return IMAGES['marco']
    if 'golf' in content_lower: return IMAGES['golf']
    if 'downtown' in content_lower: return IMAGES['downtown_5th']
    if 'waterfront' in content_lower or 'bay' in content_lower: return IMAGES['waterfront']
    if 'beach' in content_lower: return IMAGES['beach_aerial']
    if 'family' in content_lower: return IMAGES['nature']
    
    return IMAGES['sunset'] # Fallback

def process_files():
    count = 0
    dirs_to_process = [HOTELS_DIR, NEIGHBORHOODS_DIR]
    
    for d in dirs_to_process:
        if not os.path.exists(d): continue
        
        for filename in os.listdir(d):
            if not filename.endswith('.mdx'):
                continue
                
            filepath = os.path.join(d, filename)
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Check if using a generic placeholder
            current_image_match = re.search(r'featuredImage:\s*(.+)', content)
            if current_image_match:
                current_image = current_image_match.group(1).strip()
                # Skip if it's already a good image (4k, specific naples shots, or specific where-to-stay files)
                if '4k' in current_image or 'dramatic' in current_image or 'historic-cottage' in current_image or 'resort-pool' in current_image or 'tram-boardwalk' in current_image or 'venetian-village' in current_image:
                     continue
                     
            new_image = get_best_image(content, filename)
            
            if new_image:
                new_content = re.sub(r'featuredImage:.*', f'featuredImage: {new_image}', content)
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename} -> {new_image}")
                count += 1
            
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    process_files()
