'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InstructionsPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleSkip = () => {
    completeOnboarding()
  }

  const completeOnboarding = async () => {
    // Здесь мы отмечаем, что пользователь прошел инструкцию
    // Пока используем localStorage, чтобы не ломать работу, 
    // если колонка в Supabase еще не создана.
    localStorage.setItem('blurich_onboarding_completed', 'true')
    
    // Перенаправляем в админ-панель
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 relative">
        
        {/* Индикатор прогресса */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {i}
              </div>
              <div className={`h-1 w-full mt-2 ${
                i < step ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            </div>
          ))}
        </div>

        {/* Контент шагов */}
        <div className="min-h-[300px]">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Шаг 1: Администраторы</h2>
              <p className="text-gray-700">
                На вкладке <strong>Администраторы</strong> создайте администратора системы или управляйте сами на правах владельца.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-800 text-sm">
                  ⚠️ <strong>Внимание!</strong> Администратор имеет доступ ко всем финансовым данным и данным клиентов. Назначайте на эту должность обдуманно!
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Шаг 2: Мастера</h2>
              <p className="text-gray-700">
                На вкладке <strong>Мастера</strong> добавьте исполнителей, заполните данные и назначьте % от стоимости для расчета их зарплаты.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-800 text-sm">
                  👷 <strong>Кто такой мастер?</strong> Он видит только свои заявки, добавляет оказанные услуги и расходники, и видит сумму своего вознаграждения.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Шаг 3: Услуги компании</h2>
              <p className="text-gray-700">
                Откройте вкладку <strong>Услуги</strong> → <strong>Добавить услугу</strong>. Укажите полную стоимость для автоматического расчета суммы заказа.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <p className="text-purple-800 text-sm">
                  ✅ Услуга появится в списке и будет доступна для добавления в карточку заявки.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Шаг 4: Склад и начало работы</h2>
              <p className="text-gray-700">
                Добавьте товары или расходные материалы во вкладке <strong>Склад</strong>. Можно указать цену закупки и продажи для расчета прибыли.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-800 text-sm">
                  🚀 <strong>Готово!</strong> Теперь администратор может создавать заявки, назначать мастеров, а товары будут автоматически списываться со склада.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Кнопки управления */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              step === 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            ← Назад
          </button>

          <button
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium underline"
          >
            Пропустить инструкцию
          </button>

          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
          >
            {step === 4 ? 'Завершить и перейти в кабинет →' : 'Далее →'}
          </button>
        </div>
      </div>
    </div>
  )
}
