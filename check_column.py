import os
from supabase import create_client

url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

if not url or not key:
    with open(r'C:\Users\Lenovo\Desktop\BluRICHMaster\.env.local', encoding='utf-8') as f:
        for line in f:
            if 'NEXT_PUBLIC_SUPABASE_URL=' in line:
                url = line.split('=', 1)[1].strip().strip('"')
            elif 'NEXT_PUBLIC_SUPABASE_ANON_KEY=' in line:
                key = line.split('=', 1)[1].strip().strip('"')

supabase = create_client(url, key)

response = supabase.table('orders').select('master_earnings').limit(1).execute()
if response.data:
    print(' master_earnings СТ в таблице orders')
    print(f'ример: {response.data[0]}')
else:
    print(' master_earnings Т или таблица пуста')