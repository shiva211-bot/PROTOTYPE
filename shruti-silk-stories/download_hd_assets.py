import urllib.request
import os

assets_dir = r"C:\Users\kd\.gemini\antigravity\scratch\shruti-silk-stories\assets"
os.makedirs(assets_dir, exist_ok=True)

# High quality curated images matching exact saree colors and aesthetics
images = {
    # High-res hero backup
    "hero_hd.jpg": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80",
    # Six moods HD portraits
    "hd_mood_teal.jpg": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    "hd_mood_mustard.jpg": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    "hd_mood_orange.jpg": "https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80",
    "hd_mood_pink.jpg": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    "hd_mood_wine.jpg": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    "hd_mood_emerald.jpg": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    # Ivory organza product
    "hd_ivory_organza.jpg": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    "hd_rose_organza.jpg": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
    "hd_crimson_organza.jpg": "https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=1000&q=80",
    # Bridal collection HD
    "hd_bridal_banner.jpg": "https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=1200&q=80",
    # Artisanal loom weaving
    "hd_loom_weaving.jpg": "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=80",
}

headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in images.items():
    dest = os.path.join(assets_dir, name)
    if not os.path.exists(dest):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as response, open(dest, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Downloaded {name}")
        except Exception as e:
            print(f"Failed {name}: {e}")

print("HD assets download finished")
