import { useRef, useState, useCallback } from 'react';

export function useSpeechRecognition({ onTranscript, lang = 'en-US' }) {
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const start = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Speech Recognition is not supported in this browser. Use Chrome or Edge.');
      return false;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      // Get the latest final result
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          const text = result[0].transcript.trim();
          if (text) {
            onTranscript(text);
          }
        }
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone permissions.');
      } else if (event.error !== 'no-speech') {
        console.warn('[Speech] Error:', event.error);
      }
    };

    recognition.onend = () => {
      // Auto-restart if we're still supposed to be listening
      if (recognitionRef.current) {
        try {
          recognition.start();
        } catch {
          // Already started
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
      return true;
    } catch (err) {
      setError('Failed to start speech recognition.');
      return false;
    }
  }, [onTranscript, lang]);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      const ref = recognitionRef.current;
      recognitionRef.current = null;
      ref.stop();
      setIsListening(false);
    }
  }, []);

  return { isListening, error, start, stop };
}
