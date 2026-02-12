import { useState, useCallback, useRef } from 'react';
import Header from './components/Header.jsx';
import RiskGauge from './components/RiskGauge.jsx';
import TranscriptWindow from './components/TranscriptWindow.jsx';
import ScamChecklist from './components/ScamChecklist.jsx';
import AlertOverlay from './components/AlertOverlay.jsx';
import CallControls from './components/CallControls.jsx';
import AnalysisSummary from './components/AnalysisSummary.jsx';
import RiskHistory from './components/RiskHistory.jsx';
import Chatbot from './components/Chatbot.jsx';
import { useSpeechRecognition } from './hooks/useSpeechRecognition.js';

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function App() {
  const [callActive, setCallActive] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [transcriptEntries, setTranscriptEntries] = useState([]);
  const [riskScore, setRiskScore] = useState(0);
  const [detectedTactics, setDetectedTactics] = useState([]);
  const [summary, setSummary] = useState('');
  const [regionalPattern, setRegionalPattern] = useState(null);
  const [riskHistory, setRiskHistory] = useState([]);
  const [alertDismissed, setAlertDismissed] = useState(true);
  const [lang, setLang] = useState('en-US');
  const [callError, setCallError] = useState(null);

  const wsRef = useRef(null);

  const sendTranscript = useCallback((text) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'transcript_update', text }));
    }
  }, []);

  const handleTranscript = useCallback((text) => {
    setTranscriptEntries(prev => [
      ...prev,
      { text, time: formatTime(new Date()) },
    ]);
    sendTranscript(text);
  }, [sendTranscript]);

  const { isListening, error: speechError, start: startSpeech, stop: stopSpeech } = useSpeechRecognition({
    onTranscript: handleTranscript,
    lang,
  });

  const startCall = useCallback(async () => {
    setCallError(null);

    // Request microphone permission first
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
    } catch (err) {
      setCallError('Microphone access denied. Please allow microphone permissions.');
      return;
    }

    // Clean up any leftover connection
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//localhost:3001`);

    ws.onopen = () => {
      wsRef.current = ws;
      setWsConnected(true);
      setCallActive(true);
      setCallError(null);
      setTranscriptEntries([]);
      setRiskScore(0);
      setDetectedTactics([]);
      setSummary('');
      setRegionalPattern(null);
      setRiskHistory([]);
      setAlertDismissed(true);
      startSpeech();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'analysis_result') {
          setRiskScore(data.risk_score);
          setDetectedTactics(data.detected_tactics || []);
          setSummary(data.summary || '');
          setRegionalPattern(data.regional_pattern || null);
          setRiskHistory(prev => [
            ...prev,
            { risk_score: data.risk_score, timeLabel: formatTime(new Date()) },
          ]);
          if (data.risk_score > 75) {
            setAlertDismissed(false);
          }
        }
      } catch (err) {
        console.error('[App] Message parse error:', err);
      }
    };

    ws.onerror = () => {
      setCallError('Cannot connect to server. Make sure the backend is running (node server/index.js).');
    };

    ws.onclose = () => {
      wsRef.current = null;
      setWsConnected(false);
    };
  }, [startSpeech]);

  const endCall = useCallback(() => {
    stopSpeech();
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({ type: 'end_call' }));
      wsRef.current.close();
      wsRef.current = null;
    }
    setCallActive(false);
    setWsConnected(false);
  }, [stopSpeech]);

  return (
    <div className="min-h-screen bg-cyber-dark grid-bg flex flex-col">
      <Header connected={wsConnected} isListening={isListening} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
          {/* Left column */}
          <div className="lg:col-span-4 space-y-5">
            <CallControls
              isActive={callActive}
              onStart={startCall}
              onEnd={endCall}
              error={callError || speechError}
              lang={lang}
              onLangChange={setLang}
            />
            <RiskGauge score={riskScore} />
            <ScamChecklist detectedTactics={detectedTactics} />
          </div>

          {/* Right column */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="flex-1 min-h-[350px]">
              <TranscriptWindow entries={transcriptEntries} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <AnalysisSummary summary={summary} regionalPattern={regionalPattern} />
              <RiskHistory history={riskHistory} />
            </div>
          </div>
        </div>
      </main>

      {!alertDismissed && (
        <AlertOverlay
          riskScore={riskScore}
          onDismiss={() => setAlertDismissed(true)}
        />
      )}

      <Chatbot />

      <footer className="border-t border-cyber-border py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] text-cyber-muted">
          <span>ogoh.ai v1.0 — Hackathon Build</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Zero data retention — all audio processed in-memory
          </span>
        </div>
      </footer>
    </div>
  );
}
