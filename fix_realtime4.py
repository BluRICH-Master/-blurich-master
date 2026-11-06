f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\admin\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

# аходим и удаляем старый блок realtime
import re
old_pattern = r'        // Realtime.*?return \(\) => \{\s*supabase\.removeChannel\(subscription\);\s*\};\s*'
content = re.sub(old_pattern, '', content, flags=re.DOTALL)

# аходим место после fetchOrders(); fetchMasters(); fetchClients(); fetchServices(); fetchInventory();
target = "fetchOrders(); fetchMasters(); fetchClients(); fetchServices(); fetchInventory();"
new_code = """fetchOrders(); fetchMasters(); fetchClients(); fetchServices(); fetchInventory();

        // Realtime подписка на изменения заявок
        const subscription = supabase
          .channel('orders-changes')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `company_id=eq.${companyId}` }, (payload) => {
            fetchOrders();
          })
          .subscribe();

        return () => {
          supabase.removeChannel(subscription);
        };"""

content = content.replace(target, new_code, 1)

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)
print('отово!')