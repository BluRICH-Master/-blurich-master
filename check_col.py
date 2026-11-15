import urllib.request, json

url = key = None
with open(r'C:\Users\Lenovo\Desktop\BluRICHMaster\.env.local', encoding='utf-8') as f:
    for line in f:
        if line.startswith('NEXT_PUBLIC_SUPABASE_URL='):
            url = line.split('=', 1)[1].strip().strip('"').strip("'")
        elif line.startswith('NEXT_PUBLIC_SUPABASE_ANON_KEY='):
            key = line.split('=', 1)[1].strip().strip('"').strip("'")

print('URL:', url)
req = urllib.request.Request(url + '/rest/v1/orders?select=master_earnings&limit=1',
                             headers={'apikey': key, 'Authorization': 'Bearer ' + key})
try:
    with urllib.request.urlopen(req) as r:
        data = json.loads(r.read().decode())
        print('OK, колонка master_earnings СТ')
        print('начения:', data)
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print('HTTP', e.code, body[:300])
    if 'master_earnings' in body and ('does not exist' in body or 'column' in body.lower()):
        print('Ы: колонки master_earnings Т  нужно добавить в Supabase')