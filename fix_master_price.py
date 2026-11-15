f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

# аменяем отображение total_amount на ": после закрытия"
old = """<div style={{ fontWeight: 'bold', color: '#16a34a' }}>{order.total_amount || 0} </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{formatDate(order.created_at)}</div>"""

new = """<div style={{ fontWeight: 'bold', color: '#6b7280', fontSize: '12px' }}>: после закрытия</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{formatDate(order.created_at)}</div>"""

content = content.replace(old, new)

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)
print('Master page fixed!')