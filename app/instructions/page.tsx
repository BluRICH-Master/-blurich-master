'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InstructionsPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleSkip = () => {
    completeOnboarding()
  }

  const completeOnboarding = async () => {
    localStorage.setItem('blurich_onboarding_completed', 'true')
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        
        {/* Индикатор прогресса */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
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
        <div className="min-h-[350px]">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Шаг 1: Администраторы системы</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                На вкладке <strong>Администраторы</strong> создайте администратора системы или управляйте сами на правах владельца. 
                Заполните все необходимые данные и нажмите сохранить.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-900 font-semibold mb-2">⚠️ Внимание!</p>
                <p className="text-red-800">
                  Администратор — это сотрудник, который имеет доступ ко всем финансовым данным компании и данным клиентов! 
                  Назначайте сотрудника на эту должность обдуманно!
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Шаг 2: Мастера</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                На вкладке <strong>Мастера</strong> создайте мастера, заполните все необходимые данные, 
                назначьте % от общей стоимости для расчета зарплаты мастера (от 0 до 100%) и нажмите сохранить. 
                Мастер появится в списке мастеров.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-900 font-semibold mb-2">👷 Кто такой мастер?</p>
                <p className="text-blue-800">
                  Мастер — это исполнитель. Он имеет доступ только к данным клиента и СВОИМ заявкам. 
                  Может видеть назначенные ему заявки, добавлять в заявку услуги которые он оказал, 
                  добавлять расходники которые потребовались для выполнения заявки, 
                  видеть перечень своих уже исполненных заявок и сумму своего вознаграждения (зарплаты) за исполненные заявки.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Шаг 3: Услуги компании</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Добавьте услуги компании. Откройте вкладку <strong>Услуги</strong> → <strong>Добавить услугу</strong>, 
                заполните необходимые данные, укажите полную стоимость услуги для автоматического расчета суммы заказа. 
                Нажмите сохранить.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <p className="text-purple-900 font-semibold mb-2">✅ Результат</p>
                <p className="text-purple-800">
                  Услуга появится в списке услуг и будет доступна для добавления в карточку заявки.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Шаг 4: Склад</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Добавьте свои товары или расходные материалы. Откройте вкладку <strong>Склад</strong> → <strong>Добавить товар</strong>. 
                Заполните необходимые данные. Можно добавить цену закупки и цену продажи для расчета прибыли компании 
                от реализации этих позиций.
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="text-orange-900 font-semibold mb-2">📦 Важно</p>
                <p className="text-orange-800">
                  В карточку заявки добавляется товар с ценой продажи! Нажмите сохранить. 
                  Товар появится в списке Склад и будет доступен для добавления в карточку заявки.
                </p>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🚀 Как работает система</h2>
              <p className="text-gray-700 text-lg mb-4">
                После заполнения данных можно начинать работать:
              </p>
              <div className="space-y-3 text-gray-700 text-lg">
                <p>✓ Администратор принимает заявку клиента, заполняет карточку заявки, назначает мастера для исполнения заявки</p>
                <p>✓ Мастер получает уведомление на телефон о назначенной ему заявке</p>
                <p>✓ Мастер принимает в работу, добавляет в карточку заявки услуги и товары из списка</p>
                <p>✓ Мастер завершает заявку</p>
                <p>✓ После завершения заявки автоматически формируется карточка исполненной заявки</p>
                <p>✓ Общая сумма для клиента включает все услуги и товары</p>
                <p>✓ Зарплата мастера рассчитывается из назначенного ему процента</p>
                <p>✓ Товары/расходники автоматически списываются со склада</p>
              </div>
            </div>
          )}
        </div>

        {/* Кнопки управления */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
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
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
          >
            {step === 5 ? 'Завершить и перейти в кабинет →' : 'Далее →'}
          </button>
        </div>
      </div>
    </div>
  )
}
