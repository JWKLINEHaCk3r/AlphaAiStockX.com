import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { api, wsManager, storage, debounce } from '@/lib/api';
import { StockData, Portfolio, AISignal, LoadingState } from '@/types';

// Generic API hook;
export function useAPI<T>(endpoint: string, dependencies: unknown[] = []) { const [data, setData] = useState<T | null>(null); const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {   try {   setLoading('loading');
      setError(null);
      const response = await api.get<T>(endpoint); setData(response.data || null); setLoading('success');     } catch (error) { console.error(error); } catch (error) { console.error(error); } catch (err) { setError(err instanceof Error ? err.message : 'Unknown error'), setLoading('error');
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [...dependencies, fetchData]);

  return { data, loading, error, refetch: fetchData },
}

// Stock data hook with real-time updates;
export function useStockData(symbol: string) { const [stockData, setStockData] = useState<StockData | null>(null); const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {  
    if (!symbol) return;

    const fetchStock = async () => { try {   setLoading('loading');
        setError(null);
        const response = await api.get<StockData>(`/stocks/${symbol    } catch (error) { console.error(error); } catch (error) { console.error(error); }`); setStockData(response.data || null); setLoading('success'); } catch (err) { setError(err instanceof Error ? err.message : 'Failed to fetch stock data'), setLoading('error');
      }
    };

    fetchStock();

    // Subscribe to real-time updates;
    const handleStockUpdate = (data: StockData) => {  
      if (data.symbol === symbol) {
        setStockData(data);
        }
    }; wsManager.subscribe('stock_update', handleStockUpdate);
 return () => { wsManager.unsubscribe('stock_update', handleStockUpdate);
    };
  }, [symbol]);

  return { stockData, loading,
      error
    };
}

// Portfolio hook;
export function usePortfolio() { const [portfolio, setPortfolio] = useState<Portfolio | null>(null); const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {   try {   setLoading('loading'); setError(null); const response = await api.get<Portfolio>('/portfolio'); setPortfolio(response.data || null); setLoading('success');     } catch (error) { console.error(error); } catch (error) { console.error(error); } catch (err) { setError(err instanceof Error ? err.message : 'Failed to fetch portfolio'), setLoading('error');
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();

    // Subscribe to portfolio updates;
    const handlePortfolioUpdate = (data: Portfolio) => {
      setPortfolio(data);
    }; wsManager.subscribe('portfolio_update', handlePortfolioUpdate);
 return () => { wsManager.unsubscribe('portfolio_update', handlePortfolioUpdate);
    };
  }, [fetchPortfolio]);

  return { portfolio, loading, error, refetch: fetchPortfolio },
}

// AI signals hook;
export function useAISignals(symbol?: string) { const [signals, setSignals] = useState<AISignal[]>([]); const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {  
    const fetchSignals = async () => { try {   setLoading('loading'); setError(null); const endpoint = symbol ? `/ai/signals/${symbol    } catch (error) { console.error(error); } catch (error) { console.error(error); }` : '/ai/signals',
        const response = await api.get<AISignal[]>(endpoint); setSignals(response.data || []); setLoading('success'); } catch (err) { setError(err instanceof Error ? err.message : 'Failed to fetch AI signals'), setLoading('error');
      }
    };

    fetchSignals();

    // Subscribe to new signals;
    const handleNewSignal = (signal: AISignal) => {  
      if (!symbol || signal.symbol === symbol) {
        setSignals(prev => [signal, ...prev.slice(0, 9)]); // Keep last 10 signals;
        }
    }; wsManager.subscribe('ai_signal', handleNewSignal);
 return () => { wsManager.unsubscribe('ai_signal', handleNewSignal);
    };
  }, [symbol]);

  return { signals, loading,
      error
    };
}

// Local storage hook;
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.get(key, initialValue);
  });

  const setValue = useCallback(;
    (value: T | ((val: T) => T)) => {  
      try {  
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        storage.set(key, valueToStore);
          } catch (error) { console.error(error); } catch (error) { console.error(error); } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },;
    [key, storedValue];
  );

  return [storedValue, setValue] as const;
}

// Debounced search hook; export function useSearch<T>(searchFn: (query: string) => Promise<T[]>, delay: number = 300) { const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useCallback(;
    debounce(async (searchQuery: string) => {  
      if (!searchQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
        }

      try {  
        setLoading(true);
        setError(null);
        const searchResults = await searchFn(searchQuery);
        setResults(searchResults);   } catch (error) { console.error(error); } catch (error) { console.error(error); } catch (err) { setError(err instanceof Error ? err.message : 'Search failed'),
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, delay),;
    [searchFn, delay];
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return {
    query,;
    setQuery,;
    results,;
    loading,;
    error,;
  };
}

// Window size hook;
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,;
    height: 0,;
  });
 useEffect(() => { if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,;
        height: window.innerHeight,;
      });
    } window.addEventListener('resize', handleResize);
    handleResize(); return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Intersection observer hook;
export function useIntersectionObserver(;
  elementRef: React.RefObject<Element>,;
  { threshold = 0 root = null rootMargin = '0%' }: IntersectionObserverInit = {}
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };
 useEffect(() => { if (typeof window === 'undefined') return;

    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observerParams = { threshold, root,
      rootMargin
    };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin]);

  return entry;
}

// Media query hook;
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
 useEffect(() => {   if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
      }
 const listener = () => setMatches(media.matches); media.addEventListener('change', listener); return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Theme hook; export function useTheme() { const [theme, setTheme] = useLocalStorage('theme', 'dark'); const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');
 useEffect(() => { if (typeof window === 'undefined') return; const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)'), setSystemTheme(mediaQuery.matches ? 'dark' : 'light'),
 const handler = (e: MediaQueryListEvent) => { setSystemTheme(e.matches ? 'dark' : 'light');
    }; mediaQuery.addEventListener('change', handler); return () => mediaQuery.removeEventListener('change', handler);
  }, []); const effectiveTheme = theme === 'system' ? systemTheme : theme
              
 const toggleTheme = useCallback(() => { setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return {
    theme,;
    setTheme,;
    effectiveTheme,;
    toggleTheme,;
    systemTheme,;
  };
}

// Previous value hook;
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// Online status hook;
export function useOnlineStatus() { const [isOnline, setIsOnline] = useState(; typeof navigator !== 'undefined' ? navigator.onLine : true;
  );
 useEffect(() => { if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false); window.addEventListener('online', handleOnline); window.addEventListener('offline', handleOffline);
 return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Copy to clipboard hook;
export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {  
    try {  
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      return true;     } catch (error) { console.error(error); } catch (error) { console.error(error); } catch (error) { console.error('Failed to copy to clipboard:', error);
      setIsCopied(false);
      return false;
    }
  }, []);

  return { isCopied,
      copyToClipboard
    };
}
