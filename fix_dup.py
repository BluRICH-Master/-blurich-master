p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(p, 'r', encoding='utf-8-sig') as f:
    lines = f.readlines()

new_lines = []
skip_next_close = False
removed = 0

for i, line in enumerate(lines):
    # Удаляем старую битую кнопку "едактировать" (без )
    if '\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c' in line.lower() and 'button' in line.lower():
        removed += 1
        print('Удалена битая кнопка в строке', i+1)
        continue
    # Удаляем лишние }} после кнопок
    if line.strip() == '}}':
        # роверяем, есть ли уже закрывающая скобка
        if skip_next_close:
            print('Удалены лишние }} в строке', i+1)
            continue
    new_lines.append(line)

with open(p, 'w', encoding='utf-8-sig') as f:
    f.writelines(new_lines)

print('Удалено строк:', removed)
print('DONE')