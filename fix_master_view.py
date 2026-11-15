import re

file_path = r"C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. аменяем отображение услуг — убираем цену, оставляем только название и количество
old_svc = r'<li key=\{idx\} style=\{\{ display: .flex., justifyContent: .space-between., background: .#f0fdf4., padding: .8px 12px., borderRadius: .6px., fontSize: .14px. \}\}>\s*<span>\{s\.services\?\.name \|\| .Услуга.\}</span>\s*<span style=\{\{ fontWeight: .bold. \}\}>\{s\.quantity\} шт\. × \{s\.price\}  = <strong>\{s\.quantity \* s\.price\} </strong></span>\s*</li>'

new_svc = '''<li key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: '#f0fdf4', padding: '8px 12px', borderRadius: '6px', fontSize: '14px' }}>
                          <span>{s.services?.name || 'Услуга'}</span>
                          <span style={{ fontWeight: 'bold' }}>{s.quantity} шт.</span>
                        </li>'''

content = re.sub(old_svc, new_svc, content)

# 2. аменяем отображение материалов — убираем цену
old_inv = r'<li key=\{idx\} style=\{\{ display: .flex., justifyContent: .space-between., background: .#eff6ff., padding: .8px 12px., borderRadius: .6px., fontSize: .14px. \}\}>\s*<span>\{i\.inventory\?\.name \|\| .атериал.\}</span>\s*<span style=\{\{ fontWeight: .bold. \}\}>\{i\.quantity\} шт\. × \{i\.price\}  = <strong>\{i\.quantity \* i\.price\} </strong></span>\s*</li>'

new_inv = '''<li key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: '#eff6ff', padding: '8px 12px', borderRadius: '6px', fontSize: '14px' }}>
                          <span>{i.inventory?.name || 'атериал'}</span>
                          <span style={{ fontWeight: 'bold' }}>{i.quantity} шт.</span>
                        </li>'''

content = re.sub(old_inv, new_inv, content)

# 3. Убираем блок "аш заработок по этой заявке" — он показывает 0 и путает
old_earnings = r'<div style=\{\{ borderTop: .2px solid #e5e7eb., paddingTop: .16px., marginTop: .8px., textAlign: .right. \}\}>\s*<div style=\{\{ fontSize: .14px., color: .#6b7280. \}\}>аш заработок по этой заявке:</div>\s*<div style=\{\{ fontSize: .24px., fontWeight: .bold., color: .#9333ea. \}\}>\{formatMoney\(selectedOrder\.master_earnings \|\| 0\)\}</div>\s*</div>'

new_earnings = '''<div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '16px', marginTop: '8px', textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>аявка просмотрена в режиме "только чтение"</div>
                </div>'''

content = re.sub(old_earnings, new_earnings, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: одальное окно мастера исправлено. Цены убраны.")