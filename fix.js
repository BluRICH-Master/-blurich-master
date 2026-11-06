const fs = require('fs');
const filePath = 'C:\\Users\\Lenovo\\Desktop\\BluRICHMaster\\app\\admin\\page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldCode = const finalData = isSameAsClient ? {
    ...formData,
    contact_name: formData.organization_name,
    contact_phone: formData.client_phone,
    contact_position: formData.client_position,
    client_id: clientId,
    company_id: companyId
  } : { ...formData, client_id: clientId, company_id: companyId };

const newCode = const finalData = isSameAsClient ? {
    ...formData,
    contact_name: formData.organization_name,
    contact_phone: formData.client_phone,
    contact_position: formData.client_position,
    client_id: clientId,
    company_id: companyId,
    status: 'new'
  } : { ...formData, client_id: clientId, company_id: companyId, status: 'new' };

content = content.replace(oldCode, newCode);
fs.writeFileSync(filePath, content);
console.log('отово! Статус добавлен в finalData.');
