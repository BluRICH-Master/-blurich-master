f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\admin\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    lines = file.readlines()

for i, line in enumerate(lines):
    if i == 112 and 'fetchOrders(); fetchMasters()' in line:
        indent = '        '
        realtime_code = f"""{indent}
{indent}// Realtime подписка на изменения заявок
{indent}const subscription = supabase
{indent}  .channel('orders-changes')
{indent}  .on('postgres_changes', {{ event: '*', schema: 'public', table: 'orders', filter: f'company_id=eq.{{companyId}}' }}, (payload) => {{
{indent}    fetchOrders();
{indent}  }})
{indent}  .subscribe();
{indent}
{indent}return () => {{
{indent}  supabase.removeChannel(subscription);
{indent}}};
"""
        lines.insert(i+2, realtime_code)
        print('Realtime-подписка добавлена после строки', i+1)
        break

with open(f, 'w', encoding='utf-8') as file:
    file.writelines(lines)
print('отово!')