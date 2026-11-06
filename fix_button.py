f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\admin\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

old_condition = "o.status !== 'completed' && ("
new_condition = "o.status === 'new' && ("

content = content.replace(old_condition, new_condition)

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)

print('отово! нопка "азначить" теперь показывается только для статуса new')