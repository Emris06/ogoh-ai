import { useRef, useState, useCallback, useEffect } from 'react';

export function useWebSocket() {
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//localhost:3001`);

    ws.onopen = () => {
      setConnected(true);
      console.log('[ogoh.ai] WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'analysis_result') {
          setLastAnalysis(data);
        }
        if (data.type === 'session_cleared') {
          setLastAnalysis(null);
        }
      } catch (err) {
        console.error('[ogoh.ai] Parse error:', err);
      }
    };

    ws.onclose = () => {
      setConnected(false);
      console.log('[ogoh.ai] WebSocket disconnected');
    };

    ws.onerror = (err) => {
      console.error('[ogoh.ai] WebSocket error:', err);
    };

    wsRef.current = ws;
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({ type: 'end_call' }));
      wsRef.current.close();
      wsRef.current = null;
      setConnected(false);
      setLastAnalysis(null);
    }
  }, []);

  const sendTranscript = useCallback((text) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'transcript_update',
        text,
      }));
    }
  }, []);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return { connected, lastAnalysis, connect, disconnect, sendTranscript };
}
