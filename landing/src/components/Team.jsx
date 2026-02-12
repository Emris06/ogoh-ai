const members = [
  {
    name: 'Amirshokh Akhmedov',
    role: 'Project Manager',
    photo: '/team/amirshokh.jpg',
    description: "Project Manager sifatida Inha Rector's Cup Hackathonida 2-o'rin sohibi",
    skills: ['Research & Statistics', 'Project Planning & Coordination', 'Mathematics', 'Machine Learning'],
  },
  {
    name: 'Abdulmajid Anvarov',
    role: 'Finance Manager',
    photo: '/team/abdulmajid.jpg',
    description: "Finance Manager sifatida Inha Rector's Cup Hackathonida 2-o'rin sohibi",
    skills: ['Financial Analysis & Reporting', 'Budgeting & Forecasting', 'Economics', 'Risk Management'],
  },
  {
    name: 'Izzatillo Akhmatov',
    role: 'UX/UI Designer',
    photo: '/team/izzat.jpg',
    description: "UX/UI Designer sifatida Inha Rector's Cup Hackathonida 2-o'rin sohibi",
    skills: ['User Research & Prototyping', 'Wireframing & Figma', 'Interaction Design', 'Usability Testing'],
  },
  {
    name: "Botirxo'ja Baxtiyorov",
    role: 'Software Developer',
    photo: '/team/botir.jpg',
    description: "Software Developer sifatida Inha Rector's Cup Hackathonida 2-o'rin sohibi",
    skills: ['Full Stack Development', 'Testing & Debugging', 'System Architecture', 'Database Design'],
  },
];

const techStack = [
  { name: 'React', color: 'text-cyan-400' },
  { name: 'Tailwind CSS', color: 'text-blue-400' },
  { name: 'Node.js', color: 'text-green-400' },
  { name: 'WebSocket', color: 'text-yellow-400' },
  { name: 'Claude AI', color: 'text-purple-400' },
  { name: 'Web Speech API', color: 'text-pink-400' },
  { name: 'Vite', color: 'text-orange-400' },
  { name: 'Framer Motion', color: 'text-indigo-400' },
];

export default function Team() {
  return (
    <section id="jamoa" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Jamoa</h2>
        <p className="text-gray-500 text-center mb-12">Kim nima qiladi</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {members.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-brand-border bg-brand-panel/50 p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <img
                src={m.photo}
                alt={m.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500/30 mb-4"
              />
              <h3 className="font-semibold text-white text-lg">{m.name}</h3>
              <p className="text-sm text-cyan-400 mb-2">{m.role}</p>
              <p className="text-xs text-gray-400 mb-3">{m.description}</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {m.skills.map(s => (
                  <span key={s} className="px-2 py-0.5 text-[11px] rounded-md bg-brand-dark border border-brand-border text-gray-400">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Texnologiyalar</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map(t => (
              <span key={t.name} className={`px-4 py-2 rounded-lg border border-brand-border bg-brand-panel/50 text-sm font-medium ${t.color}`}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
