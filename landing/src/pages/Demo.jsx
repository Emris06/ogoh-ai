import { Link } from 'react-router-dom';

export default function Demo() {
  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Bosh sahifaga qaytish
        </Link>

        <h1 className="text-3xl font-bold mb-2">Demo</h1>
        <p className="text-gray-500 mb-10">ogoh.ai ning ishlashini ko'ring</p>

        {/* Video section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
            Demo video
          </h2>
          <div className="rounded-2xl border border-brand-border bg-brand-panel overflow-hidden aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/wLPP7a0PyU8?si=vetfmbTyrZULxl5x"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        {/* Description */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Nima ishlaydi?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Real-time transkripsiya", desc: "Brauzer mikrofoni orqali nutqni matnga aylantiradi (3 tilda)" },
              { title: "AI firibgarlik tahlili", desc: "Claude AI yoki keyword-based demo rejim orqali 6 xil taktikani aniqlaydi" },
              { title: "Xavf balli (0-100)", desc: "Vizual gauge, rang kodlangan risk score va tarix grafigi" },
              { title: "Ogohlantirish tizimi", desc: "75%+ xavfda to'liq ekranli qizil ogohlantirish + vibratsiya" },
              { title: "Trilingual chatbot", desc: "O'zbek, Rus, Ingliz tillarida loyiha haqida savollarga javob beradi" },
              { title: "Maxfiylik", desc: "Hech qanday ma'lumot saqlanmaydi — faqat xotirada qayta ishlanadi" },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-brand-border bg-brand-panel/50 p-4">
                <h3 className="font-medium text-white text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
