const reasons = [
  {
    title: 'Mahalliy muammo tushunchasi',
    desc: "Biz O'zbekistonda yashab, Kapitalbank/Uzcard/Humo firibgarliklarini o'z boshimizdan kechirganmiz. Muammoni ichkaridan bilamiz.",
    icon: '🎯',
  },
  {
    title: 'AI + Speech texnologiyasi',
    desc: "Claude AI va Web Speech API ni real-time birlashtirgan yagona mahalliy yechim. 3 tilda ishlaydi.",
    icon: '🧠',
  },
  {
    title: "Maxfiylik birinchi o'rinda",
    desc: "Hech qanday audio yoki matn saqlanmaydi. Hamma narsa xotirada qayta ishlanadi va darhol o'chiriladi.",
    icon: '🔒',
  },
  {
    title: "To'liq ishlaydigan prototip",
    desc: "Bu faqat g'oya emas — ishlaydigan demo, real-time transkripsiya, AI tahlil, va trilingual chatbot tayyor.",
    icon: '🚀',
  },
];

const achievements = [
  {
    image: '/achievements/award.png',
    title: 'Samarkand AI Hackathon',
    project: 'Tasvirchi',
    place: 'Maxsus mukofot',
    desc: "Hakamlar tomonidan deepfake videolarni aniqlashga mo'ljallangan Tasvirchi loyihamiz uchun maxsus o'rin berildi.",
  },
  {
    image: '/achievements/award-2.png',
    title: "Rector's Cup Hackathon",
    project: 'UzBVoice-AI',
    place: "2-o'rin · 20 million so'm",
    desc: "AI ovozli qo'ng'iroqlar orqali banklar uchun kredit to'lovlari va hisob balansi haqida xabar beruvchi UzBVoice-AI loyihamiz bilan 2-o'rinni qo'lga kiritdik.",
  },
  {
    image: '/achievements/award-3.png',
    title: 'Startup Garage Hackathon',
    project: 'Savob.AI',
    place: "1-o'rin",
    desc: "Fermerlar uchun tuproq, suv darajasi, ob-havo va sug'orish bo'yicha AI maslahat beruvchi Savob.AI loyihamiz bilan 1-o'rinni egalladik.",
  },
];

export default function WhyUs() {
  return (
    <section id="nega-biz" className="py-20 px-4 bg-brand-panel/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Nega aynan biz?</h2>
        <p className="text-gray-500 text-center mb-12">Bu muammoni hal qila olishimizning sabablari</p>

        <div className="grid sm:grid-cols-2 gap-6 mb-20">
          {reasons.map((r) => (
            <div key={r.title} className="flex gap-4 rounded-2xl border border-brand-border bg-brand-panel/30 p-6">
              <span className="text-3xl shrink-0">{r.icon}</span>
              <div>
                <h3 className="font-semibold text-white mb-2">{r.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div id="yutuqlarimiz" className="scroll-mt-20" />
        <h2 className="text-3xl font-bold text-center mb-4">Yutuqlarimiz</h2>
        <p className="text-gray-500 text-center mb-12">Hackathonlarda erishgan natijalarimiz</p>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((a) => (
            <div
              key={a.title}
              className="rounded-2xl border border-brand-border bg-brand-panel/50 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{a.title}</h3>
                </div>
                <span className="inline-block px-2.5 py-1 text-[11px] font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
                  {a.place}
                </span>
                <p className="text-xs text-gray-500 mb-2">Loyiha: <span className="text-cyan-400 font-medium">{a.project}</span></p>
                <p className="text-sm text-gray-400 leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
