const stages = [
  {
    label: 'Idea',
    title: "G'oya va tadqiqot",
    desc: "Muammoni o'rganish, mavjud yechimlarni tahlil qilish",
    status: 'done',
  },
  {
    label: 'Prototype',
    title: 'Prototip',
    desc: "Real-time transkripsiya, AI tahlil, trilingual qo'llab-quvvatlash",
    status: 'done',
  },
  {
    label: 'MVP',
    title: 'Minimal Viable Product',
    desc: "Chatbot, ogohlantirish tizimi, demo rejim, 3 tilda keyword aniqlash",
    status: 'current',
  },
  {
    label: 'Launch',
    title: 'Ishga tushirish',
    desc: "Mobil ilova, Telegram bot integratsiya, kengaytirilgan AI model",
    status: 'upcoming',
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Yo'l xaritasi</h2>
        <p className="text-gray-500 text-center mb-12">Loyihaning rivojlanish bosqichlari</p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-brand-border md:left-1/2" />

          <div className="space-y-8">
            {stages.map((s, i) => (
              <div key={s.label} className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    s.status === 'done' ? 'bg-cyan-500 border-cyan-500' :
                    s.status === 'current' ? 'bg-brand-dark border-cyan-500 ring-4 ring-cyan-500/20' :
                    'bg-brand-dark border-brand-border'
                  }`} />
                </div>

                {/* Card */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium mb-2 ${
                    s.status === 'done' ? 'bg-cyan-500/10 text-cyan-400' :
                    s.status === 'current' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-brand-border text-gray-500'
                  }`}>
                    {s.label}
                    {s.status === 'done' && ' ✓'}
                    {s.status === 'current' && ' ←'}
                  </span>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
