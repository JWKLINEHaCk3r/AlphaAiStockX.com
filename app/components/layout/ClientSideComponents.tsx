'use client';

import dynamic from 'next/dynamic';

// Dynamic imports for client-side only components to prevent SSR issues
export const ScrollProgress = dynamic(
  () => import('@/components/ui/enhanced-effects').then(mod => ({ default: mod.ScrollProgress })),
  { ssr: false }
);

export const MatrixRain = dynamic(
  () => import('@/components/ui/enhanced-effects').then(mod => ({ default: mod.MatrixRain })),
  { ssr: false }
);

export default function ClientSideComponents() {
  return null; // This component is just for exporting dynamic components
}
