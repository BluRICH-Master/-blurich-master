p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(p, 'r', encoding='utf-8-sig') as f:
    lines = f.readlines()

bt = chr(96)
edit_btn = '                      <button onClick={() => router.push(' + bt + '/master/orders/${order.id}' + bt + ')} style={{ flex: 1, background: "#6366f1", color: "white", padding: "8px", borderRadius: "8px", fontWeight: "500", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c</button>\n'

new_lines = []
inserted = False
for i, line in enumerate(lines):
    # Убираем лишние }}
    if line.strip() == '}}':
        print('Удалены лишние }} в строке', i+1)
        continue
    # ставляем кнопку перед "тметить выполненной"
    if not inserted and '\u041e\u0442\u043c\u0435\u0442\u0438\u0442\u044c \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u043e\u0439' in line:
        new_lines.append(edit_btn)
        inserted = True
        print('нопка вставлена перед строкой', i+1)
    new_lines.append(line)

if not inserted:
    print('  ')
else:
    with open(p, 'w', encoding='utf-8-sig') as f:
        f.writelines(new_lines)
    print('DONE')