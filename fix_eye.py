import re

file_path = r"C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# аходим строку с иконкой eye и оборачиваем два <path> в <>...</>
old_pattern = r'eye: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth=\{2\} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=\{2\} d="M2\.458 12C3\.732 7\.943 7\.523 5 12 5c4\.478 0 8\.268 2\.943 9\.542 7-1\.274 4\.057-5\.064 7-9\.542 7-4\.477 0-8\.268-2\.943-9\.542-7z" />'

new_pattern = r'eye: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>'

new_content = re.sub(old_pattern, new_pattern, content)

if new_content != content:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: конка eye исправлена. Фрагмент <>...</> добавлен.")
else:
    print("INFO: аттерн не найден. озможно, уже исправлено.")