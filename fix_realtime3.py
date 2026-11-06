f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\admin\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

# аменяем Python f-строку на JavaScript template literal
content = content.replace("filter: f'company_id=eq.{companyId}'", "filter: `company_id=eq.${companyId}`")

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)
print('отово!')