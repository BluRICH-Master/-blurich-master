'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function MasterCardPage() {
  const router = useRouter()
  const params = useParams()
  const masterId = params.id as string
  
  const [companyId, setCompanyId] = useState<number | null>(null)
  const [master, setMaster] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedCompanyId = localStorage.getItem('company_id')
    if (storedCompanyId) {
      setCompanyId(parseInt(storedCompanyId))
      loadData(parseInt(storedCompanyId))
    } else {
      router.push('/login')
    }
  }, [masterId])

  const loadData = async (cid: number) => {
    setLoading(true)
    
    // Загружаем мастера ТОЛЬКО своей компании
    const { data: masterData, error } = await supabase
      .from('masters')
      .select('*')
      .eq('id', masterId)
      .eq('company_id', cid)
      .single()
    
    if (error || !masterData) {
      alert('Мастер не найден или нет доступа')
      router.push('/admin')
      return
    }
    
    setMaster(masterData)

    // Загружаем заявки мастера ТОЛЬКО своей компании
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .eq('master_id', masterId)
      .eq('company_id', cid)
      .order('created_at', { ascending: false })
    
    if (ordersData) setOrders(ordersData)

    setLoading(false)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    )
  }

  if (!master) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Мастер не найден</div>
      </div>
    )
  }

  const completedOrders = orders.filter(o => o.status === 'completed')
  const activeOrders = orders.filter(o => o.status !== 'completed')
  const totalEarnings = completedOrders.reduce((sum, o) => sum + (o.master_earnings || 0), 0)
  const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Шапка */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.push('/admin')} className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
            ← Назад
          </button>
          <h1 className="text-2xl font-bold">Карточка мастера</h1>
        </div>

        {/* Информация о мастере */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl font-bold">
              {master.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{master.name}</h2>
              <p className="text-gray-600 mt-1">{master.specialization || 'Специализация не указана'}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-xs text-gray-500">Телефон</div>
                  <div className="font-medium">{master.phone || '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Процент</div>
                  <div className="font-medium text-blue-600">{master.commission_percent}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Статус</div>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${master.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                    {master.status === 'active' ? 'Активен' : 'Уволен'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Логин</div>
                  <div className="font-medium text-sm">{master.login_phone || 'Не задан'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-xs text-gray-500 uppercase">Всего заявок</div>
            <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-xs text-gray-500 uppercase">Активных</div>
            <div className="text-2xl font-bold text-orange-600">{activeOrders.length}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-xs text-gray-500 uppercase">Выполнено</div>
            <div className="text-2xl font-bold text-green-600">{completedOrders.length}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-xs text-gray-500 uppercase">Заработано</div>
            <div className="text-2xl font-bold text-purple-600">{totalEarnings.toLocaleString('ru-RU')} ₽</div>
          </div>
        </div>

        {/* Активные заявки */}
        {activeOrders.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
            <div className="p-4 border-b bg-orange-50">
              <h3 className="font-bold text-orange-900">Активные заявки ({activeOrders.length})</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Организация</th>
                  <th className="px-4 py-3 text-left">Адрес</th>
                  <th className="px-4 py-3 text-right">Сумма</th>
                  <th className="px-4 py-3 text-center">Статус</th>
                </tr>
              </thead>
              <tbody>
                {activeOrders.map(order => {
                  const status = getStatusBadge(order.status)
                  return (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 font-bold">#{order.id}</td>
                      <td className="px-4 py-3">{order.organization_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{order.address}</td>
                      <td className="px-4 py-3 text-right font-bold text-green-600">{order.total_amount || 0} ₽</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>{status.label}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Выполненные заявки */}
        {completedOrders.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-green-50">
              <h3 className="font-bold text-green-900">Выполненные заявки ({completedOrders.length})</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Организация</th>
                  <th className="px-4 py-3 text-left">Дата</th>
                  <th className="px-4 py-3 text-right">Сумма</th>
                  <th className="px-4 py-3 text-right">ЗП мастера</th>
                </tr>
              </thead>
              <tbody>
                {completedOrders.map(order => (
                  <tr key={order.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold">#{order.id}</td>
                    <td className="px-4 py-3">{order.organization_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{formatDate(order.created_at)}</td>
                    <td className="px-4 py-3 text-right font-bold text-green-600">{order.total_amount || 0} ₽</td>
                    <td className="px-4 py-3 text-right font-bold text-purple-600">{order.master_earnings || 0} ₽</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {orders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-500">
            У мастера пока нет заявок
          </div>
        )}
      </div>
    </div>
  )
}