with open(r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

lines[418] = "                    <div style={{ fontSize: '14px', color: '#9333ea', fontWeight: 'bold' }}>: {order.master_earnings || 0} </div>\n"

btn = "                    <button onClick={() => openViewModal(order)} style={{ fontSize: '12px', color: '#2563eb', background: 'white', border: '1px solid #2563eb', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', marginTop: '6px' }}>росмотр</button>\n"
lines.insert(419, btn)

with open(r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('SUCCESS: нопка росмотр добавлена.')