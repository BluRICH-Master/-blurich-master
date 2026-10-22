'use client'
import { useRouter } from 'next/navigation'

export default function InstructionsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✓ Регистрация успешна!
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Несколько простых шагов для начала работы
          </h1>
          <p className="text-xl text-gray-600">
            Следуйте этим инструкциям, чтобы настроить систему под вашу компанию
          </p>
        </div>

        {/* Шаг 1 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-l-4 border-blue-500">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Администраторы системы
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
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
          </div>
        </div>

        {/* Шаг 2 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-l-4 border-green-500">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Мастера
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
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
          </div>
        </div>

        {/* Шаг 3 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-l-4 border-purple-500">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Услуги компании
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
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
          </div>
        </div>

        {/* Шаг 4 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-l-4 border-orange-500">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              4
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Склад
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
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
          </div>
        </div>

        {/* Рабочий процесс */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <h3 className="text-2xl font-bold mb-4">🚀 Как работает система</h3>
          <p className="text-lg leading-relaxed mb-4">
            После заполнения этих данных можно начинать работать:
          </p>
          <div className="space-y-3 text-lg">
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

        {/* Кнопка начала работы */}
        <div className="text-center">
          <button
            onClick={() => router.push('/admin')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-xl text-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            🚀 Перейти в админ-панель
          </button>
          <p className="text-gray-500 mt-6 text-sm">
            Вы уже вошли в систему как владелец компании
          </p>
        </div>
      </div>
    </div>
  )
}