import { motion } from 'framer-motion';

export default function Header({ connected, isListening }) {
  return (
    <header className="relative border-b border-cyber-border bg-cyber-panel/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-accent/20 to-cyan-600/20 border border-cyber-accent/30 flex items-center justify-center"
            animate={{ boxShadow: isListening ? ['0 0 10px rgba(0,240,255,0.3)', '0 0 25px rgba(0,240,255,0.6)', '0 0 10px rgba(0,240,255,0.3)'] : '0 0 0px transparent' }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-7 h-7" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
              </defs>
              {/* Outer shield */}
              <path d="M32 4 L54 14 L54 30 Q54 48 32 60 Q10 48 10 30 L10 14 Z" stroke="url(#shieldGrad)" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
              {/* Inner shield */}
              <path d="M32 10 L48 18 L48 30 Q48 44 32 54 Q16 44 16 30 L16 18 Z" stroke="url(#shieldGrad)" strokeWidth="2" strokeLinejoin="round" fill="none" />
              {/* Circuit lines — horizontal */}
              <path d="M20 24 H30 M34 24 H44" stroke="url(#shieldGrad)" strokeWidth="2" strokeLinecap="round" />
              <path d="M22 32 H28 M36 32 H42" stroke="url(#shieldGrad)" strokeWidth="2" strokeLinecap="round" />
              <path d="M24 40 H32 M32 40 H40" stroke="url(#shieldGrad)" strokeWidth="2" strokeLinecap="round" />
              {/* Circuit lines — vertical */}
              <path d="M26 20 V28 M38 20 V28" stroke="url(#shieldGrad)" strokeWidth="2" strokeLinecap="round" />
              <path d="M32 26 V34" stroke="url(#shieldGrad)" strokeWidth="2" strokeLinecap="round" />
              <path d="M28 36 V44 M36 36 V44" stroke="url(#shieldGrad)" strokeWidth="2" strokeLinecap="round" />
              {/* Circuit nodes */}
              <circle cx="30" cy="24" r="1.5" fill="#06b6d4" />
              <circle cx="34" cy="24" r="1.5" fill="#06b6d4" />
              <circle cx="32" cy="34" r="1.5" fill="#3b82f6" />
              <circle cx="28" cy="32" r="1.5" fill="#94a3b8" />
              <circle cx="36" cy="32" r="1.5" fill="#94a3b8" />
              <circle cx="32" cy="40" r="2" fill="#06b6d4" />
            </svg>
          </motion.div>
          <div>
            <h1 className="text-lg font-bold tracking-wider text-white">
              ogoh<span className="text-cyber-accent">.ai</span>
            </h1>
            <p className="text-[10px] text-cyber-muted tracking-[0.3em] uppercase">Real-Time Call Protection</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-cyber-green animate-pulse' : 'bg-cyber-muted'}`} />
            <span className={connected ? 'text-cyber-green' : 'text-cyber-muted'}>
              {connected ? 'CONNECTED' : 'OFFLINE'}
            </span>
          </div>
          {isListening && (
            <motion.div
              className="flex items-center gap-2 text-xs text-cyber-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-cyber-accent rounded-full"
                    animate={{ height: ['4px', '16px', '4px'] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <span>LISTENING</span>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
