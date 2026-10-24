import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            BluRICH<span className="text-blue-600">-Master</span>
          </h1>
          <p className="text-gray-500">Регистрация компании</p>
        </div>

        {/* Форма */}
        <form className="space-y-5">
          {/* Название компании */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название компании
            </label>
            <input
              type="text"
              placeholder="ООО «Моя компания»"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Телефон или Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Телефон или Email
            </label>
            <input
              type="text"
              placeholder="+79001234567 или email@company.ru"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Пароль */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Подтверждение пароля */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Подтвердите пароль
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Кнопка регистрации */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Зарегистрировать компанию
          </button>
        </form>

        {/* Ссылка на вход */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Войти
            </Link>
          </p>
        </div>

        {/* Копирайт */}
        <div className="text-center mt-4 text-gray-400 text-sm">
          BluRICH-Master © 2026
        </div>
      </div>
    </div>
  )
}