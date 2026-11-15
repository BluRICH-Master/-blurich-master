p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# аходим функцию handleCompleteOrder (строка 218)
for i, line in enumerate(lines):
    if 'const handleCompleteOrder = async (orderId: number) => {' in line:
        # овая функция с расчётом 
        new_func = """  const handleCompleteOrder = async (orderId: number) => {
    if (!confirm('тметить заявку как исполненную?')) return;
    
    // агружаем заявку для получения master_id
    const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single();
    
    // агружаем мастера для получения процента
    const { data: master } = await supabase.from('masters').select('commission_percent').eq('id', order.master_id).single();
    const commissionPercent = master?.commission_percent || 60;
    
    // Считаем сумму услуг
    const { data: svcs } = await supabase.from('order_services').select('*').eq('order_id', orderId);
    const servicesTotal = (svcs || []).reduce((sum, s) => sum + ((s.price || 0) * (s.quantity || 1)), 0);
    
    // Считаем 
    const earnings = servicesTotal * (commissionPercent / 100);
    
    // бновляем заявку
    const { error } = await supabase.from('orders').update({ 
      status: 'completed',
      master_earnings: earnings
    }).eq('id', orderId);
    
    if (error) {
      alert('шибка: ' + error.message);
    } else {
      alert('аявка отмечена как исполненная!');
      loadData();
    }
  };"""
        
        # аменяем строки 218-230 (старая функция)
        lines[i] = new_func + '\n'
        # Удаляем следующие строки до loadData()
        j = i + 1
        while j < len(lines) and 'loadData()' not in lines[j]:
            lines.pop(j)
        # Удаляем строку с loadData() и закрывающую скобку
        if j < len(lines):
            lines.pop(j)  # loadData()
        if j < len(lines) and lines[j].strip() == '};':
            lines.pop(j)
        
        print(f'Функция handleCompleteOrder обновлена в строке {i+1}')
        break

with open(p, 'w', encoding='utf-8-sig') as f:
    f.writelines(lines)

print('DONE')