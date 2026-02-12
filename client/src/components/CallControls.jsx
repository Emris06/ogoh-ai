import { motion } from 'framer-motion';

const LANGUAGES = [
  { code: 'en-US', label: 'English', flag: 'EN' },
  { code: 'uz-UZ', label: "O'zbek", flag: 'UZ' },
  { code: 'ru-RU', label: 'Русский', flag: 'RU' },
];

export default function CallControls({ isActive, onStart, onEnd, error, lang, onLangChange }) {
  return (
    <div className="cyber-border cyber-glow rounded-xl bg-cyber-panel p-5">
      <h3 className="text-xs tracking-[0.2em] text-cyber-muted uppercase mb-4">Call Protection</h3>

      {/* Language selector */}
      <div className="mb-4">
        <label className="text-[10px] text-cyber-muted uppercase tracking-wider block mb-1.5">Language</label>
        <select
          value={lang}
          onChange={(e) => onLangChange(e.target.value)}
          disabled={isActive}
          className="w-full bg-cyber-dark border border-cyber-border rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-cyber-accent/50 disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
        >
          {LANGUAGES.map(l => (
            <option key={l.code} value={l.code}>
              {l.flag} {l.label}
            </option>
          ))}
        </select>
      </div>

      {!isActive ? (
        <motion.button
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyber-accent/20 to-cyan-500/20 border border-cyber-accent/40 text-cyber-accent font-semibold tracking-wider text-sm hover:from-cyber-accent/30 hover:to-cyan-500/30 transition-all"
          whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(0,240,255,0.3)' }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
        >
          <div className="flex items-center justify-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            START PROTECTED CALL
          </div>
        </motion.button>
      ) : (
        <motion.button
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyber-red/20 to-red-500/20 border border-cyber-red/40 text-cyber-red font-semibold tracking-wider text-sm hover:from-cyber-red/30 hover:to-red-500/30 transition-all"
          whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(255,45,85,0.3)' }}
          whileTap={{ scale: 0.98 }}
          onClick={onEnd}
        >
          <div className="flex items-center justify-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75L18 6m0 0l2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
            </svg>
            END CALL
          </div>
        </motion.button>
      )}

      {error && (
        <motion.p
          className="mt-3 text-xs text-cyber-red text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      <div className="mt-4 flex items-center gap-2 text-[10px] text-cyber-muted">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <span>Audio is processed in-memory only. Nothing is stored.</span>
      </div>
    </div>
  );
}
