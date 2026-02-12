const channels = [
  {
    title: 'B2B: Carrier Licensing (Asosiy)',
    desc: "Ogoh.AI ning aniqlash tizimini mobil operatorlarga white-label yoki co-branded xizmat sifatida litsenziyalash. Operatorlar har bir obunachi uchun oylik to'lov qiladi.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: 'B2C: Freemium Obuna',
    desc: "Bepul tarif (oyiga 10 ta qo'ng'iroq) va premium tarif ($2.99/oy) — cheksiz himoya, batafsil hisobotlar va oilaviy akkaunt.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'B2B2C: Korxona va Davlat',
    desc: "Banklar, davlat idoralari va korxonalarga ommaviy litsenziya. Banklar firibgarlikdan himoya qilishga eng ko'p manfaatdor.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
];

const pricing = [
  { channel: 'B2C Bepul', price: 'Bepul', year1: '50,000 foydalanuvchi', year2: '200,000 foydalanuvchi' },
  { channel: 'B2C Premium', price: '$2.99/oy', year1: '5,000 obunachi', year2: '25,000 obunachi' },
  { channel: 'Carrier License', price: '$0.10-0.30/ob/oy', year1: '1 ta operator (pilot)', year2: '2-3 ta operator' },
  { channel: 'Korxona', price: 'Maxsus narx', year1: '3-5 ta shartnoma', year2: '10-15 ta shartnoma' },
];

export default function BusinessModel() {
  return (
    <section id="biznes-model" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Moliyaviy foyda</h2>
        <p className="text-gray-500 text-center mb-12">Biznes model va daromad kanallari</p>

        {/* Revenue Channels */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {channels.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-brand-border bg-brand-panel/50 p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                {c.icon}
              </div>
              <h3 className="font-semibold text-white mb-2">{c.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing Table */}
        <h3 className="text-xl font-semibold text-center text-white mb-6">Narxlar va maqsadlar</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Kanal</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Narx</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">1-yil maqsadi</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">2-yil maqsadi</th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((p) => (
                <tr key={p.channel} className="border-b border-brand-border/50 hover:bg-brand-panel/30 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{p.channel}</td>
                  <td className="py-3 px-4 text-cyan-400">{p.price}</td>
                  <td className="py-3 px-4 text-gray-400">{p.year1}</td>
                  <td className="py-3 px-4 text-gray-400">{p.year2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
