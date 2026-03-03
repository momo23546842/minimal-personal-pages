import { PUBLIC_SAFE_MODE } from '@/lib/safeMode'

export default function Hero() {
  if (PUBLIC_SAFE_MODE) {
    return (
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">AI Assistant</h1>
        <p className="text-xl text-gray-500 mb-8">Ask the assistant a question</p>
        <button className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition">
          Open Assistant
        </button>
      </section>
    )
  }

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4">Hi, I'm Momo 👋</h1>
      <p className="text-xl text-gray-500 mb-8">Your catchphrase here</p>
      <button className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition">
        Talk with me
      </button>
    </section>
  )
}