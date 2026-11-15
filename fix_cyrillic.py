p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    s = f.read()

replacements = [
    ("аявка #{selectedOrder.id} (ыполнена)", "аявка #{selectedOrder.id} (ыполнена)"),
    ("лиент", "лиент"),
    ("рганизация:", "рганизация:"),
    ("онтакт:", "онтакт:"),
    ("елефон:", "Телефон:"),
    ("дрес:", "дрес:"),
    ("ыполненные услуги:", "ыполненные услуги:"),
    ("спользованные материалы:", "спользованные материалы:"),
    ("аш заработок по этой заявке:", "аш заработок по этой заявке:"),
    ("акрыть", "акрыть"),
    ("агрузка деталей...", "агрузка деталей..."),
]

for old, new in replacements:
    s = s.replace(old, new)

with open(p, 'w', encoding='utf-8-sig') as f:
    f.write(s)

print('DONE: кириллица в модальном окне исправлена')