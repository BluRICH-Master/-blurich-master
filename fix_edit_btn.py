p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# аходим строку с "isInProgress && ("
for i, line in enumerate(lines):
    if 'isInProgress && (' in line:
        # ставляем кнопку "едактировать" перед этим блоком
        edit_btn = (
            "                      <button onClick={() => router.push(`/master/orders/${order.id}`)} "
            "style={{ flex: 1, background: '#6366f1', color: 'white', padding: '8px', borderRadius: '8px', "
            "fontWeight: '500', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', "
            "justifyContent: 'center', gap: '8px' }}>\n"
            "                        <Icon name=\"edit\" className=\"h-4 w-4\" />\n"
            "                        \u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c\n"
            "                      </button>\n"
        )
        lines.insert(i, edit_btn)
        print(f'нопка редактирования вставлена перед строкой {i+1}')
        break

with open(p, 'w', encoding='utf-8-sig') as f:
    f.writelines(lines)
print('DONE')