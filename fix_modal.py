with open(r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

modal = """
      {viewModalOpen && selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>аявка #{selectedOrder.id} (ыполнена)</h3>
              <button onClick={() => setViewModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#6b7280' }}>x</button>
            </div>
            {detailsLoading ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>агрузка деталей...</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold', color: '#374151', textTransform: 'uppercase' }}>лиент</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                    <div><span style={{ color: '#6b7280' }}>рганизация:</span><br/><strong>{selectedOrder.organization_name || '-'}</strong></div>
                    <div><span style={{ color: '#6b7280' }}>онтакт:</span><br/><strong>{selectedOrder.contact_name || '-'}</strong></div>
                    <div><span style={{ color: '#6b7280' }}>Телефон:</span><br/><strong>{selectedOrder.contact_phone || '-'}</strong></div>
                    <div style={{ gridColumn: '1 / -1' }}><span style={{ color: '#6b7280' }}>дрес:</span><br/><strong>{selectedOrder.address || '-'}</strong></div>
                  </div>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>ыполненные услуги:</h4>
                  {orderDetails.services.length === 0 ? (<div style={{ fontSize: '14px', color: '#9ca3af', fontStyle: 'italic' }}>Услуги не добавлялись</div>) : (
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {orderDetails.services.map((s: any, idx: number) => (
                        <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: '#f0fdf4', padding: '8px 12px', borderRadius: '6px', fontSize: '14px' }}>
                          <span>{s.services?.name || 'Услуга'}</span>
                          <span style={{ fontWeight: 'bold' }}>{s.quantity} шт.</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>спользованные материалы:</h4>
                  {orderDetails.inventory.length === 0 ? (<div style={{ fontSize: '14px', color: '#9ca3af', fontStyle: 'italic' }}>атериалы не добавлялись</div>) : (
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {orderDetails.inventory.map((i: any, idx: number) => (
                        <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: '#eff6ff', padding: '8px 12px', borderRadius: '6px', fontSize: '14px' }}>
                          <span>{i.inventory?.name || 'атериал'}</span>
                          <span style={{ fontWeight: 'bold' }}>{i.quantity} шт.</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '16px', marginTop: '8px', textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>аш заработок по этой заявке:</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9333ea' }}>{new Intl.NumberFormat('ru-RU').format(selectedOrder.master_earnings || 0)} </div>
                </div>
              </div>
            )}
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setViewModalOpen(false)} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>акрыть</button>
            </div>
          </div>
        </div>
      )}
"""

# ставляем перед строкой 510 (индекс 509)
lines.insert(509, modal)

with open(r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('SUCCESS: одальное окно просмотра добавлено.')