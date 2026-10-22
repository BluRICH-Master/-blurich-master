import Link from 'next/link'
 
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-blue-600">
           BluRICH Master
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Система управления выездными мастерами
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link 
            href="/login"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Войти в систему
          </Link>
        </div>
      </div>
    </div>
  )
}