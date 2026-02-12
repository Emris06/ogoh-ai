const steps = [
  {
    num: '01',
    title: "Qo'ng'iroqni boshlang",
    desc: '"Start Protected Call" tugmasini bosing va mikrofonga ruxsat bering.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97a1.062 1.062 0 00.417-1.173L5.963 3.102a1.125 1.125 0 00-1.091-.852H3.5A2.25 2.25 0 001.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Real-time transkripsiya',
    desc: "Nutqingiz brauzer Speech API orqali matnga aylantiriladi.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'AI tahlili',
    desc: "Claude AI har 4 soniyada matnni 6 xil firibgarlik taktikasiga tekshiradi.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Ogohlantirish',
    desc: "Xavf balli 75+ bo'lsa ekran qizarib, \"TELEFON QO'YING\" deb ogohlantiradi.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="qanday-ishlaydi" className="py-20 px-4 bg-brand-panel/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Qanday ishlaydi?</h2>
        <p className="text-gray-500 text-center mb-12">4 oddiy qadamda to'liq himoya</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="group rounded-2xl border border-brand-border bg-brand-panel/50 p-6 hover:border-cyan-500/30 transition-colors">
              <span className="text-xs font-mono text-cyan-500/60">{s.num}</span>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mt-3 mb-4 group-hover:bg-cyan-500/20 transition-colors">
                {s.icon}
              </div>
              <h3 className="font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
