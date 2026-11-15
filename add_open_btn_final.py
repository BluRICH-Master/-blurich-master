f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

# 1. обавляем иконку 'eye'
old_icon = 'close: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />'
new_icon = '''close: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    eye: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />'''
content = content.replace(old_icon, new_icon)

# 2. обавляем кнопку "ткрыть заявку"
old_div = "<div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>"
new_button = """<div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => router.push(`/master/orders/${order.id}`)}
                        style={{ flex: 1, background: '#6366f1', color: 'white', padding: '8px', borderRadius: '8px', fontWeight: '500', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      >
                        <Icon name="eye" className="h-4 w-4" />
                        ткрыть заявку
                      </button>"""
content = content.replace(old_div, new_button)

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)
print('отово! конка и кнопка добавлены.')