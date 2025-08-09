import React from 'react';

export function VoiceControl({ children }: { children?: React.ReactNode }) {
  return <div className="voice-control">{children}</div>;
}

export default VoiceControl;