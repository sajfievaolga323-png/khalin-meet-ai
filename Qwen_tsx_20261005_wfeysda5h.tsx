'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [name, setName] = useState('')
  const router = useRouter()

  const createRoom = () => {
    if (name.trim()) {
      const roomId = Math.random().toString(36).substring(7)
      router.push(`/room/${roomId}?name=${encodeURIComponent(name)}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="aquarium-bg">
        <div className="fish" style={{ top: '20%', animationDelay: '0s' }}>🐠</div>
        <div className="fish" style={{ top: '50%', animationDelay: '5s' }}>🐟</div>
        <div className="fish" style={{ top: '70%', animationDelay: '10s' }}>🐡</div>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bubble" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s` }} />
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🪷</div>
          <h1 className="text-3xl font-bold text-white mb-2">Khalin Meet AI</h1>
          <p className="text-blue-200">Видеозвонки с аквариумным фоном</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-blue-200 text-sm mb-2">Ваше имя</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите ваше имя"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-aqua"
              onKeyPress={(e) => e.key === 'Enter' && createRoom()}
            />
          </div>

          <button
            onClick={createRoom}
            className="w-full py-3 bg-gradient-to-r from-aqua to-blue-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-aqua transition-all shadow-lg"
          >
            Создать комнату
          </button>
        </div>

        <div className="mt-6 text-center text-blue-300 text-sm">
          <p>🐠 До 10 участников</p>
          <p>💬 Текстовый чат</p>
          <p>🤖 ИИ-ассистент</p>
        </div>
      </div>
    </div>
  )
}