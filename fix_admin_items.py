f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\admin\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

# аходим место после таблицы услуг и перед итоговой суммой
old = """</table>
        
        <div className="mt-4 text-right border-t pt-4">"""

new = """</table>
        )}

        <h4 className="font-bold mb-3">Товары:</h4>
        {orderInventoryDetails.length === 0 ? (
          <p className="text-gray-500 text-sm mb-4">Товары не добавлены</p>
        ) : (
          <table className="w-full text-sm mb-4">
            <thead><tr className="border-b"><th className="text-left py-2">Товар</th><th className="text-center py-2">ол-во</th><th className="text-right py-2">Цена</th><th className="text-right py-2">Сумма</th></tr></thead>
            <tbody>
              {orderInventoryDetails.map((d: any) => (
                <tr key={d.id} className="border-b">
                  <td className="py-2">{d.inventory?.name}</td>
                  <td className="text-center py-2">{d.quantity}</td>
                  <td className="text-right py-2">{d.price} </td>
                  <td className="text-right py-2 font-bold">{d.price * d.quantity} </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-4 text-right border-t pt-4">"""

content = content.replace(old, new)

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)
print('Admin page fixed - added items section!')