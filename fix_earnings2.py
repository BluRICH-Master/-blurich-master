p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(p, 'r', encoding='utf-8-sig') as f:
    lines = f.readlines()

# аменяем строки 221-224 (индексы 220-223) на блок с расчётом 
new_block = [
    "  const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single()\n",
    "  const { data: master } = await supabase.from('masters').select('commission_percent').eq('id', order.master_id).single()\n",
    "  const commissionPercent = master?.commission_percent || 60\n",
    "\n",
    "  const { data: svcs } = await supabase.from('order_services').select('*').eq('order_id', orderId)\n",
    "  const servicesTotal = (svcs || []).reduce((sum, s) => sum + ((s.price || 0) * (s.quantity || 1)), 0)\n",
    "  const earnings = servicesTotal * (commissionPercent / 100)\n",
    "\n",
    "  const { error } = await supabase.from('orders').update({\n",
    "    status: 'completed',\n",
    "    master_earnings: earnings\n",
    "  }).eq('id', orderId)\n",
]

lines[220:224] = new_block
print('Строки 221-224 заменены на блок с расчётом ')

with open(p, 'w', encoding='utf-8-sig') as f:
    f.writelines(lines)
print('DONE')

# роверка
with open(p, 'r', encoding='utf-8-sig') as f:
    lines2 = f.readlines()
for i in range(217, 245):
    print(f'{i+1}: {lines2[i].rstrip()}')