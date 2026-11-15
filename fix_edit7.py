p = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\page.tsx'
with open(p, 'r', encoding='utf-8-sig') as f:
    lines = f.readlines()

bt = chr(96)
nl = chr(10)

# 7 строк нового блока перед строкой 383 (индекс 382)
new_block = [
    '                    {' + 'isInProgress && (' + nl,
    '                      <button onClick={() => router.push(' + bt + '/master/orders/${order.id}' + bt + ')} style={{ flex: 1, background: "#6366f1", color: "white", padding: "8px", borderRadius: "8px", fontWeight: "500", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>' + nl,
    '                        ' + chr(1056) + chr(1077) + chr(1076) + chr(1072) + chr(1082) + chr(1090) + chr(1080) + chr(1088) + chr(1086) + chr(1074) + chr(1072) + chr(1090) + chr(1100) + nl,
    '                      </button>' + nl,
    '                    )}' + nl,
]

lines[382:382] = new_block
print('ставлено 5 строк перед строкой 383')

with open(p, 'w', encoding='utf-8-sig') as f:
    f.writelines(lines)
print('DONE')

# роверка
with open(p, 'r', encoding='utf-8-sig') as f:
    lines2 = f.readlines()
for i in range(380, 400):
    print(f'{i+1}: {lines2[i].rstrip()}')