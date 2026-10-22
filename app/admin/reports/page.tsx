'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ReportsPage() {
  const router = useRouter()
  const [companyId, setCompanyId] = useState<number | null>(null)
  const [companyName, setCompanyName] = useState('')
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month')
  const [selectedMonth, setSelectedMonth] = useState('2026-10')
  const [masters, setMasters] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedCompanyId = localStorage.getItem('company_id')
    if (storedCompanyId) {
      const cid = parseInt(storedCompanyId)
      setCompanyId(cid)
      loadData(cid)
    } else {
      router.push('/login')
    }
  }, [])

  const loadData = async (cid: number) => {
    setLoading(true)
    
    // Загружаем компанию
    const { data: companyData } = await supabase
      .from('companies')
      .select('name')
      .eq('id', cid)
      .single()
    if (companyData) setCompanyName(companyData.name)

    // Загружаем мастеров ТОЛЬКО своей компании
    const { data: mastersData } = await supabase
      .from('masters')
      .select('*')
      .eq('company_id', cid)
      .eq('status', 'active')
    
    if (mastersData) setMasters(mastersData)

    // Загружаем заявки ТОЛЬКО своей компании
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .eq('company_id', cid)
      .eq('status', 'completed')
    
    if (ordersData) setOrders(ordersData)

    setLoading(false)
  }

  // Фильтруем заявки по периоду
  const filteredOrders = orders.filter(order => {
    if (!order.created_at) return false
    const orderDate = new Date(order.created_at)
    const [year, month] = selectedMonth.split('-').map(Number)
    
    if (period === 'month') {
      return orderDate.getFullYear() === year && (orderDate.getMonth() + 1) === month
    }
    if (period === 'quarter') {
      const quarterMonth = Math.floor((orderDate.getMonth()) / 3) * 3 + 1
      const selectedQuarterMonth = Math.floor((month - 1) / 3) * 3 + 1
      return orderDate.getFullYear() === year && quarterMonth === selectedQuarterMonth
    }
    if (period === 'year') {
      return orderDate.getFullYear() === year
    }
    return true
  })

  // Считаем статистику по мастерам
  const masterStats = masters.map(master => {
    const masterOrders = filteredOrders.filter(o => o.master_id === master.id)
    const completedCount = masterOrders.length
    const serviceRevenue = masterOrders.reduce((sum, o) => sum + (o.master_earnings || 0), 0)
    const commission = master.commission_percent || 30
    const calculatedPay = serviceRevenue * (commission / 100)
    
    return {
      ...master,
      completedCount,
      serviceRevenue,
      calculatedPay,
      fines: 0,
      totalFines: 0,
      finalPay: calculatedPay
    }
  })

  const totalCompleted = filteredOrders.length
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0)
  const totalFines = masterStats.reduce((sum, m) => sum + m.totalFines, 0)
  const totalToPay = masterStats.reduce((sum, m) => sum + m.finalPay, 0)

  const getPeriodLabel = () => {
    const [year, month] = selectedMonth.split('-').map(Number)
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    if (period === 'month') return `${months[month - 1]} ${year}`
    if (period === 'quarter') {
      const quarter = Math.ceil(month / 3)
      return `${quarter} квартал ${year}`
    }
    return `${year} год`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.push('/admin')} className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
            ← Назад
          </button>
          <h1 className="text-2xl font-bold"> Отчёты — {companyName}</h1>
        </div>

        {/* Период */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <button 
              onClick={() => setPeriod('month')}
              className={`px-4 py-2 rounded-lg font-medium ${period === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Месяц
            </button>
            <button 
              onClick={() => setPeriod('quarter')}
              className={`px-4 py-2 rounded-lg font-medium ${period === 'quarter' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Квартал
            </button>
            <button 
              onClick={() => setPeriod('year')}
              className={`px-4 py-2 rounded-lg font-medium ${period === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Год
            </button>
            <input 
              type="month" 
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
            <div className="ml-auto text-xl font-bold text-gray-800">
              {getPeriodLabel()}
            </div>
          </div>
        </div>

        {/* Сводка */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">👥 Отчёт по мастерам</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-gray-500 uppercase">Выполнено заявок</div>
              <div className="text-2xl font-bold text-blue-600">{totalCompleted}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase">Выручка</div>
              <div className="text-2xl font-bold text-purple-600">{totalRevenue.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase">Штрафы</div>
              <div className="text-2xl font-bold text-red-600">-{totalFines.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase">К выплате мастерам</div>
              <div className="text-2xl font-bold text-green-600">{totalToPay.toLocaleString('ru-RU')} ₽</div>
            </div>
          </div>
        </div>

        {/* Таблица мастеров */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Мастер</th>
                <th className="px-4 py-3 text-center">Выполнено</th>
                <th className="px-4 py-3 text-right">Выручка</th>
                <th className="px-4 py-3 text-right">Начислено ЗП</th>
                <th className="px-4 py-3 text-center">Штрафов</th>
                <th className="px-4 py-3 text-right">Сумма штрафов</th>
                <th className="px-4 py-3 text-right">К выплате</th>
              </tr>
            </thead>
            <tbody>
              {masterStats.map(master => (
                <tr key={master.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-blue-600">{master.name}</div>
                    <div className="text-xs text-gray-500">{master.specialization || '-'} • {master.commission_percent}%</div>
                  </td>
                  <td className="px-4 py-3 text-center font-bold">{master.completedCount}</td>
                  <td className="px-4 py-3 text-right font-bold text-purple-600">{master.serviceRevenue.toLocaleString('ru-RU')} ₽</td>
                  <td className="px-4 py-3 text-right font-bold">{master.calculatedPay.toLocaleString('ru-RU')} ₽</td>
                  <td className="px-4 py-3 text-center">{master.fines}</td>
                  <td className="px-4 py-3 text-right text-red-600">-{master.totalFines.toLocaleString('ru-RU')} ₽</td>
                  <td className="px-4 py-3 text-right font-bold text-green-600">{master.finalPay.toLocaleString('ru-RU')} ₽</td>
                </tr>
              ))}
            </tbody>
          </table>
          {masterStats.length === 0 && (
            <div className="p-8 text-center text-gray-500">Нет активных мастеров</div>
          )}
        </div>
      </div>
    </div>
  )
}