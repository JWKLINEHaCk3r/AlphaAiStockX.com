import * as React from 'react';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { useState, useRef } from 'react';
import { Card } from './button';
import { Card } from './button';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
export default function AIWhiteLabelBranding() {
  const [brand, setBrand] = useState({
    name: 'AlphaAIStockX',
    color: '#a78bfa',
    logo: '🤖',
  });

  // Placeholder: In real app, this would update global theme/branding
  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">White-label Branding Center</h2>
      <p className="text-slate-300 mb-4">
        Easily customize name, color, and logo for your own brand or clients.
      </p>
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-slate-200" htmlFor="platform-name">
          Platform Name
        </label>
        <input
          id="platform-name"
          className="px-4 py-2 rounded bg-black/60 border border-violet-700 text-white"
          value={brand.name}
          onChange={e => setBrand(b => ({ ...b, name: e.target.value }))}
        />
        <label className="text-slate-200">Primary Color</label>
        <input
          type="color"
          className="w-16 h-8"
          value={brand.color}
          onChange={e => setBrand(b => ({ ...b, color: e.target.value }))}
        />
        <label className="text-slate-200">Logo Emoji</label>
        <input
          className="px-4 py-2 rounded bg-black/60 border border-violet-700 text-white w-20"
          value={brand.logo}
          onChange={e => setBrand(b => ({ ...b, logo: e.target.value }))}
        />
      </div>
      <div className="flex items-center gap-3 mt-4">
        <span className="text-3xl" style={{ color: brand.color }}>
          {brand.logo}
        </span>
        <span className="text-xl font-bold" style={{ color: brand.color }}>
          {brand.name}
        </span>
      </div>
      <div className="text-xs text-slate-400 mt-2">
        (All UI and reports will reflect your branding.)
      </div>
    </div>
  );
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
