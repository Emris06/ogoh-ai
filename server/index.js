import { WebSocketServer } from 'ws';
import { analyzeTranscript } from './analyzer.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;
const wss = new WebSocketServer({ port: PORT });

console.log(`[ogoh.ai] WebSocket server running on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
  console.log('[ogoh.ai] Client connected');

  // Per-connection in-memory state — never persisted
  const session = {
    transcriptBuffer: [],
    fullTranscript: '',
    lastAnalysisTime: 0,
    analysisInterval: 4000, // Analyze every ~4 seconds
    isAnalyzing: false,
  };

  ws.on('message', async (raw) => {
    try {
      const msg = JSON.parse(raw.toString());

      if (msg.type === 'transcript_update') {
        // Append new transcript text from browser Speech-to-Text
        session.transcriptBuffer.push(msg.text);
        session.fullTranscript += ' ' + msg.text;

        const now = Date.now();
        const shouldAnalyze =
          now - session.lastAnalysisTime >= session.analysisInterval &&
          !session.isAnalyzing &&
          session.fullTranscript.trim().length > 15;

        if (shouldAnalyze) {
          session.isAnalyzing = true;
          session.lastAnalysisTime = now;

          try {
            const result = await analyzeTranscript(session.fullTranscript.trim());
            ws.send(JSON.stringify({
              type: 'analysis_result',
              ...result,
              timestamp: Date.now(),
            }));
          } catch (err) {
            console.error('[ogoh.ai] Analysis error:', err.message);
            ws.send(JSON.stringify({
              type: 'analysis_error',
              error: err.message,
            }));
          } finally {
            session.isAnalyzing = false;
          }
        }
      }

      if (msg.type === 'end_call') {
        // Purge all in-memory data for privacy
        session.transcriptBuffer.length = 0;
        session.fullTranscript = '';
        session.lastAnalysisTime = 0;
        console.log('[ogoh.ai] Session data purged (privacy)');
        ws.send(JSON.stringify({ type: 'session_cleared' }));
      }
    } catch (err) {
      console.error('[ogoh.ai] Message parse error:', err.message);
    }
  });

  ws.on('close', () => {
    // Purge all in-memory data on disconnect
    session.transcriptBuffer.length = 0;
    session.fullTranscript = '';
    console.log('[ogoh.ai] Client disconnected — session data purged');
  });
});
