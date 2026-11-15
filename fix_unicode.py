p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    s = f.read()

# нопка "росмотр" после строки с 
zp_old = ": {order.master_earnings || 0} \u20bd</div>"
btn_new = (": {order.master_earnings || 0} \u20bd</div>\n"
           "                    <button onClick={() => openViewModal(order)} "
           "style={{ fontSize: '12px', color: '#2563eb', background: 'white', "
           "border: '1px solid #2563eb', borderRadius: '6px', padding: '4px 10px', "
           "cursor: 'pointer', marginTop: '6px' }}>\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440</button>")
if zp_old in s:
    s = s.replace(zp_old, btn_new, 1)
    print("BTN: OK")
else:
    print("BTN: not found")

# одальное окно перед последней ")"
modal = """      {viewModalOpen && selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>\u0417\u0430\u044f\u0432\u043a\u0430 #{selectedOrder.id} (\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0430)</h3>
              <button onClick={() => setViewModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#6b7280' }}>x</button>
            </div>
            {detailsLoading ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0434\u0435\u0442\u0430\u043b\u0435\u0439...</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold', color: '#374151', textTransform: 'uppercase' }}>\u041a\u043b\u0438\u0435\u043d\u0442</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                    <div><span style={{ color: '#6b7280' }}>\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f:</span><br/><strong>{selectedOrder.organization_name || '-'}</strong></div>
                    <div><span style={{ color: '#6b7280' }}>\u041a\u043e\u043d\u0442\u0430\u043a\u0442:</span><br/><strong>{selectedOrder.contact_name || '-'}</strong></div>
                    <div><span style={{ color: '#6b7280' }}>\u0422\u0435\u043b\u0435\u0444\u043e\u043d:</span><br/><strong>{selectedOrder.contact_phone || '-'}</strong></div>
                    <div style={{ gridColumn: '1 / -1' }}><span style={{ color: '#6b7280' }}>\u0410\u0434\u0440\u0435\u0441:</span><br/><strong>{selectedOrder.address || '-'}</strong></div>
                  </div>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u044b\u0435 \u0443\u0441\u043b\u0443\u0433\u0438:</h4>
                  {orderDetails.services.length === 0 ? (<div style={{ fontSize: '14px', color: '#9ca3af', fontStyle: 'italic' }}>\u0423\u0441\u043b\u0443\u0433\u0438 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u043b\u0438\u0441\u044c</div>) : (
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {orderDetails.services.map((sv: any, idx: number) => (
                        <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: '#f0fdf4', padding: '8px 12px', borderRadius: '6px', fontSize: '14px' }}>
                          <span>{sv.services?.name || '\u0423\u0441\u043b\u0443\u0433\u0430'}</span>
                          <span style={{ fontWeight: 'bold' }}>{sv.quantity} \u0448\u0442.</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b:</h4>
                  {orderDetails.inventory.length === 0 ? (<div style={{ fontSize: '14px', color: '#9ca3af', fontStyle: 'italic' }}>\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u043b\u0438\u0441\u044c</div>) : (
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {orderDetails.inventory.map((iv: any, idx: number) => (
                        <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: '#eff6ff', padding: '8px 12px', borderRadius: '6px', fontSize: '14px' }}>
                          <span>{iv.inventory?.name || '\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b'}</span>
                          <span style={{ fontWeight: 'bold' }}>{iv.quantity} \u0448\u0442.</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '16px', marginTop: '8px', textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>\u0412\u0430\u0448 \u0437\u0430\u0440\u0430\u0431\u043e\u0442\u043e\u043a \u043f\u043e \u044d\u0442\u043e\u0439 \u0437\u0430\u044f\u0432\u043a\u0435:</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9333ea' }}>{new Intl.NumberFormat('ru-RU').format(selectedOrder.master_earnings || 0)} \u20bd</div>
                </div>
              </div>
            )}
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setViewModalOpen(false)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>\u0417\u0430\u043a\u0440\u044b\u0442\u044c</button>
            </div>
          </div>
        </div>
      )}
"""
end_marker = "    </div>\n  )\n}"
if end_marker in s:
    s = s.replace(end_marker, modal + end_marker, 1)
    print("MODAL: OK")
else:
    print("MODAL: not found")

with open(p, 'w', encoding='utf-8-sig') as f:
    f.write(s)
print("DONE")