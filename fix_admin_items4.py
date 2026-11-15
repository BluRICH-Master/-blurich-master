f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\admin\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

# справляем заголовок "ол-во" на "ол-во"
content = content.replace('>ол-во<', '>ол-во<')

# обавляем  после цены и суммы в таблице товаров
content = content.replace('{d.price} </td>', '{d.price} </td>')
content = content.replace('{d.price * d.quantity} </td>', '{d.price * d.quantity} </td>')

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)
print('Fixed!')