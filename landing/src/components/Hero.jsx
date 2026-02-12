import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          AI-Powered Scam Detection
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Firibgarlik qo'ng'iroqlaridan{' '}
          <span className="gradient-text">real-time himoya</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          ogoh.ai telefon suhbatlaringizni AI yordamida real vaqtda tahlil qiladi va firibgarlik aniqlansa — darhol ogohlantiradi.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/demo"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Demo ko'rish
          </Link>
          <a
            href="#muammo"
            className="px-8 py-3.5 rounded-xl border border-brand-border text-gray-300 font-semibold text-sm hover:border-cyan-500/40 hover:text-white transition-all"
          >
            Batafsil
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            ['3 til', "O'zbek, Rus, English"],
            ['< 4s', 'Tahlil vaqti'],
            ['0%', "Ma'lumot saqlanmaydi"],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="text-2xl font-bold gradient-text">{num}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
