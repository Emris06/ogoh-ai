import { motion, AnimatePresence } from 'framer-motion';

export default function AnalysisSummary({ summary, regionalPattern }) {
  return (
    <div className="cyber-border cyber-glow rounded-xl bg-cyber-panel p-5">
      <h3 className="text-xs tracking-[0.2em] text-cyber-muted uppercase mb-3">AI Analysis</h3>

      <AnimatePresence mode="wait">
        {summary ? (
          <motion.div
            key={summary}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-3"
          >
            <p className="text-sm text-gray-300 leading-relaxed">{summary}</p>

            {regionalPattern && (
              <motion.div
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyber-amber/10 border border-cyber-amber/30"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <svg className="w-4 h-4 text-cyber-amber flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <div>
                  <p className="text-[10px] text-cyber-amber/70 uppercase tracking-wider">Regional Pattern</p>
                  <p className="text-xs text-cyber-amber font-medium">{regionalPattern}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.p
            className="text-sm text-cyber-muted italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Waiting for conversation data to analyze...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
