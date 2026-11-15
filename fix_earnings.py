p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\orders\[id]\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# аходим функцию completeOrder (строка 99)
for i, line in enumerate(lines):
    if 'const completeOrder = async () => {' in line:
        # ставляем расчёт  перед update статуса
        calc_code = """  const completeOrder = async () => {
    // агружаем мастера для получения процента
    const { data: master } = await supabase.from('masters').select('commission_percent').eq('id', order.master_id).single();
    const commissionPercent = master?.commission_percent || 60;
    
    // Считаем сумму услуг
    const { data: svcs } = await supabase.from('order_services').select('*').eq('order_id', orderId);
    const servicesTotal = (svcs || []).reduce((sum, s) => sum + ((s.price || 0) * (s.quantity || 1)), 0);
    
    // Считаем 
    const earnings = servicesTotal * (commissionPercent / 100);
    
    // бновляем заявку
    await supabase.from('orders').update({ 
      status: 'completed',
      master_earnings: earnings
    }).eq('id', orderId);
    loadData();
  };"""
        
        # аменяем старую функцию (строки 99-102)
        lines[i] = calc_code + '\n'
        # Удаляем следующие 3 строки (старое тело функции)
        for j in range(3):
            if i+1 < len(lines):
                lines.pop(i+1)
        
        print(f'Функция completeOrder обновлена в строке {i+1}')
        break

with open(p, 'w', encoding='utf-8-sig') as f:
    f.writelines(lines)

print('DONE')