import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function RiskHistory({ history }) {
  const data = history.map((h, i) => ({
    idx: i,
    score: h.risk_score,
    time: h.timeLabel,
  }));

  if (data.length < 2) {
    return (
      <div className="cyber-border cyber-glow rounded-xl bg-cyber-panel p-5">
        <h3 className="text-xs tracking-[0.2em] text-cyber-muted uppercase mb-3">Risk Timeline</h3>
        <div className="h-[100px] flex items-center justify-center text-cyber-muted text-xs">
          Collecting data points...
        </div>
      </div>
    );
  }

  return (
    <div className="cyber-border cyber-glow rounded-xl bg-cyber-panel p-5">
      <h3 className="text-xs tracking-[0.2em] text-cyber-muted uppercase mb-3">Risk Timeline</h3>
      <div className="h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <ReferenceLine y={75} stroke="#ff2d55" strokeDasharray="3 3" strokeOpacity={0.5} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#00f0ff"
              strokeWidth={2}
              fill="url(#riskGradient)"
              dot={false}
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
