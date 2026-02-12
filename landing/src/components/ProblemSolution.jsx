export default function ProblemSolution() {
  return (
    <>
      {/* Muammo */}
      <section id="muammo" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Muammo</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">Firibgarlik qo'ng'iroqlari — global muammo.</p>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <ul className="space-y-3 text-gray-400 text-sm leading-relaxed">
              <li className="flex gap-2"><span className="text-red-400 mt-0.5">-</span>O'zbekistonda soxta bank qo'ng'iroqlari kundan-kunga ko'paymoqda</li>
              <li className="flex gap-2"><span className="text-red-400 mt-0.5">-</span>"Kartangiz bloklandi" tipidagi firibgarliklar odamlarni qo'rqitib pul undirmoqda</li>
              <li className="flex gap-2"><span className="text-red-400 mt-0.5">-</span>Texnologik xabardorlik past — ko'pchilik firibgarlikni aniqlay olmaydi</li>
              <li className="flex gap-2"><span className="text-red-400 mt-0.5">-</span>Global miqyosda yiliga $50B+ firibgarlik zarariga olib kelmoqda</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Yechim */}
      <section id="yechim" className="py-20 px-4 bg-brand-panel/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Yechim</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">Biz uni AI bilan hal qilamiz.</p>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-8">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-cyan-400 mb-3">ogoh.ai</h3>
            <ul className="space-y-3 text-gray-400 text-sm leading-relaxed">
              <li className="flex gap-2"><span className="text-cyan-400 mt-0.5">+</span>Real-time nutq transkripsiyasi va AI tahlili</li>
              <li className="flex gap-2"><span className="text-cyan-400 mt-0.5">+</span>6 xil firibgarlik taktikasini avtomatik aniqlash</li>
              <li className="flex gap-2"><span className="text-cyan-400 mt-0.5">+</span>O'zbek, Rus, Ingliz tillarida ishlaydi</li>
              <li className="flex gap-2"><span className="text-cyan-400 mt-0.5">+</span>Xavf 75%+ bo'lganda "TELEFON QO'YING" ogohlantirishi</li>
              <li className="flex gap-2"><span className="text-cyan-400 mt-0.5">+</span>Hech qanday ma'lumot saqlanmaydi — to'liq maxfiylik</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
