import { useState, useRef, useEffect } from 'react';

const QA = [
  { q: /ogoh|nima|what|haqida|about/, a: "ogoh.ai — real-time firibgarlik qo'ng'iroqlarini aniqlash platformasi. AI yordamida telefon suhbatlarini tahlil qiladi va xavfli bo'lsa ogohlantiradi." },
  { q: /ishlaydi|work|qanday|how/, a: "1) Mikrofonga ruxsat bering\n2) Nutq real-time matnga aylanadi\n3) AI har 4s tahlil qiladi\n4) Xavf 75%+ bo'lsa ogohlantiradi" },
  { q: /til|language|tilla/, a: "3 tilda ishlaydi: O'zbek, Rus, Ingliz. Nutq aniqlash va keyword tahlil uchala tilda qo'llab-quvvatlanadi." },
  { q: /maxfiy|privacy|data|safe/, a: "Hech qanday audio yoki matn saqlanmaydi. Hamma narsa xotirada qayta ishlanadi va qo'ng'iroq tugagach o'chiriladi." },
  { q: /jamoa|team|kim/, a: "Biz hackathon jamoasimiz. Full-stack, frontend, backend developerlarden iborat. AI va security sohasida tajribamiz bor." },
  { q: /demo|sinash|test|try/, a: "Demo sahifasiga o'ting — u yerda video va ishlaydigan prototipga havola bor. /demo sahifasini tekshiring!" },
  { q: /salom|hello|hi|hey|привет/, a: "Salom! Men ogoh.ai yordamchisiman. Loyiha haqida savol bering!" },
];

function getReply(text) {
  const lower = text.toLowerCase();
  for (const item of QA) {
    if (item.q.test(lower)) return item.a;
  }
  return "Bu haqda aniq javob bera olmayman. \"ogoh.ai nima?\", \"qanday ishlaydi?\" yoki \"qanday tillar?\" deb so'rab ko'ring.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: "Salom! Men ogoh.ai yordamchisiman.\nLoyiha haqida istalgan narsa so'rang!" }]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (text) => {
    if (!text.trim()) return;
    setMessages(p => [...p, { role: 'user', text }]);
    setInput('');
    setTimeout(() => {
      setMessages(p => [...p, { role: 'bot', text: getReply(text) }]);
    }, 300);
  };

  const handleSubmit = (e) => { e.preventDefault(); send(input); };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="absolute bottom-16 right-0 w-[340px] max-h-[460px] rounded-2xl border border-brand-border bg-brand-dark shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-brand-border bg-brand-panel">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm font-semibold text-white">ogoh.ai Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white text-lg">&#x2715;</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[300px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-[13px] leading-relaxed whitespace-pre-line ${
                  m.role === 'user' ? 'bg-cyan-500/15 text-cyan-100 border border-cyan-500/20' : 'bg-brand-panel text-gray-300 border border-brand-border'
                }`}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick Q */}
          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {['ogoh.ai nima?', 'Qanday ishlaydi?', 'Qanday tillar?'].map(q => (
                <button key={q} onClick={() => send(q)} className="text-[11px] px-2.5 py-1 rounded-full border border-brand-border text-gray-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors">{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-brand-border p-2.5 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Savol bering..."
              className="flex-1 bg-brand-panel border border-brand-border rounded-lg px-3 py-1.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyan-500/40" />
            <button type="submit" disabled={!input.trim()} className="px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-sm disabled:opacity-30">
              &#10148;
            </button>
          </form>
        </div>
      )}

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center shadow-lg hover:shadow-cyan-500/20 transition-shadow"
      >
        {open ? (
          <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )}
      </button>
    </div>
  );
}
