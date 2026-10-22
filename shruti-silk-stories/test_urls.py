import urllib.request
import json

queries = ["indian saree", "kanjivaram saree", "banarasi saree", "indian bride red saree", "silk saree boutique showroom", "handloom weaving loom india"]

# Test unsplash source or search
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

test_urls = {
    "hero_showroom": "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1920&q=85", # luxury boutique interior
    "bride_red": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85", # bridal red saree
    "teal_saree": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85",
    "mustard_saree": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85",
    "loom": "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1600&q=85"
}

for name, url in test_urls.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            print(f"SUCCESS {name}: {len(data)} bytes")
    except Exception as e:
        print(f"FAILED {name}: {e}")
