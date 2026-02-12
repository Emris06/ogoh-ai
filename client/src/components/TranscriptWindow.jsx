import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TranscriptWindow({ entries }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div className="cyber-border cyber-glow rounded-xl bg-cyber-panel flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyber-border">
        <h3 className="text-xs tracking-[0.2em] text-cyber-muted uppercase">Live Transcript</h3>
        <div className="flex items-center gap-1.5 text-[10px] text-cyber-muted">
          <div className="w-1.5 h-1.5 rounded-full bg-cyber-accent animate-pulse" />
          {entries.length} segments
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0 relative scan-line"
      >
        {entries.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-cyber-muted text-sm">
            <svg className="w-12 h-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <p>Waiting for audio input...</p>
            <p className="text-xs mt-1">Start a protected call to begin monitoring</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {entries.map((entry, i) => (
            <motion.div
              key={i}
              className="flex gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-[10px] text-cyber-muted mt-1 whitespace-nowrap font-light tabular-nums">
                {entry.time}
              </span>
              <p className="text-sm text-gray-300 leading-relaxed">{entry.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
