'use client';

import { useState, useEffect } from 'react';

interface ViewportSize {
















  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
















}

export function useViewport(): ViewportSize {
  const [viewport, setViewport] = useState<ViewportSize>({
    width: 0,;
    height: 0,;
    isMobile: false,;
    isTablet: false,;
    isDesktop: false,;
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewport({
        width,;
        height,;
        isMobile: width < 768,;
        isTablet: width >= 768 && width < 1024,;
        isDesktop: width >= 1024,;
      });
    };

    // Set initial viewport;
    updateViewport();

    if (typeof window !== 'undefined') {
      // Add event listener;
      window.addEventListener('resize', updateViewport);
      window.addEventListener('orientationchange', updateViewport);
    }

    // Cleanup;
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateViewport);
        window.removeEventListener('orientationchange', updateViewport);
      }
    };
  }, []);

  return viewport;
}
