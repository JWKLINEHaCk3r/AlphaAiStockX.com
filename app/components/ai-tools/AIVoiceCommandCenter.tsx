'use client';

import { useState, useRef } from 'react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function AIVoiceCommandCenter() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);

  // Start/stop real voice recognition if available
  const handleMic = () => {
    setError('');
    if (!listening) {
      if (
        typeof window !== 'undefined' &&
        (window.SpeechRecognition || window.webkitSpeechRecognition)
      ) {
        const SpeechRecognition =
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';
        recognitionRef.current.onresult = (event: any) => {
          const t = event.results[0][0].transcript;
          setTranscript(t);
          // Simulate AI response
          setTimeout(() => {
            setResponse(
              'AI: NVDA, MSFT, and TSLA show the strongest AI-driven momentum and positive news this week.'
            );
          }, 1200);
        };
        recognitionRef.current.onerror = (e: any) => {
          setError('Voice recognition error: ' + e.error);
        };
        recognitionRef.current.onend = () => {
          setListening(false);
        };
        recognitionRef.current.start();
        setListening(true);
      } else {
        // Fallback: no browser support
        setTranscript('Show me the best AI stocks for this week.');
        setTimeout(() => {
          setResponse(
            'AI: NVDA, MSFT, and TSLA show the strongest AI-driven momentum and positive news this week.'
          );
        }, 1200);
        setListening(true);
      }
    } else {
      if (recognitionRef.current) recognitionRef.current.stop();
      setListening(false);
      setTranscript('');
      setResponse('');
    }
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold neon-text mb-2">AI Voice/Chat Command Center</h2>
      <p className="text-slate-300 mb-4">
        Control all tools and get insights via voice or chat. (White-label ready)
      </p>
      <button
        className={`holo-btn px-6 py-2 font-bold mb-4 flex items-center gap-2 ${listening ? 'ring-4 ring-fuchsia-400' : ''}`}
        onClick={handleMic}
        aria-pressed={listening}
        aria-label={listening ? 'Stop voice input' : 'Start voice input'}
      >
        <span className="material-icons" aria-hidden="true">
          {listening ? 'mic' : 'mic_none'}
        </span>
        {listening ? 'Listening...' : 'Start Voice Command'}
      </button>
      {error && <div className="w-full text-left text-red-400 mb-2">{error}</div>}
      {transcript && <div className="w-full text-left text-cyan-200 mb-2">You: {transcript}</div>}
      {response && <div className="w-full text-left text-emerald-300">{response}</div>}
    </div>
  );
}
