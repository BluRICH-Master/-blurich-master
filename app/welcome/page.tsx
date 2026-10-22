'use client'
import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Шапка */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          BluRICH <span className="text-yellow-400">Master</span>
        </h1>
        <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
          Система управления для сервисных компаний, созданная предпринимателем для предпринимателей.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 -mt-8">
        {/* Карточка с ценностью */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Для кого эта система?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
            Если вы занимаетесь <strong>ремонтом, обслуживанием или предоставлением услуг</strong> (стационарно или с выездом), эта система для вас. 
            Она позволит упростить и автоматизировать рутину, чтобы вы могли сосредоточиться на росте бизнеса.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                ⚙️ Автоматизация
              </h3>
              <p className="text-gray-700">Система сама напомнит о заканчивающихся расходниках или товарах на складе, избавляя от простоев.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                🔔 Умные уведомления
              </h3>
              <p className="text-gray-700">Push-уведомления мастеру о новой заявке и администратору о её завершении или критическом остатке на складе.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
                💰 Прозрачные финансы
              </h3>
              <p className="text-gray-700">Автоматический расчёт прибыли компании (до налогов), зарплаты мастера по его проценту и маржи с проданных товаров.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
              <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center gap-2">
                📊 Аналитика
              </h3>
              <p className="text-gray-700">Чёткая статистика по эффективности мастеров и истории взаимодействий с каждым клиентом.</p>
            </div>
          </div>

          {/* Тариф */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8 text-center mb-10">
            <h3 className="text-2xl font-bold mb-4">Честный и прозрачный тариф</h3>
            <div className="text-5xl font-bold text-yellow-400 mb-2">1 500 ₽ <span className="text-xl text-gray-300 font-normal">/ мес</span></div>
            <p className="text-lg text-gray-300 mb-6">
              Включено: <strong>4 человека в команде</strong> (1 администратор/владелец + 3 мастера)
            </p>
            <div className="inline-block bg-white/10 px-6 py-3 rounded-lg text-sm text-gray-200">
              ➕ Каждый дополнительный сотрудник: всего +500 ₽/мес
            </div>
          </div>

          {/* Кнопки действия */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/register')}
              className="bg-blue-600 text-white px-10 py-4 rounded-xl text-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🚀 Зарегистрировать компанию
            </button>
            <button
              onClick={() => router.push('/login')}
              className="bg-white text-gray-800 border-2 border-gray-200 px-10 py-4 rounded-xl text-xl font-bold hover:bg-gray-50 transition-all"
            >
              Войти в систему
            </button>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          BluRICH Master © 2026 • Максимально просто, полезно, удобно, прозрачно и честно.
        </div>
      </div>
    </div>
  )
}