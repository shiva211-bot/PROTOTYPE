import urllib.request
import json
import re

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}

def search_unsplash(query, count=5):
    url = f"https://unsplash.com/napi/search/photos?query={urllib.parse.quote(query)}&per_page={count}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            results = []
            for item in data.get('results', []):
                results.append({
                    'id': item['id'],
                    'url': item['urls']['raw'],
                    'alt': item.get('alt_description', '')
                })
            return results
    except Exception as e:
        print(f"Error searching {query}: {e}")
        return []

queries = {
    'showroom': 'luxury boutique interior store fashion',
    'bride_seated': 'indian bride red saree traditional jewellery',
    'teal_saree': 'woman in blue teal saree',
    'mustard_saree': 'woman in yellow saree indian',
    'orange_saree': 'woman in orange red saree indian',
    'pink_saree': 'woman in pink saree indian traditional',
    'wine_saree': 'woman in maroon dark red saree indian',
    'emerald_saree': 'woman in green saree indian',
    'bridal_red': 'indian bride portrait red lehenga saree',
    'organza_ivory': 'woman in white ivory traditional dress saree',
    'organza_rose': 'woman in pastel pink peach saree',
    'loom': 'weaving loom textiles artisan india',
    'trends': 'indian women fashion traditional modern saree'
}

for k, q in queries.items():
    res = search_unsplash(q, 2)
    print(f"=== {k} ({q}) ===")
    for r in res:
        print(f"  ID: {r['id']} - {r['url'][:60]}... - {r['alt']}")
