'use client';

import { useEffect, useState } from 'react';

type StockChart3DProps = {
  data?: [number, number, number][];
};

export default function StockChart3D({ data }: StockChart3DProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-2xl bg-black/60 border border-violet-800 flex items-center justify-center animate-pulse">
        <span className="text-violet-300 text-lg font-bold">Loading 3D Chart...</span>
      </div>
    );
  }

  return (
    <div
      className="w-full h-[400px] rounded-xl overflow-hidden shadow-2xl bg-black/60 border border-violet-800 relative flex items-center justify-center"
      aria-label="3D Stock Chart"
      tabIndex={0}
    >
      <div className="text-center">
        <div className="text-violet-300 text-xl font-bold mb-4">3D Stock Chart</div>
        <div className="text-violet-400 text-sm">3D visualization coming soon</div>
        <div className="mt-4 w-32 h-32 mx-auto border-2 border-violet-400 rounded-lg animate-pulse opacity-50"></div>
      </div>
    </div>
  );
}
