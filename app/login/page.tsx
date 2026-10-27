'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Состояния для смены пароля (при первом входе мастера)
  const [mustChangePassword, setMustChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [masterId, setMasterId] = useState<number | null>(null)
  
  // Состояния для восстановления пароля
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const [resetMessage, setResetMessage] = useState('')
  
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
      const { error: authError } = await supabase.auth.updateUser({ password: newPassword })
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetLoading(true)
    setResetMessage('')
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: window.location.origin + '/login',
      })
      
      if (error) {
        setResetMessage('Ошибка: ' + error.message)
      } else {
        setResetMessage('Инструкция по сбросу пароля отправлена на ваш email.')
      }
    } catch (err) {
      setResetMessage('Произошла ошибка при отправке запроса.')
    }
    setResetLoading(false)
  }

  // --- ЭКРАН ВОССТАНОВЛЕНИЯ ПАРОЛЯ ---
  if (forgotPasswordMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              BluRICH<span className="text-blue-600">-Master</span>
            </h1>
            <p className="text-gray-500 mt-2">Восстановление пароля</p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ваш Email</label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="email@company.ru"
              />
            </div>

            {resetMessage && (
              <div className={`px-4 py-3 rounded-lg text-sm ${resetMessage.includes('Ошибка') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {resetMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={resetLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {resetLoading ? 'Отправка...' : 'Отправить ссылку для сброса'}
            </button>

            <button
              type="button"
              onClick={() => {
                setForgotPasswordMode(false)
                setResetMessage('')
                setResetEmail('')
              }}
              className="w-full text-gray-600 py-2 rounded-lg font-medium hover:text-gray-800 hover:bg-gray-50 transition-colors"
            >
              ← Вернуться ко входу
            </button>
          </form>
        </div>
      </div>
    )
  }

  // --- ЭКРАН СМЕНЫ ПАРОЛЯ (ПЕРВЫЙ ВХОД МАСТЕРА) ---
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
        </div>
      </div>
    )
  }

  // --- ОСНОВНОЙ ЭКРАН ВХОДА ---
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                title={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setForgotPasswordMode(true)}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Забыли пароль?
            </button>
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
