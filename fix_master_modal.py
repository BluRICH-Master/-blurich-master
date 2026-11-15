file_path = r"C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. аходим и исправляем строки с ценами в модальном окне
new_lines = []
skip_earnings_block = False
for i, line in enumerate(lines):
    # Убираем цены из услуг
    if "s.quantity} шт. × {s.price}  = <strong>{s.quantity * s.price} </strong>" in line:
        line = line.replace("s.quantity} шт. × {s.price}  = <strong>{s.quantity * s.price} </strong>", "s.quantity} шт.")
    
    # Убираем цены из материалов
    if "i.quantity} шт. × {i.price}  = <strong>{i.quantity * i.price} </strong>" in line:
        line = line.replace("i.quantity} шт. × {i.price}  = <strong>{i.quantity * i.price} </strong>", "i.quantity} шт.")
    
    # ропускаем блок "аш заработок"
    if "аш заработок по этой заявке:" in line:
        skip_earnings_block = True
        line = line.replace("аш заработок по этой заявке:", "аявка просмотрена в режиме только чтение")
    
    if skip_earnings_block and "formatMoney(selectedOrder.master_earnings || 0)" in line:
        line = line.replace("formatMoney(selectedOrder.master_earnings || 0)", "0")
        skip_earnings_block = False
    
    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("SUCCESS: Цены убраны из модального окна мастера.")