import os
p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\orders\[id]\page.tsx'
if os.path.exists(p):
    with open(p, encoding='utf-8') as f:
        for i, l in enumerate(f, 1):
            print(f'{i}: {l.rstrip()}')
else:
    print('NOT FOUND, ищу похожие:')
    for root, dirs, files in os.walk(r'C:\Users\Lenovo\Desktop\BluRICHMaster\app'):
        for fn in files:
            if 'orders' in root and fn.endswith('.tsx'):
                print(os.path.join(root, fn))