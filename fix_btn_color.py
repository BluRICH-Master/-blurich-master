p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\orders\[id]\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    s = f.read()

# 1. нопка азад - синяя выделенная
s = s.replace(
    'className="mb-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300"',
    'className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"'
)

# 2. + Add -> + обавить (в кнопках добавления услуг и материалов)
s = s.replace('>+ Add</button>', '>+ \u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c</button>')

with open(p, 'w', encoding='utf-8-sig') as f:
    f.write(s)

print('DONE')