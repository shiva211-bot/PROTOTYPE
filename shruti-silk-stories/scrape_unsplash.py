import urllib.request
import re

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def get_photo_urls(search_term):
    url = f"https://unsplash.com/s/photos/{search_term}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8')
            # Look for photo urls: https://images.unsplash.com/photo-[a-zA-Z0-9_-]+
            matches = re.findall(r'https://images\.unsplash\.com/photo-([a-zA-Z0-9_-]+)', html)
            # deduplicate while preserving order
            seen = set()
            unique_ids = []
            for m in matches:
                # ignore tiny parameters
                base = m.split('?')[0]
                if base not in seen and len(base) > 8:
                    seen.add(base)
                    unique_ids.append(base)
            return unique_ids
    except Exception as e:
        print(f"Error {search_term}: {e}")
        return []

saree_ids = get_photo_urls("saree")
print("Saree IDs:", len(saree_ids), saree_ids[:10])

bride_ids = get_photo_urls("indian-bride")
print("Bride IDs:", len(bride_ids), bride_ids[:10])

boutique_ids = get_photo_urls("luxury-boutique")
print("Boutique IDs:", len(boutique_ids), boutique_ids[:10])
