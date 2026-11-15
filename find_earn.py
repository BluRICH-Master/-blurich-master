import os
root = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app'
keys = ['master_earnings', 'percent', 'commission', 'earnings', 'handleCompleteOrder', 'completeOrder']
for dirpath, dirs, files in os.walk(root):
    for fn in files:
        if not fn.endswith(('.tsx', '.ts')):
            continue
        fp = os.path.join(dirpath, fn)
        try:
            with open(fp, encoding='utf-8') as f:
                for i, l in enumerate(f, 1):
                    low = l.lower()
                    if any(k.lower() in low for k in keys):
                        rel = fp.replace(root, 'app')
                        print(f'{rel}:{i}: {repr(l.strip())[:160]}')
        except Exception as e:
            print('ERR', fp, e)