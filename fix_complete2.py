p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# овая функция (строки 218-232 заменяем целиком, индексы 217-231)
new_func = [
    "  const handleCompleteOrder = async (orderId: number) => {\n",
    "    if (!confirm('\u041e\u0442\u043c\u0435\u0442\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443 \u043a\u0430\u043a \u0438\u0441\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u0443\u044e?')) return\n",
    "\n",
    "    const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single()\n",
    "    const { data: master } = await supabase.from('masters').select('commission_percent').eq('id', order.master_id).single()\n",
    "    const commissionPercent = master?.commission_percent || 60\n",
    "\n",
    "    const { data: svcs } = await supabase.from('order_services').select('*').eq('order_id', orderId)\n",
    "    const servicesTotal = (svcs || []).reduce((sum, s) => sum + ((s.price || 0) * (s.quantity || 1)), 0)\n",
    "    const earnings = servicesTotal * (commissionPercent / 100)\n",
    "\n",
    "    const { error } = await supabase.from('orders').update({\n",
    "      status: 'completed',\n",
    "      master_earnings: earnings\n",
    "    }).eq('id', orderId)\n",
    "\n",
    "    if (error) {\n",
    "      alert('\u041e\u0448\u0438\u0431\u043a\u0430: ' + error.message)\n",
    "    } else {\n",
    "      alert('\u0417\u0430\u044f\u0432\u043a\u0430 \u043e\u0442\u043c\u0435\u0447\u0435\u043d\u0430 \u043a\u0430\u043a \u0438\u0441\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u0430\u044f!')\n",
    "      loadData()\n",
    "    }\n",
    "  };\n",
]

# аменяем строки 218-232 (индексы 217-231 включительно)
lines[217:232] = new_func

with open(p, 'w', encoding='utf-8-sig') as f:
    f.writelines(lines)

print('DONE: функция handleCompleteOrder обновлена')

# роверка
with open(p, 'r', encoding='utf-8') as f:
    lines2 = f.readlines()
for i in range(217, 245):
    print(f'{i+1}: {lines2[i].rstrip()}')