import urllib.request
import json
import urllib.parse

headers = {"User-Agent": "DriftSareesApp/1.0 (contact@driftsarees.com)"}

def search_wikimedia(query, limit=5):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(query)}&gsrlimit={limit}&prop=imageinfo&iiprop=url|size|mime&format=json"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            results = []
            for p in pages.values():
                info = p.get('imageinfo', [{}])[0]
                if 'url' in info and info.get('mime') in ['image/jpeg', 'image/png']:
                    results.append({
                        'title': p.get('title'),
                        'url': info.get('url'),
                        'width': info.get('width'),
                        'height': info.get('height')
                    })
            return results
    except Exception as e:
        print(f"Error {query}: {e}")
        return []

print("Wikimedia test:")
for r in search_wikimedia("Banarasi saree", 4):
    print(r['title'], r['width'], "x", r['height'], r['url'])
