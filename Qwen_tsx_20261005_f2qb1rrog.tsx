'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'Гость'
  const [messages, setMessages] = useState<Array<{ user: string; text: string; time: string }>>([])
  const [inputText, setInputText] = useState('')
  const [showChat, setShowChat] = useState(true)

  const quickPhrases = ['Да', 'Нет', 'Подождите', 'Спасибо', 'Согласна', 'Не поняла', 'Повторите']

  useEffect(() => {
    setMessages([{ user: 'Система', text: `${name} присоединился к комнате`, time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) }])
  }, [name])

  const sendMessage = (text: string) => {
    if (text.trim()) {
      setMessages([...messages, { user: name, text, time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) }])
      setInputText('')
    }
  }

  const copyLink = () => {
    const link = `${window.location.origin}/room/${params.roomId}`
    navigator.clipboard.writeText(link)
    alert('Ссылка скопирована! Отправьте её в Telegram или ВКонтакте')
  }

  return (
    <div className="h-screen flex">
      <div className="aquarium-bg">
        <div className="fish" style={{ top: '20%', animationDelay: '0s' }}>🐠</div>
        <div className="fish" style={{ top: '50%', animationDelay: '5s' }}>🐟</div>
        <div className="fish" style={{ top: '70%', animationDelay: '10s' }}>🐡</div>
      </div>

      <div className="flex-1 flex flex-col p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-white font-bold text-xl">Комната: {params.roomId}</h1>
            <p className="text-blue-200 text-sm">Вы: {name}</p>
          </div>
          <button onClick={copyLink} className="px-4 py-2 bg-aqua text-white rounded-lg hover:bg-blue-500 transition">
            📋 Скопировать ссылку
          </button>
        </div>

        <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-xl p-4 mb-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-4">🎥</div>
            <p className="text-white text-xl">Видео появится здесь</p>
            <p className="text-blue-200 text-sm mt-2">WebRTC будет добавлен на следующем этапе</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {['🎤 Микрофон', '📹 Камера', '🖥️ Демонстрация', '⚙️ Настройки'].map((btn) => (
            <button key={btn} className="py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition">
              {btn}
            </button>
          ))}
        </div>
      </div>

      {showChat && (
        <div className="w-96 bg-white/10 backdrop-blur-lg border-l border-white/20 flex flex-col">
          <div className="p-4 border-b border-white/20 flex justify-between items-center">
            <h2 className="text-white font-bold">💬 Чат</h2>
            <button onClick={() => setShowChat(false)} className="text-blue-200 hover:text-white">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className="bg-white/10 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-aqua font-semibold text-sm">{msg.user}</span>
                  <span className="text-blue-300 text-xs">{msg.time}</span>
                </div>
                <p className="text-white text-sm">{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/20">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickPhrases.map((phrase) => (
                <button key={phrase} onClick={() => sendMessage(phrase)} className="px-3 py-1 bg-aqua/20 text-aqua rounded-full text-sm hover:bg-aqua/30 transition">
                  {phrase}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Написать сообщение..."
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-aqua"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
              />
              <button onClick={() => sendMessage(inputText)} className="px-4 py-2 bg-aqua text-white rounded-lg hover:bg-blue-500 transition">
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}