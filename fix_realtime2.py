f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\admin\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

old = "filter: f'company_id=eq.{companyId}'"
new = "filter: `company_id=eq.${companyId}`"

content = content.replace(old, new)

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)
print('отово!')