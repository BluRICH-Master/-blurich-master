'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    dashboard: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
    orders: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
    masters: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
    clients: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    services: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    inventory: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
    reports: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    logout: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />,
    close: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    menu: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    eye: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
    minus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    userPlus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    key: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />,
    settings: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>,
    bell: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  }
  return <svg className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">{icons[name] || icons.dashboard}</svg>
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isMasterModalOpen, setIsMasterModalOpen] = useState(false)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isClientModalOpen, setIsClientModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [selectedMaster, setSelectedMaster] = useState<any>(null)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [orderDetails, setOrderDetails] = useState<any[]>([])
  const [orderInventoryDetails, setOrderInventoryDetails] = useState<any[]>([])
  
  const [orders, setOrders] = useState<any[]>([])
  const [masters, setMasters] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [inventory, setInventory] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const [currentUserIsOwner, setCurrentUserIsOwner] = useState(false)
  const [companyId, setCompanyId] = useState<number | null>(null)
  const [companyName, setCompanyName] = useState('')
  
  const [formData, setFormData] = useState({ organization_name: '', client_position: '', client_phone: '', contact_name: '', contact_phone: '', contact_position: '', address: '', description: '' })
  const [isSameAsClient, setIsSameAsClient] = useState(false)
  const [selectedMasterId, setSelectedMasterId] = useState('')
  const [selectedServices, setSelectedServices] = useState<{service_id: number, quantity: number}[]>([])
  const [selectedServiceId, setSelectedServiceId] = useState('')
  const [isNewClient, setIsNewClient] = useState(false)
  const [clientSearch, setClientSearch] = useState('')
  const [showClientDropdown, setShowClientDropdown] = useState(false)
  const clientDropdownRef = useRef<HTMLDivElement>(null)

  const [masterForm, setMasterForm] = useState({ name: '', phone: '', specialization: '', commission_percent: 30, login_phone: '', password: '' })
  const [serviceForm, setServiceForm] = useState({ name: '', description: '', price: 0 })
  const [inventoryForm, setInventoryForm] = useState({ name: '', category: '', purchase_price: 0, sale_price: 0, quantity: 0, min_quantity: 0 })
  const [clientForm, setClientForm] = useState({ name: '', phone: '', address: '' })
  
  const [settingsForm, setSettingsForm] = useState({ office_phone: '', company_name: '' })
  const [settingsLoading, setSettingsLoading] = useState(false)
  const [settingsSaved, setSettingsSaved] = useState(false)

  const handleLogout = async () => { 
    localStorage.removeItem('company_id')
    await supabase.auth.signOut()
    router.push('/login') 
  }

  useEffect(() => { 
    const init = async () => {
      const storedCompanyId = localStorage.getItem('company_id')
      if (storedCompanyId) {
        const cid = parseInt(storedCompanyId)
        setCompanyId(cid)
        
        const { data: companyData } = await supabase
          .from('companies')
          .select('name, is_platform_owner')
          .eq('id', cid)
          .single()
        
        if (companyData) {
          setCompanyName(companyData.name)
          setCurrentUserIsOwner(companyData.is_platform_owner || false)
        }
      }
    }
    init()
  }, [])

  useEffect(() => {
    if (companyId && ['dashboard', 'orders', 'masters', 'clients', 'services', 'inventory'].includes(activeTab)) { 
        fetchOrders(); fetchMasters(); fetchClients(); fetchServices(); fetchInventory();
    }
    if (companyId && activeTab === 'settings') {
      loadSettings()
    }
    setIsSidebarOpen(false)
  }, [activeTab, companyId])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (clientDropdownRef.current && !clientDropdownRef.current.contains(event.target as Node)) {
        setShowClientDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  )

  const fetchOrders = async () => {
    if (!companyId) return
    const { data, error } = await supabase.from('orders').select('*').eq('company_id', companyId).order('id', { ascending: false })
    if (!error && data) setOrders(data)
  }
  
  const fetchMasters = async () => {
    if (!companyId) return
    const { data: mastersData, error: mastersError } = await supabase.from('masters').select('*').eq('company_id', companyId)
    if (!mastersError && mastersData) {
      const { data: activeOrders } = await supabase.from('orders').select('master_id').eq('company_id', companyId).in('status', ['new', 'assigned', 'in_progress'])
      const mastersWithLoad = mastersData.map(master => {
        const loadCount = activeOrders ? activeOrders.filter(o => o.master_id === master.id).length : 0
        let statusLabel = 'Свободен'
        let statusColor = 'bg-green-100 text-green-800'
        if (master.status !== 'active') {
            statusLabel = 'Уволен'
            statusColor = 'bg-gray-100 text-gray-500'
        } else if (loadCount === 1) {
          statusLabel = 'Занят (1 заявка)'
          statusColor = 'bg-yellow-100 text-yellow-800'
        } else if (loadCount > 1) {
          statusLabel = `Загружен (${loadCount} заяв.)`
          statusColor = 'bg-red-100 text-red-800'
        }
        return { ...master, loadCount, statusLabel, statusColor }
      })
      setMasters(mastersWithLoad)
    }
  }

  const fetchClients = async () => {
    if (!companyId) return
    const { data, error } = await supabase.from('clients').select('*').eq('company_id', companyId)
    if (!error && data) setClients(data)
  }

  const fetchServices = async () => {
    if (!companyId) return
    const { data, error } = await supabase.from('services').select('*').eq('company_id', companyId).order('id', { ascending: false })
    if (!error && data) setServices(data)
  }

  const fetchInventory = async () => {
    if (!companyId) return
    const { data, error } = await supabase.from('inventory').select('*').eq('company_id', companyId).order('id', { ascending: false })
    if (!error && data) setInventory(data)
  }

  const loadSettings = async () => {
    if (!companyId) return
    const { data, error } = await supabase
      .from('companies')
      .select('name, office_phone')
      .eq('id', companyId)
      .single()
    
    if (!error && data) {
      setSettingsForm({
        company_name: data.name || '',
        office_phone: data.office_phone || ''
      })
    }
  }

  const handleSaveSettings = async () => {
    if (!companyId) return
    setSettingsLoading(true)
    setSettingsSaved(false)
    
    const { error } = await supabase
      .from('companies')
      .update({
        name: settingsForm.company_name,
        office_phone: settingsForm.office_phone
      })
      .eq('id', companyId)
    
    if (error) {
      alert('Ошибка сохранения: ' + error.message)
    } else {
      setCompanyName(settingsForm.company_name)
      setSettingsSaved(true)
      setTimeout(() => setSettingsSaved(false), 3000)
    }
    
    setSettingsLoading(false)
  }

  const handleSelectClient = (client: any) => {
    setFormData({
      ...formData,
      organization_name: client.name,
      client_phone: client.phone || '',
      address: client.address || ''
    })
    setClientSearch(client.name)
    setShowClientDropdown(false)
    setIsNewClient(false)
  }

  const handleNewClient = () => {
    setIsNewClient(true)
    setFormData({
      ...formData,
      organization_name: clientSearch || '',
      client_phone: '',
      address: ''
    })
    setShowClientDropdown(false)
  }

  const handleSubmitOrder = async () => {
    if (!formData.organization_name.trim()) {
      alert('Введите название организации!')
      return
    }
    
    setLoading(true)
    let clientId = null;
    
    const { data: existingClient } = await supabase
      .from('clients')
      .select('id')
      .eq('company_id', companyId)
      .ilike('name', formData.organization_name)
      .single();
    
    if (existingClient) {
      clientId = existingClient.id;
    } else {
      const { data: newClients, error: clientError } = await supabase.from('clients').insert([{ 
          name: formData.organization_name, 
          phone: formData.client_phone || null,
          address: formData.address || null,
          company_id: companyId
      }]).select('id');
      
      if (clientError) {
          alert("Не удалось создать заказчика: " + clientError.message);
          setLoading(false);
          return;
      }
      if (newClients && newClients.length > 0) {
          clientId = newClients[0].id;
          fetchClients();
      }
    }
    
    const finalData = isSameAsClient ? { 
        ...formData, 
        contact_name: formData.organization_name, 
        contact_phone: formData.client_phone, 
        contact_position: formData.client_position,
        client_id: clientId,
        company_id: companyId
    } : { ...formData, client_id: clientId, company_id: companyId }
    
    const { data: orderData, error } = await supabase.from('orders').insert([finalData]).select().single()
    
    if (error) {
        alert('Ошибка: ' + error.message)
    } else {
        if (selectedServices.length > 0 && orderData) {
            const servicesToInsert = selectedServices.map(s => ({
                order_id: orderData.id,
                service_id: s.service_id,
                quantity: s.quantity,
                price: services.find(srv => srv.id === s.service_id)?.price || 0
            }))
            await supabase.from('order_services').insert(servicesToInsert)
            const totalAmount = servicesToInsert.reduce((sum, s) => sum + (s.price * s.quantity), 0)
            await supabase.from('orders').update({ total_amount: totalAmount }).eq('id', orderData.id)
        }
        alert('✅ Заявка сохранена!\n\n' + (existingClient ? 'Клиент найден в базе.' : ' Новый клиент "' + formData.organization_name + '" автоматически добавлен в базу.'))
        setIsModalOpen(false)
        setFormData({ organization_name: '', client_position: '', client_phone: '', contact_name: '', contact_phone: '', contact_position: '', address: '', description: '' })
        setIsSameAsClient(false)
        setSelectedServices([])
        setSelectedServiceId('')
        setClientSearch('')
        setIsNewClient(false)
        fetchOrders(); fetchMasters(); fetchClients();
    }
    setLoading(false)
  }

  const handleAssignMaster = async () => {
    if (!selectedOrder || !selectedMasterId) return
    setLoading(true)
    const { error } = await supabase.from('orders').update({ master_id: selectedMasterId, status: 'assigned' }).eq('id', selectedOrder.id)
    if (error) alert('Ошибка назначения: ' + error.message)
    else { 
        alert('Мастер назначен!'); 
        setIsAssignModalOpen(false); 
        fetchOrders(); fetchMasters(); 
    }
    setLoading(false)
  }

  const handleSaveMaster = async () => {
    setLoading(true)
    if (selectedMaster) {
      const { error } = await supabase.from('masters').update({
        name: masterForm.name, phone: masterForm.phone,
        specialization: masterForm.specialization,
        commission_percent: masterForm.commission_percent,
        login_phone: masterForm.login_phone || null
      }).eq('id', selectedMaster.id)
      if (error) alert('Ошибка обновления: ' + error.message)
      else { alert('Данные обновлены!'); setIsMasterModalOpen(false); fetchMasters() }
    } else {
      if (masterForm.login_phone && masterForm.password) {
        const fakeEmail = `master_${masterForm.login_phone.replace(/\D/g, '')}@blurich.ru`
        
        const { error: authError } = await supabase.auth.signUp({
          email: fakeEmail,
          password: masterForm.password,
          options: {
            data: { name: masterForm.name, role: 'master', phone: masterForm.login_phone }
          }
        })
        
        if (authError) {
          alert('Ошибка создания аккаунта: ' + authError.message)
          setLoading(false)
          return
        }
      }
      
      const { error } = await supabase.from('masters').insert([{
        name: masterForm.name, phone: masterForm.phone,
        specialization: masterForm.specialization,
        commission_percent: masterForm.commission_percent,
        login_phone: masterForm.login_phone || null,
        status: 'active',
        company_id: companyId
      }])
      
      if (error) alert('Ошибка создания: ' + error.message)
      else { 
        alert('Мастер добавлен!' + (masterForm.login_phone ? `\n\nЛогин (телефон): ${masterForm.login_phone}\nПароль: ${masterForm.password}\n\nПередайте эти данные мастеру.` : '')); 
        setIsMasterModalOpen(false); 
        fetchMasters() 
      }
    }
    setLoading(false)
  }

  const handleResetMasterPassword = async (master: any) => {
    const newTempPassword = prompt(`Введите временный пароль для мастера "${master.name}":`)
    if (!newTempPassword) return
    if (newTempPassword.length < 6) {
      alert('Пароль должен содержать минимум 6 символов')
      return
    }
    
    const fakeEmail = `master_${master.login_phone.replace(/\D/g, '')}@blurich.ru`
    
    const { data: users } = await supabase.auth.admin.listUsers()
    const authUser = users?.users?.find(u => u.email === fakeEmail)
    
    if (!authUser) {
      alert('Пользователь не найден в системе авторизации. Возможно, мастер был создан без логина.')
      return
    }
    
    const { error } = await supabase.auth.admin.updateUserById(authUser.id, { password: newTempPassword })
    if (error) {
      alert('Ошибка смены пароля: ' + error.message)
      return
    }
    
    await supabase.from('masters').update({ must_change_password: true }).eq('id', master.id)
    
    alert(`Пароль сброшен!\n\nНовый временный пароль: ${newTempPassword}\n\nМастер должен будет сменить его при следующем входе.`)
  }

  const handleFireMaster = async (id: number) => {
    if (confirm('Вы уверены, что хотите уволить этого мастера?')) {
        const { error } = await supabase.from('masters').update({ status: 'inactive' }).eq('id', id)
        if (error) alert('Ошибка: ' + error.message)
        else fetchMasters()
    }
  }

  const openEditMaster = (master: any) => {
      setSelectedMaster(master)
      setMasterForm({
          name: master.name, phone: master.phone,
          specialization: master.specialization,
          commission_percent: master.commission_percent || 30,`n        password: '',
          login_phone: master.login_phone || ''
      })
      setIsMasterModalOpen(true)
  }

  const openNewMaster = () => {
      setSelectedMaster(null)
      setMasterForm({ name: '', phone: '', specialization: '', commission_percent: 30, login_phone: '', password: '' })
      setIsMasterModalOpen(true)
  }

  const handleSaveService = async () => {
    setLoading(true)
    if (selectedService) {
        const { error } = await supabase.from('services').update({
            name: serviceForm.name, description: serviceForm.description, price: serviceForm.price
        }).eq('id', selectedService.id)
        if (error) alert('Ошибка обновления: ' + error.message)
        else { alert('Услуга обновлена!'); setIsServiceModalOpen(false); fetchServices() }
    } else {
        const { error } = await supabase.from('services').insert([{
            name: serviceForm.name, description: serviceForm.description, price: serviceForm.price,
            company_id: companyId
        }])
        if (error) alert('Ошибка создания: ' + error.message)
        else { alert('Услуга добавлена!'); setIsServiceModalOpen(false); fetchServices() }
    }
    setLoading(false)
  }

  const handleDeleteService = async (id: number) => {
    if (confirm('Удалить эту услугу?')) {
        const { error } = await supabase.from('services').delete().eq('id', id)
        if (error) alert('Ошибка: ' + error.message)
        else fetchServices()
    }
  }

  const openEditService = (service: any) => {
      setSelectedService(service)
      setServiceForm({
          name: service.name, description: service.description || '', price: service.price || 0
      })
      setIsServiceModalOpen(true)
  }

  const openNewService = () => {
      setSelectedService(null)
      setServiceForm({ name: '', description: '', price: 0 })
      setIsServiceModalOpen(true)
  }

  const handleSaveInventory = async () => {
    setLoading(true)
    if (selectedItem) {
        const { error } = await supabase.from('inventory').update({
            name: inventoryForm.name, category: inventoryForm.category,
            purchase_price: inventoryForm.purchase_price,
            sale_price: inventoryForm.sale_price,
            quantity: inventoryForm.quantity,
            min_quantity: inventoryForm.min_quantity
        }).eq('id', selectedItem.id)
        if (error) alert('Ошибка обновления: ' + error.message)
        else { alert('Товар обновлён!'); setIsInventoryModalOpen(false); fetchInventory() }
    } else {
        const { error } = await supabase.from('inventory').insert([{
            name: inventoryForm.name, category: inventoryForm.category,
            purchase_price: inventoryForm.purchase_price,
            sale_price: inventoryForm.sale_price,
            quantity: inventoryForm.quantity,
            min_quantity: inventoryForm.min_quantity,
            company_id: companyId
        }])
        if (error) alert('Ошибка создания: ' + error.message)
        else { alert('Товар добавлен!'); setIsInventoryModalOpen(false); fetchInventory() }
    }
    setLoading(false)
  }

  const handleDeleteInventory = async (id: number) => {
    if (confirm('Удалить эту позицию?')) {
        const { error } = await supabase.from('inventory').delete().eq('id', id)
        if (error) alert('Ошибка: ' + error.message)
        else fetchInventory()
    }
  }

  const openEditInventory = (item: any) => {
      setSelectedItem(item)
      setInventoryForm({
          name: item.name, category: item.category || '',
          purchase_price: item.purchase_price || 0,
          sale_price: item.sale_price || 0,
          quantity: item.quantity || 0,
          min_quantity: item.min_quantity || 0
      })
      setIsInventoryModalOpen(true)
  }

  const openNewInventory = () => {
      setSelectedItem(null)
      setInventoryForm({ name: '', category: '', purchase_price: 0, sale_price: 0, quantity: 0, min_quantity: 0 })
      setIsInventoryModalOpen(true)
  }

  const openEditClient = (client: any) => {
      setSelectedClient(client)
      setClientForm({ name: client.name, phone: client.phone, address: client.address || '' })
      setIsClientModalOpen(true)
  }

  const handleSaveClient = async () => {
    setLoading(true)
    if (selectedClient) {
        const { error } = await supabase.from('clients').update({
            name: clientForm.name,
            phone: clientForm.phone,
            address: clientForm.address
        }).eq('id', selectedClient.id)
        if (error) alert('Ошибка обновления: ' + error.message)
        else { alert('Заказчик обновлён!'); setIsClientModalOpen(false); fetchClients() }
    }
    setLoading(false)
  }

  const getStockStatus = (item: any) => {
    if (item.quantity <= 0) return { label: 'Нет в наличии', color: 'bg-red-100 text-red-800' }
    if (item.quantity < item.min_quantity) return { label: 'Критический остаток', color: 'bg-red-100 text-red-800' }
    if (item.quantity <= item.min_quantity + 2) return { label: 'Заканчивается', color: 'bg-yellow-100 text-yellow-800' }
    return { label: 'В наличии', color: 'bg-green-100 text-green-800' }
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string, color: string }> = {
      'new': { label: 'Новая', color: 'bg-yellow-100 text-yellow-800' },
      'assigned': { label: 'Назначена', color: 'bg-blue-100 text-blue-800' },
      'in_progress': { label: 'В работе', color: 'bg-orange-100 text-orange-800' },
      'completed': { label: 'Исполнена', color: 'bg-green-100 text-green-800' }
    }
    return statusMap[status] || { label: status || 'Новая', color: 'bg-gray-100 text-gray-800' }
  }

  const addServiceToOrder = (serviceId: number) => {
    const existing = selectedServices.find(s => s.service_id === serviceId)
    if (existing) {
      setSelectedServices(selectedServices.map(s => 
        s.service_id === serviceId ? { ...s, quantity: s.quantity + 1 } : s
      ))
    } else {
      setSelectedServices([...selectedServices, { service_id: serviceId, quantity: 1 }])
    }
  }

  const removeServiceFromOrder = (serviceId: number) => {
    const existing = selectedServices.find(s => s.service_id === serviceId)
    if (existing && existing.quantity > 1) {
      setSelectedServices(selectedServices.map(s => 
        s.service_id === serviceId ? { ...s, quantity: s.quantity - 1 } : s
      ))
    } else {
      setSelectedServices(selectedServices.filter(s => s.service_id !== serviceId))
    }
  }

  const calculateTotal = () => {
    return selectedServices.reduce((sum, s) => {
      const service = services.find(srv => srv.id === s.service_id)
      return sum + (service?.price || 0) * s.quantity
    }, 0)
  }

  const openOrderDetails = async (order: any) => {
    setSelectedOrder(order)
    const { data } = await supabase
      .from('order_services')
      .select('*, services(name, price)')
      .eq('order_id', order.id)
    setOrderDetails(data || [])
    
    const { data: invData } = await supabase
      .from('order_inventory')
      .select('*, inventory(name, sale_price)')
      .eq('order_id', order.id)
    setOrderInventoryDetails(invData || [])
    
    setIsDetailsModalOpen(true)
  }

  const menuItems = [
    { id: 'dashboard', label: 'Главная', icon: 'dashboard' },
    { id: 'orders', label: 'Заявки', icon: 'orders' },
    { id: 'masters', label: 'Мастера', icon: 'masters' },
    { id: 'services', label: 'Услуги', icon: 'services' },
    { id: 'inventory', label: 'Склад', icon: 'inventory' },
    { id: 'clients', label: 'Заказчики', icon: 'clients' },
    { id: 'reports', label: 'Отчёты', icon: 'reports', link: '/admin/reports' },
    { id: 'admins', label: 'Администраторы', icon: 'user', link: '/admin/admins', ownerOnly: true },
    { id: 'settings', label: 'Настройки', icon: 'settings' },
  ]

  const renderContent = () => {
    if (!companyId) {
      return <div className="p-12 text-center text-gray-500">Загрузка данных компании...</div>
    }

    if (activeTab === 'dashboard') return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100"><p className="text-xs md:text-sm text-gray-500">Всего заявок</p><p className="text-xl md:text-2xl font-bold">{orders.length}</p></div>
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100"><p className="text-xs md:text-sm text-gray-500">Активных мастеров</p><p className="text-xl md:text-2xl font-bold">{masters.filter(m => m.status === 'active').length}</p></div>
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100"><p className="text-xs md:text-sm text-gray-500">Услуг в прайсе</p><p className="text-xl md:text-2xl font-bold">{services.length}</p></div>
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100"><p className="text-xs md:text-sm text-gray-500">Позиций на складе</p><p className="text-xl md:text-2xl font-bold">{inventory.length}</p></div>
      </div>
    )

    if (activeTab === 'orders') return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <h3 className="text-lg font-bold">Список заявок</h3>
          <button onClick={() => { setSelectedOrder(null); setSelectedServices([]); setSelectedServiceId(''); setClientSearch(''); setIsNewClient(false); setIsModalOpen(true) }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm md:text-base">+ Новая заявка</button>
        </div>
        {orders.length === 0 ? <div className="p-12 text-center text-gray-500">Список пуст</div> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-gray-50"><tr><th className="px-4 md:px-6 py-3">ID</th><th className="px-4 md:px-6 py-3">Организация</th><th className="px-4 md:px-6 py-3">Контакт</th><th className="px-4 md:px-6 py-3">Адрес</th><th className="px-4 md:px-6 py-3">Мастер</th><th className="px-4 md:px-6 py-3">Сумма</th><th className="px-4 md:px-6 py-3">Статус</th><th className="px-4 md:px-6 py-3">Действия</th></tr></thead>
              <tbody>{orders.map((o) => {
                const statusBadge = getStatusBadge(o.status);
                return (
                <tr key={o.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-3 md:py-4 font-bold">#{o.id}</td>
                  <td className="px-4 md:px-6 py-3 md:py-4 font-medium">{o.organization_name}</td>
                  <td className="px-4 md:px-6 py-3 md:py-4">{o.contact_name}<br/><span className="text-xs text-gray-500">{o.contact_phone}</span></td>
                  <td className="px-4 md:px-6 py-3 md:py-4">{o.address}</td>
                  <td className="px-4 md:px-6 py-3 md:py-4">{o.master_id ? masters.find(m => m.id == o.master_id)?.name || '-' : '-'}</td>
                  <td className="px-4 md:px-6 py-3 md:py-4 font-bold text-green-600">{o.total_amount || 0} ₽</td>
                  <td className="px-4 md:px-6 py-3 md:py-4"><span className={`px-2 py-1 rounded-full text-xs ${statusBadge.color}`}>{statusBadge.label}</span></td>
                  <td className="px-4 md:px-6 py-3 md:py-4 flex gap-2">
                    <button onClick={() => openOrderDetails(o)} className="text-blue-600 hover:text-blue-800" title="Детали"><Icon name="eye" className="h-5 w-5"/></button>
                    {o.status !== 'completed' && (
                      <button onClick={() => { setSelectedOrder(o); setSelectedMasterId(o.master_id || ''); setIsAssignModalOpen(true) }} className="text-green-600 hover:text-green-800 font-medium text-xs">Назначить</button>
                    )}
                  </td>
                </tr>
                );
              })}</tbody>
            </table>
          </div>
        )}
      </div>
    )

    if (activeTab === 'masters') return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 md:p-6 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <h3 className="text-lg font-bold">Список мастеров</h3>
                <button onClick={openNewMaster} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm md:text-base">+ Добавить мастера</button>
            </div>
            {masters.length === 0 ? <div className="p-12 text-center text-gray-500">Нет мастеров</div> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[700px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 md:px-6 py-3">ID</th><th className="px-4 md:px-6 py-3">Имя</th><th className="px-4 md:px-6 py-3">Телефон</th>
                                <th className="px-4 md:px-6 py-3">Спец.</th><th className="px-4 md:px-6 py-3">%</th>
                                <th className="px-4 md:px-6 py-3">Статус</th><th className="px-4 md:px-6 py-3">Действия</th>
                            </tr>
                        </thead>
                        <tbody>{masters.map((m) => (
                            <tr key={m.id} className={`border-t ${m.status !== 'active' ? 'bg-gray-50 opacity-60' : ''}`}>
                                <td className="px-4 md:px-6 py-3 md:py-4 font-bold">#{m.id}</td>
                                <td className="px-4 md:px-6 py-3 md:py-4 font-medium">{m.name}</td>
                                <td className="px-4 md:px-6 py-3 md:py-4">{m.phone}</td>
                                <td className="px-4 md:px-6 py-3 md:py-4">{m.specialization}</td>
                                <td className="px-4 md:px-6 py-3 md:py-4 font-bold">{m.commission_percent}%</td>
                                <td className="px-4 md:px-6 py-3 md:py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${m.statusColor}`}>{m.statusLabel}</span>
                                </td>
                                <td className="px-4 md:px-6 py-3 md:py-4 flex gap-2">
                                    <button onClick={() => openEditMaster(m)} className="text-blue-600 hover:text-blue-800" title="Редактировать"><Icon name="edit" className="h-5 w-5"/></button>
                                    {m.login_phone && (
                                      <button onClick={() => handleResetMasterPassword(m)} className="text-orange-600 hover:text-orange-800" title="Сбросить пароль"><Icon name="key" className="h-5 w-5"/></button>
                                    )}
                                    {m.status === 'active' && (
                                        <button onClick={() => handleFireMaster(m.id)} className="text-red-600 hover:text-red-800" title="Уволить"><Icon name="trash" className="h-5 w-5"/></button>
                                    )}
                                </td>
                            </tr>
                        ))}</tbody>
                    </table>
                </div>
            )}
        </div>
    )

    if (activeTab === 'services') return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 md:p-6 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <h3 className="text-lg font-bold">Прайс-лист услуг</h3>
                <button onClick={openNewService} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm md:text-base">+ Добавить услугу</button>
            </div>
            {services.length === 0 ? <div className="p-12 text-center text-gray-500">Нет услуг</div> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[500px]">
                        <thead className="bg-gray-50">
                            <tr><th className="px-4 md:px-6 py-3">ID</th><th className="px-4 md:px-6 py-3">Название</th><th className="px-4 md:px-6 py-3">Описание</th><th className="px-4 md:px-6 py-3">Цена</th><th className="px-4 md:px-6 py-3">Действия</th></tr>
                        </thead>
                        <tbody>{services.map((s) => (
                            <tr key={s.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 md:px-6 py-3 md:py-4">#{s.id}</td>
                                <td className="px-4 md:px-6 py-3 md:py-4 font-medium">{s.name}</td>
                                <td className="px-4 md:px-6 py-3 md:py-4 text-gray-600">{s.description || '-'}</td>
                                <td className="px-4 md:px-6 py-3 md:py-4 font-bold text-green-600">{s.price} ₽</td>
                                <td className="px-4 md:px-6 py-3 md:py-4 flex gap-2">
                                    <button onClick={() => openEditService(s)} className="text-blue-600 hover:text-blue-800"><Icon name="edit" className="h-5 w-5"/></button>
                                    <button onClick={() => handleDeleteService(s.id)} className="text-red-600 hover:text-red-800"><Icon name="trash" className="h-5 w-5"/></button>
                                </td>
                            </tr>
                        ))}</tbody>
                    </table>
                </div>
            )}
        </div>
    )

    if (activeTab === 'inventory') return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 md:p-6 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <h3 className="text-lg font-bold">Склад</h3>
                <button onClick={openNewInventory} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm md:text-base">+ Добавить позицию</button>
            </div>
            {inventory.length === 0 ? <div className="p-12 text-center text-gray-500">Склад пуст</div> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[800px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 md:px-6 py-3">ID</th>
                                <th className="px-4 md:px-6 py-3">Название</th>
                                <th className="px-4 md:px-6 py-3">Категория</th>
                                <th className="px-4 md:px-6 py-3">Закупка</th>
                                <th className="px-4 md:px-6 py-3">Продажа</th>
                                <th className="px-4 md:px-6 py-3">Остаток</th>
                                <th className="px-4 md:px-6 py-3">Статус</th>
                                <th className="px-4 md:px-6 py-3">Действия</th>
                            </tr>
                        </thead>
                        <tbody>{inventory.map((item) => {
                            const status = getStockStatus(item);
                            return (
                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 md:px-6 py-3 md:py-4">#{item.id}</td>
                                <td className="px-4 md:px-6 py-3 md:py-4 font-medium">{item.name}</td>
                                <td className="px-4 md:px-6 py-3 md:py-4 text-gray-600">{item.category || '-'}</td>
                                <td className="px-4 md:px-6 py-3 md:py-4 text-gray-600">{item.purchase_price} ₽</td>
                                <td className="px-4 md:px-6 py-3 md:py-4 font-bold text-green-600">{item.sale_price} ₽</td>
                                <td className="px-4 md:px-6 py-3 md:py-4 font-bold">{item.quantity} шт.</td>
                                <td className="px-4 md:px-6 py-3 md:py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${status.color}`}>{status.label}</span>
                                </td>
                                <td className="px-4 md:px-6 py-3 md:py-4 flex gap-2">
                                    <button onClick={() => openEditInventory(item)} className="text-blue-600 hover:text-blue-800"><Icon name="edit" className="h-5 w-5"/></button>
                                    <button onClick={() => handleDeleteInventory(item.id)} className="text-red-600 hover:text-red-800"><Icon name="trash" className="h-5 w-5"/></button>
                                </td>
                            </tr>
                            );
                        })}</tbody>
                    </table>
                </div>
            )}
        </div>
    )

    if (activeTab === 'clients') return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 md:p-6 border-b">
                <h3 className="text-lg font-bold">База заказчиков</h3>
            </div>
            {clients.length === 0 ? <div className="p-12 text-center text-gray-500">Нет заказчиков</div> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[600px]">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 md:px-6 py-3">ID</th>
                            <th className="px-4 md:px-6 py-3">Название</th>
                            <th className="px-4 md:px-6 py-3">Телефон</th>
                            <th className="px-4 md:px-6 py-3">Адрес</th>
                            <th className="px-4 md:px-6 py-3">Заявок</th>
                            <th className="px-4 md:px-6 py-3">Действия</th>
                          </tr>
                        </thead>
                        <tbody>{clients.map((c) => {
                          const clientOrders = orders.filter(o => o.client_id === c.id)
                          const completedOrders = clientOrders.filter(o => o.status === 'completed')
                          return (
                            <tr key={c.id} className="border-t hover:bg-gray-50">
                              <td className="px-4 md:px-6 py-3 md:py-4 font-bold">#{c.id}</td>
                              <td className="px-4 md:px-6 py-3 md:py-4 font-medium">{c.name}</td>
                              <td className="px-4 md:px-6 py-3 md:py-4">{c.phone}</td>
                              <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-600">{c.address || '-'}</td>
                              <td className="px-4 md:px-6 py-3 md:py-4">
                                <span className="font-bold">{completedOrders.length}</span>
                                <span className="text-xs text-gray-500"> / {clientOrders.length}</span>
                              </td>
                              <td className="px-4 md:px-6 py-3 md:py-4">
                                <button onClick={() => openEditClient(c)} className="text-blue-600 hover:text-blue-800"><Icon name="edit" className="h-5 w-5"/></button>
                              </td>
                            </tr>
                          );
                        })}</tbody>
                    </table>
                </div>
            )}
        </div>
    )

    if (activeTab === 'settings') return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b">
          <h3 className="text-lg font-bold">Настройки компании</h3>
          <p className="text-sm text-gray-500 mt-1">Укажите контактные данные вашей организации</p>
        </div>
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Название компании</label>
            <input 
              type="text" 
              value={settingsForm.company_name}
              onChange={e => setSettingsForm({...settingsForm, company_name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="ООО Ромашка"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Телефон офиса</label>
            <input 
              type="tel" 
              value={settingsForm.office_phone}
              onChange={e => setSettingsForm({...settingsForm, office_phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="+79001234567"
            />
            <p className="text-xs text-gray-500 mt-1">Этот номер будут видеть мастера в кнопке "Офис"</p>
          </div>
          
          {settingsSaved && (
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg">
              ✓ Настройки сохранены!
            </div>
          )}
          
          <button 
            onClick={handleSaveSettings}
            disabled={settingsLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 w-full md:w-auto"
          >
            {settingsLoading ? 'Сохранение...' : 'Сохранить настройки'}
          </button>
        </div>
      </div>
    )

    return <div className="p-12 text-center text-gray-500">Раздел в разработке</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex" suppressHydrationWarning>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <aside className={`w-64 bg-white border-r fixed h-full z-30 transform transition-transform duration-200 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 md:p-6 border-b flex justify-between items-center">
          <div>
            <h1 className="font-bold text-xl">BluRICH <span className="text-blue-600 text-sm">Master</span></h1>
            {companyName && <p className="text-xs text-gray-500 mt-1">{companyName}</p>}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-600"
          >
            <Icon name="close" className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {menuItems.filter(item => !item.ownerOnly || currentUserIsOwner).map((item) => (
            item.link ? (
              <a key={item.id} href={item.link} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <Icon name={item.icon} className="h-5 w-5"/>
                {item.label}
              </a>
            ) : (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Icon name={item.icon} className="h-5 w-5"/>
                {item.label}
              </button>
            )
          ))}
        </nav>
        <div className="p-4 border-t mt-auto">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50">
            <Icon name="logout" className="h-5 w-5"/>Выйти
          </button>
        </div>
      </aside>
      
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="md:hidden flex items-center justify-between mb-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-200"
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-bold">{menuItems.find(i => i.id === activeTab)?.label}</h2>
          <div className="w-10" />
        </div>
        
        <header className="hidden md:block mb-8"><h2 className="text-2xl font-bold">{menuItems.find(i => i.id === activeTab)?.label}</h2></header>
        {renderContent()}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[95vh] md:max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 md:p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">Новая заявка</h3>
              <button onClick={() => setIsModalOpen(false)}><Icon name="close" className="h-6 w-6"/></button>
            </div>
            <div className="p-4 md:p-6 overflow-y-auto flex-1">
              <h4 className="text-sm font-bold text-blue-800 mb-3">1. Организация</h4>
              <div className="mb-6">
                <label className="block text-xs text-gray-500 mb-1">Поиск клиента или создание нового</label>
                <div className="relative" ref={clientDropdownRef}>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Icon name="search" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        value={clientSearch}
                        onChange={e => {
                          setClientSearch(e.target.value)
                          setShowClientDropdown(true)
                          setIsNewClient(false)
                          setFormData({...formData, organization_name: e.target.value})
                        }}
                        onFocus={() => setShowClientDropdown(true)}
                        className="w-full p-2 pl-9 border rounded"
                        placeholder="Начните вводить название организации..."
                      />
                    </div>
                    <button 
                      onClick={handleNewClient}
                      className={`px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium ${isNewClient ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <Icon name="userPlus" className="h-4 w-4" />
                      <span className="hidden sm:inline">Новый клиент</span>
                    </button>
                  </div>
                  
                  {showClientDropdown && !isNewClient && clientSearch.length > 0 && filteredClients.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredClients.map(client => (
                        <button
                          key={client.id}
                          onClick={() => handleSelectClient(client)}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b last:border-b-0"
                        >
                          <div className="font-medium">{client.name}</div>
                          <div className="text-xs text-gray-500 flex gap-3">
                            <span> {client.phone || 'нет телефона'}</span>
                            {client.address && <span> {client.address}</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {isNewClient && (
                  <div className="mt-2 text-xs text-green-600 font-medium">✓ Режим создания нового клиента</div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><label className="block text-xs text-gray-500 mb-1">Должность</label><input type="text" value={formData.client_position} onChange={e => setFormData({...formData, client_position: e.target.value})} className="w-full p-2 border rounded"/></div>
                <div><label className="block text-xs text-gray-500 mb-1">Телефон</label><input type="tel" value={formData.client_phone} onChange={e => setFormData({...formData, client_phone: e.target.value})} className="w-full p-2 border rounded"/></div>
              </div>
              
              <hr className="my-4"/>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-green-800">2. Контактное лицо</h4>
                <label className="flex items-center cursor-pointer"><input type="checkbox" checked={isSameAsClient} onChange={e => setIsSameAsClient(e.target.checked)} className="mr-2"/><span className="text-xs">Совпадает с заказчиком</span></label>
              </div>
              {!isSameAsClient && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2"><label className="block text-xs text-gray-500 mb-1">ФИО</label><input type="text" value={formData.contact_name} onChange={e => setFormData({...formData, contact_name: e.target.value})} className="w-full p-2 border rounded"/></div>
                  <div><label className="block text-xs text-gray-500 mb-1">Телефон</label><input type="tel" value={formData.contact_phone} onChange={e => setFormData({...formData, contact_phone: e.target.value})} className="w-full p-2 border rounded"/></div>
                  <div><label className="block text-xs text-gray-500 mb-1">Должность</label><input type="text" value={formData.contact_position} onChange={e => setFormData({...formData, contact_position: e.target.value})} className="w-full p-2 border rounded"/></div>
                </div>
              )}
              <h4 className="text-sm font-bold text-gray-800 mb-3">3. Детали</h4>
              <div className="space-y-4 mb-6">
                <div><label className="block text-xs text-gray-500 mb-1">Адрес</label><input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-2 border rounded"/></div>
                <div><label className="block text-xs text-gray-500 mb-1">Описание</label><textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded"></textarea></div>
              </div>
              <hr className="my-4"/>
              <h4 className="text-sm font-bold text-purple-800 mb-3">4. Услуги</h4>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-2">Добавить услугу из прайса:</label>
                <div className="flex gap-2">
                  <select value={selectedServiceId} onChange={e => setSelectedServiceId(e.target.value)} className="flex-1 p-2 border rounded text-sm">
                    <option value="">Выберите услугу...</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name} - {s.price} ₽</option>)}
                  </select>
                  <button onClick={() => {
                    if (selectedServiceId) {
                      addServiceToOrder(Number(selectedServiceId));
                      setSelectedServiceId('');
                    }
                  }} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">Добавить</button>
                </div>
              </div>
              {selectedServices.length > 0 && (
                <div className="border rounded p-4 bg-purple-50">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b"><th className="text-left py-2">Услуга</th><th className="text-center py-2">Кол-во</th><th className="text-right py-2">Сумма</th><th className="py-2"></th></tr></thead>
                    <tbody>
                      {selectedServices.map(s => {
                        const service = services.find(srv => srv.id === s.service_id);
                        return (
                          <tr key={s.service_id} className="border-b">
                            <td className="py-2">{service?.name}</td>
                            <td className="text-center py-2">
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={() => removeServiceFromOrder(s.service_id)} className="w-6 h-6 bg-red-100 rounded hover:bg-red-200"><Icon name="minus" className="h-4 w-4"/></button>
                                <span className="font-bold">{s.quantity}</span>
                                <button onClick={() => addServiceToOrder(s.service_id)} className="w-6 h-6 bg-green-100 rounded hover:bg-green-200"><Icon name="plus" className="h-4 w-4"/></button>
                              </div>
                            </td>
                            <td className="text-right py-2 font-bold">{(service?.price || 0) * s.quantity} ₽</td>
                            <td className="text-right py-2">
                              <button onClick={() => setSelectedServices(selectedServices.filter(x => x.service_id !== s.service_id))} className="text-red-600 hover:text-red-800"><Icon name="trash" className="h-4 w-4"/></button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="mt-4 text-right">
                    <span className="text-lg font-bold text-purple-800">Итого: {calculateTotal()} ₽</span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 md:p-6 border-t flex justify-end gap-3 bg-gray-50">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded text-sm">Отмена</button>
              <button onClick={handleSubmitOrder} disabled={loading || !formData.organization_name} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm">{loading ? 'Сохранение...' : 'Создать заявку'}</button>
            </div>
          </div>
        </div>
      )}

      {isAssignModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Назначить мастера</h3>
              <button onClick={() => setIsAssignModalOpen(false)}><Icon name="close" className="h-6 w-6"/></button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Заявка #{selectedOrder.id}: {selectedOrder.organization_name}</p>
            <label className="block text-xs text-gray-500 mb-1">Выберите мастера:</label>
            <select value={selectedMasterId} onChange={e => setSelectedMasterId(e.target.value)} className="w-full p-3 border rounded-lg mb-6 text-sm">
              <option value="">-- Не назначен --</option>
              {masters.filter(m => m.status === 'active').map(m => (
                <option key={m.id} value={m.id} disabled={m.loadCount >= 3}>
                    {m.name} ({m.specialization}) - {m.statusLabel}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsAssignModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded">Отмена</button>
              <button onClick={handleAssignMaster} disabled={loading || !selectedMasterId} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">{loading ? 'Сохранение...' : 'Назначить'}</button>
            </div>
          </div>
        </div>
      )}

      {isDetailsModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Заявка #{selectedOrder.id}</h3>
              <button onClick={() => setIsDetailsModalOpen(false)}><Icon name="close" className="h-6 w-6"/></button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600"><strong>Организация:</strong> {selectedOrder.organization_name}</p>
              <p className="text-sm text-gray-600"><strong>Адрес:</strong> {selectedOrder.address}</p>
              <p className="text-sm text-gray-600"><strong>Мастер:</strong> {selectedOrder.master_id ? masters.find(m => m.id == selectedOrder.master_id)?.name : 'Не назначен'}</p>
              <p className="text-sm text-gray-600"><strong>Статус:</strong> {getStatusBadge(selectedOrder.status).label}</p>
            </div>
            <hr className="my-4"/>
            
            <h4 className="font-bold mb-3">Услуги:</h4>
            {orderDetails.length === 0 ? (
              <p className="text-gray-500 text-sm mb-4">Услуги не добавлены</p>
            ) : (
              <table className="w-full text-sm mb-4">
                <thead><tr className="border-b"><th className="text-left py-2">Услуга</th><th className="text-center py-2">Кол-во</th><th className="text-right py-2">Цена</th><th className="text-right py-2">Сумма</th></tr></thead>
                <tbody>
                  {orderDetails.map((d: any) => (
                    <tr key={d.id} className="border-b">
                      <td className="py-2">{d.services?.name}</td>
                      <td className="text-center py-2">{d.quantity}</td>
                      <td className="text-right py-2">{d.price} ₽</td>
                      <td className="text-right py-2 font-bold">{d.price * d.quantity} ₽</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="mt-4 text-right border-t pt-4">
              <span className="text-xl font-bold text-green-600">Итого: {selectedOrder.total_amount || 0} ₽</span>
            </div>
          </div>
        </div>
      )}

      {isMasterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{selectedMaster ? 'Редактировать мастера' : 'Новый мастер'}</h3>
              <button onClick={() => setIsMasterModalOpen(false)}><Icon name="close" className="h-6 w-6"/></button>
            </div>
            <div className="space-y-4">
                <div><label className="block text-xs text-gray-500 mb-1">ФИО</label><input type="text" value={masterForm.name} onChange={e => setMasterForm({...masterForm, name: e.target.value})} className="w-full p-2 border rounded"/></div>
                <div><label className="block text-xs text-gray-500 mb-1">Телефон (контактный)</label><input type="tel" value={masterForm.phone} onChange={e => setMasterForm({...masterForm, phone: e.target.value})} className="w-full p-2 border rounded"/></div>
                <div><label className="block text-xs text-gray-500 mb-1">Специализация</label><input type="text" value={masterForm.specialization} onChange={e => setMasterForm({...masterForm, specialization: e.target.value})} className="w-full p-2 border rounded"/></div>
                <div><label className="block text-xs text-gray-500 mb-1">Процент от услуг (%)</label><input type="number" value={masterForm.commission_percent} onChange={e => setMasterForm({...masterForm, commission_percent: Number(e.target.value)})} className="w-full p-2 border rounded"/></div>
                
                {!selectedMaster && (
                  <>
                    <hr className="my-2"/>
                    <h4 className="text-sm font-bold text-blue-800">Данные для входа в портал мастера</h4>
                    <div><label className="block text-xs text-gray-500 mb-1">Телефон (логин для входа)</label><input type="tel" value={masterForm.login_phone || ''} onChange={e => setMasterForm({...masterForm, login_phone: e.target.value})} className="w-full p-2 border rounded" placeholder="+79001234567"/></div>
                    <div><label className="block text-xs text-gray-500 mb-1">Пароль</label><input type="password" value={masterForm.password || ''} onChange={e => setMasterForm({...masterForm, password: e.target.value})} className="w-full p-2 border rounded" placeholder="Минимум 6 символов"/></div>
                  </>
                )}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsMasterModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded">Отмена</button>
              <button onClick={handleSaveMaster} disabled={loading || !masterForm.name} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">{loading ? 'Сохранение...' : 'Сохранить'}</button>
            </div>
          </div>
        </div>
      )}

      {isServiceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{selectedService ? 'Редактировать услугу' : 'Новая услуга'}</h3>
              <button onClick={() => setIsServiceModalOpen(false)}><Icon name="close" className="h-6 w-6"/></button>
            </div>
            <div className="space-y-4">
                <div><label className="block text-xs text-gray-500 mb-1">Название услуги</label><input type="text" value={serviceForm.name} onChange={e => setServiceForm({...serviceForm, name: e.target.value})} className="w-full p-2 border rounded"/></div>
                <div><label className="block text-xs text-gray-500 mb-1">Описание</label><textarea rows={3} value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} className="w-full p-2 border rounded"></textarea></div>
                <div><label className="block text-xs text-gray-500 mb-1">Цена для клиента (₽)</label><input type="number" value={serviceForm.price} onChange={e => setServiceForm({...serviceForm, price: Number(e.target.value)})} className="w-full p-2 border rounded"/></div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsServiceModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded">Отмена</button>
              <button onClick={handleSaveService} disabled={loading || !serviceForm.name} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">{loading ? 'Сохранение...' : 'Сохранить'}</button>
            </div>
          </div>
        </div>
      )}

      {isInventoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{selectedItem ? 'Редактировать позицию' : 'Новая позиция на склад'}</h3>
              <button onClick={() => setIsInventoryModalOpen(false)}><Icon name="close" className="h-6 w-6"/></button>
            </div>
            <div className="space-y-4">
                <div><label className="block text-xs text-gray-500 mb-1">Название</label><input type="text" value={inventoryForm.name} onChange={e => setInventoryForm({...inventoryForm, name: e.target.value})} className="w-full p-2 border rounded"/></div>
                <div><label className="block text-xs text-gray-500 mb-1">Категория</label><input type="text" value={inventoryForm.category} onChange={e => setInventoryForm({...inventoryForm, category: e.target.value})} className="w-full p-2 border rounded"/></div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-xs text-gray-500 mb-1">Цена закупки (₽)</label><input type="number" value={inventoryForm.purchase_price} onChange={e => setInventoryForm({...inventoryForm, purchase_price: Number(e.target.value)})} className="w-full p-2 border rounded"/></div>
                    <div><label className="block text-xs text-gray-500 mb-1">Цена продажи (₽)</label><input type="number" value={inventoryForm.sale_price} onChange={e => setInventoryForm({...inventoryForm, sale_price: Number(e.target.value)})} className="w-full p-2 border rounded"/></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-xs text-gray-500 mb-1">Остаток (шт.)</label><input type="number" value={inventoryForm.quantity} onChange={e => setInventoryForm({...inventoryForm, quantity: Number(e.target.value)})} className="w-full p-2 border rounded"/></div>
                    <div><label className="block text-xs text-gray-500 mb-1">Неснижаемый остаток (шт.)</label><input type="number" value={inventoryForm.min_quantity} onChange={e => setInventoryForm({...inventoryForm, min_quantity: Number(e.target.value)})} className="w-full p-2 border rounded"/></div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsInventoryModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded">Отмена</button>
              <button onClick={handleSaveInventory} disabled={loading || !inventoryForm.name} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">{loading ? 'Сохранение...' : 'Сохранить'}</button>
            </div>
          </div>
        </div>
      )}

      {isClientModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Редактировать заказчика</h3>
              <button onClick={() => setIsClientModalOpen(false)}><Icon name="close" className="h-6 w-6"/></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-xs text-gray-500 mb-1">Название организации</label><input type="text" value={clientForm.name} onChange={e => setClientForm({...clientForm, name: e.target.value})} className="w-full p-2 border rounded"/></div>
              <div><label className="block text-xs text-gray-500 mb-1">Телефон</label><input type="tel" value={clientForm.phone} onChange={e => setClientForm({...clientForm, phone: e.target.value})} className="w-full p-2 border rounded"/></div>
              <div><label className="block text-xs text-gray-500 mb-1">Адрес</label><input type="text" value={clientForm.address} onChange={e => setClientForm({...clientForm, address: e.target.value})} className="w-full p-2 border rounded"/></div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsClientModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded">Отмена</button>
              <button onClick={handleSaveClient} disabled={loading || !clientForm.name} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">{loading ? 'Сохранение...' : 'Сохранить'}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
