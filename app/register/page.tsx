'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    company_name: '',
    owner_name: '',
    email: '',
    owner_phone: '',
    office_phone: '',
    password: '',
    password_confirm: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.password_confirm) {
      setError('Пароли не совпадают')
      return
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      return
    }

    setLoading(true)

    try {
      // 1. Создаём пользователя в Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.owner_name,
            role: 'owner',
            company_name: formData.company_name
          }
        }
      })

      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('Пользователь с таким email уже существует. Попробуйте войти.')
        } else {
          setError('Ошибка регистрации: ' + authError.message)
        }
        setLoading(false)
        return
      }

      if (!authData.user) {
        setError('Не удалось создать пользователя')
        setLoading(false)
        return
      }

      const userId = authData.user.id

      // 2. Создаём компанию (base_employees: 4 = 1 админ + 3 мастера)
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert([
          {
            name: formData.company_name,
            owner_email: formData.email,
            owner_phone: formData.owner_phone,
            office_phone: formData.office_phone,
            base_employees: 4,
            extra_employees: 0,
            monthly_price: 1500,
            status: 'active',
            is_platform_owner: false
          }
        ])
        .select('id')
        .single()

      if (companyError) {
        // Удаляем пользователя, если компания не создалась
        await supabase.auth.admin.deleteUser(userId)
        setError('Ошибка создания компании: ' + companyError.message)
        setLoading(false)
        return
      }

      const companyId = companyData.id

      // 3. Создаём администратора (владельца)
      const { error: adminError } = await supabase
        .from('admins')
        .insert([
          {
            company_id: companyId,
            name: formData.owner_name,
            email: formData.email,
            is_owner: true
          }
        ])

      if (adminError) {
        setError('Ошибка создания администратора: ' + adminError.message)
        setLoading(false)
        return
      }

      // 4. Сохраняем company_id в localStorage для автоматического входа
      localStorage.setItem('company_id', String(companyId))

      // 5. Редирект на инструкцию
      router.push('/instructions')
    } catch (err: any) {
      setError('Произошла ошибка: ' + (err.message || 'Неизвестная ошибка'))
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            BluRICH<span className="text-blue-600">-Master</span>
          </h1>
          <p className="text-gray-500 mt-2">Регистрация новой компании</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название компании *</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="ООО Ромашка"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ФИО владельца *</label>
            <input
              type="text"
              name="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Иванов Иван Иванович"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="owner@company.ru"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Телефон владельца</label>
              <input
                type="tel"
                name="owner_phone"
                value={formData.owner_phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="+79001234567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Телефон офиса</label>
              <input
                type="tel"
                name="office_phone"
                value={formData.office_phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="+79001234567"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Пароль *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Минимум 6 символов"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Подтвердите пароль *</label>
              <input
                type="password"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Повторите пароль"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {loading ? 'Регистрация...' : 'Зарегистрировать компанию'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <div className="text-sm text-gray-500">
            Уже есть аккаунт?{' '}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Войти
            </a>
          </div>
          <div className="text-xs text-gray-400">
            Тариф: 1500₽/мес (1 админ + 3 мастера). Доп. сотрудник: +500₽/мес
          </div>
          <div className="text-xs text-gray-400">
            BluRICH-Master © 2026
          </div>
        </div>
      </div>
    </div>
  )
}