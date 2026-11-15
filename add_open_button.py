f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

old = """{order.description && (
          <div style={{ fontSize: '14px', color: '#374151', background: '#f9fafb', padding: '8px', borderRadius: '8px', marginTop: '8px' }}>
            {order.description}
          </div>
        ))}

        <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
        {isAssigned && ("""

new = """{order.description && (
          <div style={{ fontSize: '14px', color: '#374151', background: '#f9fafb', padding: '8px', borderRadius: '8px', marginTop: '8px' }}>
            {order.description}
          </div>
        ))}

        <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => router.push(`/master/orders/${order.id}`)}
            style={{ flex: 1, background: '#6366f1', color: 'white', padding: '8px', borderRadius: '8px', fontWeight: '500', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Icon name="eye" className="h-4 w-4" />
            ткрыть заявку
          </button>
        {isAssigned && ("""

content = content.replace(old, new)

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)
print('отово!')