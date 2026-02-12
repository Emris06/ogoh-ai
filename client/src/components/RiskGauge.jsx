import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

function getRiskLevel(score) {
  if (score <= 20) return { label: 'SAFE', color: '#00ff88', bgClass: 'from-green-500/10' };
  if (score <= 40) return { label: 'LOW RISK', color: '#88ff00', bgClass: 'from-lime-500/10' };
  if (score <= 60) return { label: 'MODERATE', color: '#ffaa00', bgClass: 'from-amber-500/10' };
  if (score <= 75) return { label: 'HIGH RISK', color: '#ff6600', bgClass: 'from-orange-500/10' };
  return { label: 'CRITICAL', color: '#ff2d55', bgClass: 'from-red-500/10' };
}

export default function RiskGauge({ score = 0 }) {
  const risk = getRiskLevel(score);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setDisplayScore(score), 50);
    return () => clearTimeout(timeout);
  }, [score]);

  // SVG arc gauge
  const radius = 80;
  const strokeWidth = 10;
  const center = 100;
  const circumference = Math.PI * radius; // Half circle
  const progress = (displayScore / 100) * circumference;

  return (
    <div className="cyber-border cyber-glow rounded-xl bg-cyber-panel p-6 flex flex-col items-center">
      <h3 className="text-xs tracking-[0.2em] text-cyber-muted uppercase mb-4">Threat Level</h3>

      <div className="relative w-[200px] h-[120px]">
        <svg width="200" height="120" viewBox="0 0 200 120">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <motion.path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={risk.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ type: 'spring', stiffness: 60, damping: 15 }}
            style={{ filter: `drop-shadow(0 0 8px ${risk.color}40)` }}
          />
        </svg>

        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <motion.span
            className="text-4xl font-bold tabular-nums"
            style={{ color: risk.color }}
            key={score}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {displayScore}
          </motion.span>
        </div>
      </div>

      {/* Risk label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={risk.label}
          className="mt-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wider"
          style={{
            borderColor: `${risk.color}40`,
            color: risk.color,
            backgroundColor: `${risk.color}10`,
          }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          {risk.label}
        </motion.div>
      </AnimatePresence>

      {/* Score bar segments */}
      <div className="mt-4 w-full flex gap-1">
        {[...Array(20)].map((_, i) => {
          const segScore = (i + 1) * 5;
          const filled = displayScore >= segScore;
          const segRisk = getRiskLevel(segScore);
          return (
            <motion.div
              key={i}
              className="flex-1 h-1.5 rounded-full"
              style={{
                backgroundColor: filled ? segRisk.color : '#1e293b',
                opacity: filled ? 1 : 0.3,
              }}
              animate={{ opacity: filled ? 1 : 0.3 }}
              transition={{ delay: i * 0.02 }}
            />
          );
        })}
      </div>
    </div>
  );
}
