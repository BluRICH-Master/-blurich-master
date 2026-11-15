with open(r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# аходим строку 419 (индекс 418)
for i, line in enumerate(lines):
    if "fontSize: '12px', color: '#9333ea'" in line and "order.master_earnings" in line:
        btn = "                    <button onClick={() => openViewModal(order)} style={{ fontSize: '12px', color: '#2563eb', background: 'white', border: '1px solid #2563eb', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', marginTop: '6px' }}>росмотр</button>\n"
        lines.insert(i+1, btn)
        print(f'нопка вставлена после строки {i+1}')
        break

with open(r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('DONE')