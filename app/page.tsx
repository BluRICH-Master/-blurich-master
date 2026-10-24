import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex flex-col items-center pt-24 pb-16 px-8">
      <div className="max-w-4xl w-full">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            BluRICH<span className="text-blue-200">-Master</span>
          </h1>
          <p className="text-2xl text-blue-100">
            Система для контроля и управления бизнесом в сфере услуг.<br />
            Создана предпринимателем для предпринимателей!
          </p>
        </div>

        {/* Блоки с иконками */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Блок 1 */}
          <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-blue-100 text-lg">Автоматическое распределение и контроль выполнения работ</p>
          </div>

          {/* Блок 2 */}
          <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-blue-100 text-lg">Учет квалификации, загрузки и эффективности специалистов</p>
          </div>

          {/* Блок 3 */}
          <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-blue-100 text-lg">Детальная статистика по выполненным работам и доходам</p>
          </div>

          {/* Блок 4 — рукопожатие */}
          <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17a4 4 0 01-8 0V5a2 2 0 012-2h4a2 2 0 012 2v1m0 0h8m-8 0v1m8-1a4 4 0 008 0V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v1" />
              </svg>
            </div>
            <div className="text-blue-100 text-lg">
              <div>Подойдёт</div>
              <div>Мастерам-одиночкам</div>
              <div>и Компаниям со штатом 20+</div>
            </div>
          </div>

          {/* Блок 5 — щит зелёный */}
          <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-blue-100 text-lg">Работает стабильно и без сбоев каждый день</p>
          </div>

          {/* Блок 6 */}
          <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-blue-100 text-lg">
              <div>Регистрируйся!</div>
              <div>Тестируй!</div>
              <div>Применяй!</div>
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-6 justify-center mb-16">
          <Link
            href="/register"
            className="bg-green-600 text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Зарегистрироваться
          </Link>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Войти
          </Link>
        </div>

        {/* Копирайт */}
        <div className="text-center text-blue-200 text-sm">
          © 2026 BluRICH-Master. Все права защищены.
        </div>
      </div>
    </div>
  )
}