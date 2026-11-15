f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

old = """{isAssigned && (
          <button
            onClick={() => handleAcceptOrder(order.id)}"""

new = """<button
            onClick={() => router.push(`/master/orders/${order.id}`)}
            style={{ flex: 1, background: '#6366f1', color: 'white', padding: '8px', borderRadius: '8px', fontWeight: '500', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Icon name="eye" className="h-4 w-4" />
            ткрыть заявку
          </button>
          {isAssigned && (
          <button
            onClick={() => handleAcceptOrder(order.id)}"""

content = content.replace(old, new, 1)

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)
print('отово!')