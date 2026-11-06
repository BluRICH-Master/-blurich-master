f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\admin\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    lines = file.readlines()

backtick = chr(96)
for i, line in enumerate(lines):
    if "filter:" in line and "company_id=eq." in line and "companyId" in line:
        old = line
        new = line.replace("f'company_id=eq.{companyId}'", backtick + "company_id=eq.${companyId}" + backtick)
        lines[i] = new
        print(f"Строка {i+1} исправлена")
        print("ыло:", old.strip())
        print("Стало:", new.strip())
        break

with open(f, 'w', encoding='utf-8') as file:
    file.writelines(lines)
print('отово!')