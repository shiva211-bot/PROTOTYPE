import urllib.request
import os
import json
from PIL import Image

assets_dir = r"C:\Users\kd\.gemini\antigravity\scratch\shruti-silk-stories\assets"

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}

# High-Res replacement sources
targets = {
    # 1. Showroom luxury interior (1920x1080)
    "hd_showroom.jpg": "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1920&q=85",
    
    # 2. Bride seated in royal red saree with temple jewelry (1600x1200)
    "hd_bride_seated.jpg": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85",
    
    # 3. Orange / Rust Banarasi Saree
    "hd_mood_orange.jpg": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85",

    # 4. Featured Royal Bridal Portrait
    "hd_bridal_feature.jpg": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85",

    # 5. Bridal cards (4 distinct rich saree closeups/portraits)
    "hd_bridal_1.jpg": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
    "hd_bridal_2.jpg": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85",
    "hd_bridal_3.jpg": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85",
    "hd_bridal_4.jpg": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",

    # 6. Trends editorial models
    "hd_trends_models.jpg": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",

    # 7. Autumn winter arches
    "hd_aw_1.jpg": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
    "hd_aw_2.jpg": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85",
    "hd_aw_3.jpg": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85",
}

for name, url in targets.items():
    dest = os.path.join(assets_dir, name)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as response, open(dest, 'wb') as out_file:
            out_file.write(response.read())
        im = Image.open(dest)
        print(f"Downloaded {name}: {im.size[0]}x{im.size[1]} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed {name}: {e}")

print("All targets processed.")
