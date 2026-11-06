f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\admin\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    lines = file.readlines()

for i, line in enumerate(lines):
    if 'company_id: companyId' in line and i+1 < len(lines) and '} : { ...formData' in lines[i+1]:
        indent = '    '
        lines[i] = line.rstrip() + ",\n" + indent + "status: 'new'\n"
        j = i + 1
        while j < len(lines) and '} : {' not in lines[j]:
            j += 1
        if j < len(lines):
            lines[j] = lines[j].replace('company_id: companyId }', "company_id: companyId, status: 'new' }")
        print('айдено и исправлено на строке', i+1)
        break

with open(f, 'w', encoding='utf-8') as file:
    file.writelines(lines)
print('отово!')