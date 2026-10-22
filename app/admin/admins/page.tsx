'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    back: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    close: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  }
  return <svg className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">{icons[name] || icons.user}</svg>
}

export default function AdminsPage() {
  const router = useRouter()
  const [admins, setAdmins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadAdmins()
  }, [])

  const loadAdmins = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('company_id', 1)
      .order('created_at', { ascending: false })
    
    if (!error && data) setAdmins(data)
    setLoading(false)
  }

  const handleAddAdmin = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert('Заполните все поля!')
      return
    }

    setSaving(true)

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { name: formData.name }
      }
    })

    if (authError) {
      alert('Ошибка создания пользователя: ' + authError.message)
      setSaving(false)
      return
    }

    const { error: dbError } = await supabase
      .from('admins')
      .insert([{
        company_id: 1,
        name: formData.name,
        email: formData.email,
        is_owner: false
      }])

    if (dbError) {
      alert('Ошибка сохранения: ' + dbError.message)
      setSaving(false)
      return
    }

    alert(`Администратор "${formData.name}" создан!\n\nEmail: ${formData.email}\nПароль: ${formData.password}\n\nПередайте эти данные администратору.`)
    setIsModalOpen(false)
    setFormData({ name: '', email: '', password: '' })
    loadAdmins()
    setSaving(false)
  }

  const handleDeleteAdmin = async (id: number, email: string) => {
    if (email === 'blurich@bk.ru') {
      alert('Нельзя удалить владельца платформы!')
      return
    }

    if (!confirm('Удалить этого администратора?')) return

    const { error } = await supabase.from('admins').delete().eq('id', id)
    if (error) {
      alert('Ошибка: ' + error.message)
    } else {
      alert('Администратор удалён')
      loadAdmins()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin')} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
              <Icon name="back" className="h-5 w-5" />
              Назад
            </button>
            <h1 className="text-xl font-bold">Администраторы</h1>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Icon name="plus" className="h-4 w-4" />
            Добавить администратора
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold">Список администраторов</h2>
            <p className="text-sm text-gray-500 mt-1">Управление доступом к системе</p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Загрузка...</div>
          ) : admins.length === 0 ? (
            <div className="p-12 text-center text-gray-500">Нет администраторов</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Имя</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Роль</th>
                  <th className="px-6 py-3">Создан</th>
                  <th className="px-6 py-3">Действия</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">#{admin.id}</td>
                    <td className="px-6 py-4 font-medium">{admin.name}</td>
                    <td className="px-6 py-4">{admin.email}</td>
                    <td className="px-6 py-4">
                      {admin.is_owner ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                          👑 Владелец
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                          👔 Администратор
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(admin.created_at).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="px-6 py-4">
                      {!admin.is_owner && (
                        <button 
                          onClick={() => handleDeleteAdmin(admin.id, admin.email)}
                          className="text-red-600 hover:text-red-800"
                          title="Удалить"
                        >
                          <Icon name="trash" className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Новый администратор</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <Icon name="close" className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">ФИО</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email (логин для входа)</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="admin@company.ru"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Пароль</label>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Минимум 6 символов"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded"
              >
                Отмена
              </button>
              <button 
                onClick={handleAddAdmin}
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Создание...' : 'Создать'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}