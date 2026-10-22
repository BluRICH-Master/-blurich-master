'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    logout: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />,
    phone: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
    money: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    clipboard: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    play: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />,
    key: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />,
    close: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  }
  return <svg className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">{icons[name] || icons.user}</svg>
}

export default function MasterPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [master, setMaster] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [officePhone, setOfficePhone] = useState('')
  const [companyName, setCompanyName] = useState('')
  
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const [passwordError, setPasswordError] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const fakeEmail = user.email || ''
      const phoneFromEmail = fakeEmail.replace('master_', '').replace('@blurich.ru', '')
      const formattedPhone = '+' + phoneFromEmail

      const { data: masterData } = await supabase
        .from('masters')
        .select('*')
        .eq('login_phone', formattedPhone)
        .single()

      if (masterData) {
        setMaster(masterData)
        
        const companyId = masterData.company_id
        
        // Получаем заявки мастера только его компании
        const { data: ordersData } = await supabase
          .from('orders')
          .select('*')
          .eq('master_id', masterData.id)
          .eq('company_id', companyId)
          .order('created_at', { ascending: false })
        
        setOrders(ordersData || [])

        // Получаем телефон офиса СВОЕЙ компании
        const { data: companyData } = await supabase
          .from('companies')
          .select('office_phone, name')
          .eq('id', companyId)
          .single()
        
        if (companyData) {
          setOfficePhone(companyData.office_phone || '')
          setCompanyName(companyData.name || '')
        }
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    localStorage.removeItem('company_id')
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordLoading(true)

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('Новый пароль должен содержать минимум 6 символов')
      setPasswordLoading(false)
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Пароли не совпадают')
      setPasswordLoading(false)
      return
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setPasswordError('Пользователь не найден')
        setPasswordLoading(false)
        return
      }

      const fakeEmail = user.email || ''
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: fakeEmail,
        password: passwordForm.oldPassword,
      })

      if (signInError) {
        setPasswordError('Неверный старый пароль')
        setPasswordLoading(false)
        return
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      })

      if (updateError) {
        setPasswordError('Ошибка смены пароля: ' + updateError.message)
        setPasswordLoading(false)
        return
      }

      alert('Пароль успешно изменён!')
      setIsPasswordModalOpen(false)
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setPasswordError('Произошла ошибка')
      console.error(err)
    }

    setPasswordLoading(false)
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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + ' ₽'
  }

  const handleCallOffice = () => {
    if (officePhone) {
      window.location.href = `tel:${officePhone}`
    } else {
      alert('Телефон офиса не указан. Обратитесь к администратору.')
    }
  }

  const handleAcceptOrder = async (orderId: number) => {
    if (!confirm('Принять эту заявку в работу?')) return
    
    const { error } = await supabase
      .from('orders')
      .update({ status: 'in_progress' })
      .eq('id', orderId)
    
    if (error) {
      alert('Ошибка: ' + error.message)
    } else {
      alert('Заявка принята в работу!')
      loadData()
    }
  }

  const handleCompleteOrder = async (orderId: number) => {
    if (!confirm('Отметить заявку как исполненную?')) return
    
    const { error } = await supabase
      .from('orders')
      .update({ status: 'completed' })
      .eq('id', orderId)
    
    if (error) {
      alert('Ошибка: ' + error.message)
    } else {
      alert('Заявка отмечена как исполненная!')
      loadData()
    }
  }

  if (!mounted || loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', marginBottom: '8px' }}>BluRICH-Master</div>
          <div style={{ color: '#6b7280' }}>Загрузка...</div>
        </div>
      </div>
    )
  }

  if (!master) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', marginBottom: '8px' }}>Мастер не найден</div>
          <div style={{ color: '#6b7280' }}>Обратитесь к администратору</div>
        </div>
      </div>
    )
  }

  const activeOrders = orders.filter(o => o.status !== 'completed')
  const completedOrders = orders.filter(o => o.status === 'completed')
  const totalEarnings = completedOrders.reduce((sum, o) => sum + (o.master_earnings || 0), 0)

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Шапка */}
      <header style={{ background: 'white', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
              {master.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{master.name}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{master.specialization || 'Мастер'} • {companyName}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={() => setIsPasswordModalOpen(true)}
              style={{ color: '#2563eb', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}
              title="Сменить пароль"
            >
              <Icon name="key" className="h-4 w-4" />
              <span>Пароль</span>
            </button>
            <button 
              onClick={handleLogout} 
              style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Icon name="logout" className="h-4 w-4" />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '896px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Кнопка ОФИС */}
        <button 
          onClick={handleCallOffice}
          style={{ width: '100%', background: 'linear-gradient(to right, #22c55e, #16a34a)', color: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', border: 'none', cursor: 'pointer', marginBottom: '24px' }}
        >
          <Icon name="phone" className="h-6 w-6" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>ОФИС</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>{officePhone || 'Нажмите, чтобы позвонить'}</div>
          </div>
        </button>

        {/* Статистика */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #dbeafe' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Icon name="clipboard" className="h-4 w-4" />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Активных</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>{activeOrders.length}</div>
          </div>
          <div style={{ background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #dcfce7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Icon name="check" className="h-4 w-4" />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Выполнено</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>{completedOrders.length}</div>
          </div>
          <div style={{ background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3e8ff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Icon name="money" className="h-4 w-4" />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Заработано</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9333ea' }}>{formatMoney(totalEarnings)}</div>
          </div>
        </div>

        {/* Активные заявки */}
        {activeOrders.length > 0 && (
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', background: '#fff7ed' }}>
              <h3 style={{ fontWeight: 'bold', color: '#9a3412', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <Icon name="clock" className="h-5 w-5" />
                Активные заявки ({activeOrders.length})
              </h3>
            </div>
            <div>
              {activeOrders.map((order, idx) => {
                const status = getStatusBadge(order.status)
                const isAssigned = order.status === 'assigned' || order.status === 'new'
                const isInProgress = order.status === 'in_progress'
                
                return (
                  <div key={order.id} style={{ padding: '16px', borderBottom: idx < activeOrders.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 'bold' }}>Заявка #{order.id}</span>
                          <span style={{ padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: 'bold', background: status.color.includes('yellow') ? '#fef9c3' : status.color.includes('blue') ? '#dbeafe' : '#fed7aa', color: status.color.includes('yellow') ? '#854d0e' : status.color.includes('blue') ? '#1e40af' : '#9a3412' }}>
                            {status.label}
                          </span>
                        </div>
                        <div style={{ fontSize: '14px', color: '#4b5563' }}>{order.organization_name}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}> {order.address}</div>
                        {order.contact_name && (
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>👤 {order.contact_name} {order.contact_phone && `• ${order.contact_phone}`}</div>
                        )}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold', color: '#16a34a' }}>{order.total_amount || 0} ₽</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>{formatDate(order.created_at)}</div>
                      </div>
                    </div>
                    {order.description && (
                      <div style={{ fontSize: '14px', color: '#374151', background: '#f9fafb', padding: '8px', borderRadius: '8px', marginTop: '8px' }}>
                        {order.description}
                      </div>
                    )}
                    
                    <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                      {isAssigned && (
                        <button 
                          onClick={() => handleAcceptOrder(order.id)}
                          style={{ flex: 1, background: '#2563eb', color: 'white', padding: '8px', borderRadius: '8px', fontWeight: '500', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                          <Icon name="play" className="h-4 w-4" />
                          Принять в работу
                        </button>
                      )}
                      {isInProgress && (
                        <button 
                          onClick={() => handleCompleteOrder(order.id)}
                          style={{ flex: 1, background: '#16a34a', color: 'white', padding: '8px', borderRadius: '8px', fontWeight: '500', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                          <Icon name="check" className="h-4 w-4" />
                          Отметить выполненной
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Выполненные заявки */}
        {completedOrders.length > 0 && (
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', background: '#f0fdf4' }}>
              <h3 style={{ fontWeight: 'bold', color: '#166534', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <Icon name="check" className="h-5 w-5" />
                Выполненные заявки ({completedOrders.length})
              </h3>
            </div>
            <div>
              {completedOrders.slice(0, 10).map((order, idx) => (
                <div key={order.id} style={{ padding: '16px', borderBottom: idx < 9 ? '1px solid #e5e7eb' : 'none', opacity: 0.75 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>Заявка #{order.id}</div>
                      <div style={{ fontSize: '14px', color: '#4b5563' }}>{order.organization_name}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{formatDate(order.created_at)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 'bold', color: '#16a34a' }}>{order.total_amount || 0} ₽</div>
                      <div style={{ fontSize: '12px', color: '#9333ea' }}>ЗП: {order.master_earnings || 0} ₽</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {orders.length === 0 && (
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', padding: '48px', textAlign: 'center', color: '#6b7280' }}>
            У вас пока нет заявок
          </div>
        )}
      </main>

      {/* МОДАЛКА СМЕНЫ ПАРОЛЯ */}
      {isPasswordModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '448px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Сменить пароль</h3>
              <button onClick={() => setIsPasswordModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <Icon name="close" className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleChangePassword}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Старый пароль</label>
                <input 
                  type="password" 
                  value={passwordForm.oldPassword}
                  onChange={e => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }}
                  placeholder="Введите текущий пароль"
                  required
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Новый пароль</label>
                <input 
                  type="password" 
                  value={passwordForm.newPassword}
                  onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }}
                  placeholder="Минимум 6 символов"
                  required
                  minLength={6}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Подтвердите новый пароль</label>
                <input 
                  type="password" 
                  value={passwordForm.confirmPassword}
                  onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }}
                  placeholder="Повторите новый пароль"
                  required
                />
              </div>

              {passwordError && (
                <div style={{ background: '#fef2f2', color: '#dc2626', padding: '8px 12px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px' }}>
                  {passwordError}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px' }}>
                <button 
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  style={{ padding: '8px 16px', color: '#4b5563', background: 'none', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Отмена
                </button>
                <button 
                  type="submit"
                  disabled={passwordLoading}
                  style={{ padding: '8px 16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', opacity: passwordLoading ? 0.5 : 1 }}
                >
                  {passwordLoading ? 'Сохранение...' : 'Сменить пароль'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}