f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    lines = file.readlines()

for i, line in enumerate(lines):
    if "marginTop: '12px', display: 'flex', gap: '8px'" in line and i > 300:
        indent = '          '
        button_code = f"""{indent}<button
{indent}  onClick={{() => router.push(`/master/orders/${{order.id}}`)}}
{indent}  style={{ flex: 1, background: '#6366f1', color: 'white', padding: '8px', borderRadius: '8px', fontWeight: '500', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
{indent}>
{indent}  <Icon name="eye" className="h-4 w-4" />
{indent}  ткрыть заявку
{indent}</button>
"""
        lines.insert(i+1, button_code)
        print(f"нопка добавлена после строки {i+1}")
        break

with open(f, 'w', encoding='utf-8') as file:
    file.writelines(lines)
print('отово!')