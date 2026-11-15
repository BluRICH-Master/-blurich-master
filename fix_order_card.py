p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\orders\[id]\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    s = f.read()

# 1. Back -> азад (выделенная кнопка)
s = s.replace(
    '<button onClick={() => router.back()} className="mb-4 text-blue-600 hover:underline">Back</button>',
    '<button onClick={() => router.back()} className="mb-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300">\u041d\u0430\u0437\u0430\u0434</button>'
)

# 2. Order # -> аявка #
s = s.replace('Order #{order.id}', '\u0417\u0430\u044f\u0432\u043a\u0430 #{order.id}')

# 3. ейблы полей
s = s.replace('<strong>Org:</strong>', '<strong>\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f:</strong>')
s = s.replace('<strong>Contact:</strong>', '<strong>\u041a\u043e\u043d\u0442\u0430\u043a\u0442:</strong>')
s = s.replace('<strong>Phone:</strong>', '<strong>\u0422\u0435\u043b\u0435\u0444\u043e\u043d:</strong>')
s = s.replace('<strong>Addr:</strong>', '<strong>\u0410\u0434\u0440\u0435\u0441:</strong>')
s = s.replace('<strong>Status:</strong>', '<strong>\u0421\u0442\u0430\u0442\u0443\u0441:</strong>')

# 4. Services -> Услуги
s = s.replace('<h2 className="text-lg font-semibold">Services</h2>', '<h2 className="text-lg font-semibold">\u0423\u0441\u043b\u0443\u0433\u0438</h2>')
s = s.replace('No services', '\u0423\u0441\u043b\u0443\u0433\u0438 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b')

# 5. Items -> атериалы
s = s.replace('<h2 className="text-lg font-semibold">Items</h2>', '<h2 className="text-lg font-semibold">\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b</h2>')
s = s.replace('No items', '\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b')

# 6. Add -> обавить
s = s.replace('>Add</button>', '>\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c</button>')

# 7. Del -> Удалить
s = s.replace('>Del</button>', '>\u0423\u0434\u0430\u043b\u0438\u0442\u044c</button>')

# 8. Убираем кнопку Complete (строка 148)
s = s.replace(
    '{order.status === "in_progress" && <button onClick={completeOrder} className="flex-1 bg-green-600 text-white py-3 rounded-lg">Complete</button>}',
    ''
)

# 9. Accept -> ринять
s = s.replace('>Accept</button>', '>\u041f\u0440\u0438\u043d\u044f\u0442\u044c</button>')

# 10. Add Service -> обавить услугу
s = s.replace('>Add Service</h3>', '>\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0443\u0441\u043b\u0443\u0433\u0443</h3>')

# 11. Add Item -> обавить материал
s = s.replace('>Add Item</h3>', '>\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b</h3>')

# 12. Search... -> оиск...
s = s.replace('placeholder="Search..."', 'placeholder="\u041f\u043e\u0438\u0441\u043a..."')

# 13. Select -> ыбрать
s = s.replace('<option value="">Select</option>', '<option value="">\u0412\u044b\u0431\u0440\u0430\u0442\u044c</option>')

# 14. Cancel -> тмена
s = s.replace('>Cancel</button>', '>\u041e\u0442\u043c\u0435\u043d\u0430</button>')

with open(p, 'w', encoding='utf-8-sig') as f:
    f.write(s)

print('DONE: карточка заявки переведена на русский, Complete убрана')