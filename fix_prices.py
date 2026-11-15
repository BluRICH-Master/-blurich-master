file_path = r"C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    # Строка 549: убираем цену из услуг
    if "{s.quantity} шт. × {s.price}  = <strong>{s.quantity * s.price} </strong>" in line:
        line = line.replace("{s.quantity} шт. × {s.price}  = <strong>{s.quantity * s.price} </strong>", "{s.quantity} шт.")
    
    # Строка 556: убираем цену из материалов
    if "{i.quantity} шт. × {i.price}  = <strong>{i.quantity * i.price} </strong>" in line:
        line = line.replace("{i.quantity} шт. × {i.price}  = <strong>{i.quantity * i.price} </strong>", "{i.quantity} шт.")
    
    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("SUCCESS: Цены убраны из модального окна.")