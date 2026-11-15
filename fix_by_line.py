file_path = r"C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Строка 549 (индекс 548): заменяем полностью
if len(lines) > 548:
    lines[548] = "                          <span style={{ fontWeight: 'bold' }}>{s.quantity} шт.</span>\n"
    print(f"Строка 549 заменена: {lines[548].strip()}")

# Строка 556 (индекс 555): заменяем полностью
if len(lines) > 555:
    lines[555] = "                          <span style={{ fontWeight: 'bold' }}>{i.quantity} шт.</span>\n"
    print(f"Строка 556 заменена: {lines[555].strip()}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("SUCCESS: Цены убраны по номерам строк.")