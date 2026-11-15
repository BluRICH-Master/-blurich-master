f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

# 1. Убираем отображение total_amount в активных заявках (заменяем на прочерк)
old_active_price = """<div style={{ fontWeight: 'bold', color: '#16a34a' }}>{order.total_amount || 0} </div>"""
new_active_price = """<div style={{ fontWeight: 'bold', color: '#6b7280', fontSize: '12px' }}>: после закрытия</div>"""
content = content.replace(old_active_price, new_active_price)

# 2.  выполненных заявках показываем  вместо общей суммы
old_completed = """<div style={{ fontWeight: 'bold', color: '#16a34a' }}>{order.total_amount || 0} </div>
                      <div style={{ fontSize: '12px', color: '#9333ea' }}>: {order.master_earnings || 0} </div>"""
new_completed = """<div style={{ fontWeight: 'bold', color: '#9333ea' }}>: {order.master_earnings || 0} </div>"""
content = content.replace(old_completed, new_completed)

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)
print('Master page fixed!')