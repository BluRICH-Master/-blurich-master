p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(p, 'r', encoding='utf-8-sig') as f:
    lines = f.readlines()

bt = chr(96)
found = False
for i, line in enumerate(lines):
    if 'isInProgress && (' in line:
        btn = '                      <button onClick={() => router.push(' + bt + '/master/orders/${order.id}' + bt + ')} style={{ flex: 1, background: "#6366f1", color: "white", padding: "8px", borderRadius: "8px", fontWeight: "500", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c</button>' + chr(10)
        lines[i] = btn
        print('Строка', i+1, 'заменена')
        found = True
        break

if not found:
    for i, line in enumerate(lines):
        if 'isInProgress' in line and '&&' in line:
            btn = '                      <button onClick={() => router.push(' + bt + '/master/orders/${order.id}' + bt + ')} style={{ flex: 1, background: "#6366f1", color: "white", padding: "8px", borderRadius: "8px", fontWeight: "500", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c</button>' + chr(10)
            lines.insert(i, btn)
            print('ставлено перед строкой', i+1)
            found = True
            break

if not found:
    print('  ')
else:
    with open(p, 'w', encoding='utf-8-sig') as f:
        f.writelines(lines)
    print('DONE')