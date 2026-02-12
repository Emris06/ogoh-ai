import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function AlertOverlay({ riskScore, onDismiss }) {
  const isActive = riskScore > 75;

  useEffect(() => {
    if (isActive && navigator.vibrate) {
      // Vibration pattern: vibrate 200ms, pause 100ms, vibrate 200ms
      navigator.vibrate([200, 100, 200, 100, 400]);
    }
    return () => {
      if (navigator.vibrate) {
        navigator.vibrate(0); // Cancel vibration
      }
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Flashing red background */}
          <motion.div
            className="absolute inset-0 bg-red-900/30"
            animate={{
              backgroundColor: ['rgba(127,29,29,0.3)', 'rgba(255,45,85,0.2)', 'rgba(127,29,29,0.3)'],
            }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />

          {/* Alert card */}
          <motion.div
            className="relative z-10 bg-cyber-dark border-2 border-cyber-red rounded-2xl p-8 max-w-md mx-4 text-center"
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{ boxShadow: '0 0 60px rgba(255,45,85,0.4), 0 0 120px rgba(255,45,85,0.2)' }}
          >
            {/* Warning icon */}
            <motion.div
              className="mx-auto w-20 h-20 rounded-full bg-cyber-red/20 border-2 border-cyber-red flex items-center justify-center mb-5"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <svg className="w-10 h-10 text-cyber-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </motion.div>

            <motion.h2
              className="text-3xl font-bold text-cyber-red tracking-wider mb-2"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              HANG UP NOW
            </motion.h2>

            <p className="text-gray-300 mb-2 text-sm">
              ogoh.ai has detected a <span className="text-cyber-red font-bold">critical threat level</span>.
            </p>
            <p className="text-gray-400 text-xs mb-6">
              This call exhibits strong indicators of a scam. End the call immediately and do not share any personal information.
            </p>

            <div className="flex gap-3 justify-center">
              <motion.button
                className="px-6 py-2.5 bg-cyber-red text-white rounded-lg font-semibold text-sm tracking-wide hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDismiss}
              >
                I UNDERSTAND
              </motion.button>
            </div>

            <p className="text-[10px] text-cyber-muted mt-4 tracking-wider">
              RISK SCORE: {riskScore}/100
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
