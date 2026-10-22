'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mustChangePassword, setMustChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [masterId, setMasterId] = useState<number | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const isPhone = login.includes('+') || /^\d+$/.test(login.replace(/\D/g, ''))
      
      if (isPhone) {
        const { data: masterData, error: masterError } = await supabase
          .from('masters')
          .select('id, login_phone, must_change_password, company_id')
          .eq('login_phone', login)
          .single()
        
        if (masterError || !masterData) {
          setError('Мастер с таким телефоном не найден')
          setLoading(false)
          return
        }
        
        const fakeEmail = `master_${login.replace(/\D/g, '')}@blurich.ru`
        
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: fakeEmail,
          password,
        })
        
        if (authError) {
          setError('Неверный пароль')
          setLoading(false)
          return
        }
        
        // Сохраняем company_id мастера
        if (masterData.company_id) {
          localStorage.setItem('company_id', String(masterData.company_id))
        }
        
        if (masterData.must_change_password) {
          setMustChangePassword(true)
          setMasterId(masterData.id)
          setLoading(false)
          return
        }
        
        router.push('/master')
        
      } else {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: login,
          password,
        })
        
        if (authError) {
          setError('Неверный email или пароль')
          setLoading(false)
          return
        }
        
        const { data: adminData } = await supabase
          .from('admins')
          .select('company_id')
          .ilike('email', login)
          .single()
        
        if (adminData) {
          // Сохраняем company_id в localStorage
          localStorage.setItem('company_id', String(adminData.company_id))
          router.push('/admin')
        } else {
          setError('Пользователь не найден в системе')
        }
      }
    } catch (err) {
      setError('Произошла ошибка при входе')
      console.error(err)
    }

    setLoading(false)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    if (newPassword.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      setLoading(false)
      return
    }
    
    try {
      const { error: authError } = await supabase.auth.updateUser({
        password: newPassword
      })
      
      if (authError) {
        setError('Ошибка смены пароля: ' + authError.message)
        setLoading(false)
        return
      }
      
      const { error: dbError } = await supabase
        .from('masters')
        .update({ must_change_password: false })
        .eq('id', masterId)
      
      if (dbError) {
        setError('Ошибка обновления: ' + dbError.message)
        setLoading(false)
        return
      }
      
      alert('Пароль успешно изменён!')
      router.push('/master')
    } catch (err) {
      setError('Произошла ошибка')
      console.error(err)
    }
    
    setLoading(false)
  }

  if (mustChangePassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              BluRICH<span className="text-blue-600">-Master</span>
            </h1>
            <p className="text-gray-500 mt-2">Придумайте новый пароль</p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Новый пароль</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Минимум 6 символов"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Сохранение...' : 'Сменить пароль и войти'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>BluRICH-Master © 2026</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            BluRICH<span className="text-blue-600">-Master</span>
          </h1>
          <p className="text-gray-500 mt-2">Вход в систему</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Телефон или Email</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="+79001234567 или email@company.ru"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
          <div>
            Нет аккаунта?{' '}
            <a href="/register" className="text-blue-600 hover:underline font-medium">Зарегистрировать компанию</a>
          </div>
          <p>BluRICH-Master © 2026</p>
        </div>
      </div>
    </div>
  )
}