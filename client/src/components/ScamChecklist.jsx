import { motion } from 'framer-motion';

const SCAM_SIGNALS = [
  {
    id: 'urgent',
    label: 'Urgent Language',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    desc: 'Threats, pressure, time-sensitive demands',
    matchKeys: ['Urgent Language'],
  },
  {
    id: 'financial',
    label: 'Financial Requests',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    desc: 'Bank info, wire transfers, gift cards, crypto',
    matchKeys: ['Financial Requests'],
  },
  {
    id: 'authority',
    label: 'Authority Impersonation',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
      </svg>
    ),
    desc: 'IRS, SSA, FBI, police, tech support claims',
    matchKeys: ['Authority Impersonation'],
  },
  {
    id: 'social',
    label: 'Social Engineering',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    desc: 'Isolation tactics, emotional manipulation',
    matchKeys: ['Social Engineering'],
  },
  {
    id: 'tech',
    label: 'Technical Deception',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    desc: 'Remote access, screen sharing, OTP requests',
    matchKeys: ['Technical Deception'],
  },
];

export default function ScamChecklist({ detectedTactics = [] }) {
  return (
    <div className="cyber-border cyber-glow rounded-xl bg-cyber-panel p-5">
      <h3 className="text-xs tracking-[0.2em] text-cyber-muted uppercase mb-4">Scam Signal Detection</h3>

      <div className="space-y-2">
        {SCAM_SIGNALS.map((signal) => {
          const active = signal.matchKeys.some(k =>
            detectedTactics.some(t => t.toLowerCase().includes(k.toLowerCase()))
          );

          return (
            <motion.div
              key={signal.id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all ${
                active
                  ? 'border-cyber-red/50 bg-cyber-red/10'
                  : 'border-cyber-border bg-cyber-dark/30'
              }`}
              animate={active ? {
                boxShadow: ['0 0 0px rgba(255,45,85,0)', '0 0 15px rgba(255,45,85,0.3)', '0 0 0px rgba(255,45,85,0)'],
              } : {}}
              transition={{ duration: 2, repeat: active ? Infinity : 0 }}
            >
              <div className={`p-1.5 rounded ${active ? 'text-cyber-red' : 'text-cyber-muted'}`}>
                {signal.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${active ? 'text-cyber-red' : 'text-gray-400'}`}>
                    {signal.label}
                  </span>
                  {active && (
                    <motion.span
                      className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-red/20 text-cyber-red font-semibold tracking-wider"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      DETECTED
                    </motion.span>
                  )}
                </div>
                <p className="text-[11px] text-cyber-muted truncate">{signal.desc}</p>
              </div>
              <div className={`w-3 h-3 rounded-full border-2 ${
                active ? 'border-cyber-red bg-cyber-red' : 'border-cyber-border'
              }`}>
                {active && (
                  <motion.div
                    className="w-full h-full rounded-full bg-cyber-red"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
