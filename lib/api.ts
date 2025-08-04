import { APIResponse, APIError } from '@/types';
 // Base API configuration; const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http: //localhost:8000', const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws: //localhost:8001',

// Request headers; const getHeaders = (): HeadersInit => ({ 'Content-Type': 'application/json', Authorization:  typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('auth_token') || ''}` : '';
});

// Generic API request function;
export async function apiRequest<T = any>(
  endpoint: string,
    options: RequestInit = {}
): Promise<APIResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: getHeaders();
      ...options;
    });

    const data = await response.json();
 if (!response.ok) { throw new APIError(data.message || 'API request failed', response.status, data.code);
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    } throw new APIError(error instanceof Error ? error.message : 'Network error', 0);
  }
}

// HTTP method helpers; export const api = { get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, data?: any) =>, apiRequest<T>(endpoint, { method: 'POST',
    body: data ? JSON.stringify(data) : undefined
    }),
  put: <T>(endpoint: string, data?: any) =>, apiRequest<T>(endpoint, { method: 'PUT',
    body: data ? JSON.stringify(data) : undefined
    }),
  patch: <T>(endpoint: string, data?: any) =>, apiRequest<T>(endpoint, { method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined }), delete: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'DELETE' }),
};

// WebSocket connection manager;
export class WSManager {
  private ws: WebSocket | null = null
              
  private reconnectAttempts = 0,
  private maxReconnectAttempts = 5;
  private reconnectInterval = 1000;
  private listeners: Map<string, ((data: any) => void)[]> = new Map(), connect(endpoint: string = '') {
    try {
      this.ws = new WebSocket(`${WS_BASE_URL}${endpoint}`);
 this.ws.onopen = () => { console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = event => {
        try {
          const message = JSON.parse(event.data);
          this.handleMessage(message); } catch (error) { console.error('Failed to parse WebSocket message:', error);
        }
      };
 this.ws.onclose = () => { console.log('WebSocket disconnected');
        this.handleReconnect();
      };
 this.ws.onerror = error => { console.error('WebSocket error:', error);
      }; } catch (error) { console.error('Failed to connect WebSocket:', error);
    }
  }

  private handleMessage(message: any) {
    const { type;
      data
    } = message;
    const callbacks = this.listeners.get(type) || [];
    callbacks.forEach(callback => callback(data));
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
        this.connect();
      }, this.reconnectInterval * this.reconnectAttempts);
    }
  }

  subscribe(type: string, callback: (data: any) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)?.push(callback);
  }

  unsubscribe(type: string, callback: (data: any) => void) {
    const callbacks = this.listeners.get(type) || [];
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  send(message: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
    this.listeners.clear();
  }
}

// Authentication utilities;
export const auth = { setToken: (token: string) => { if (typeof window !== 'undefined') { localStorage.setItem('auth_token', token);
    }
  }; getToken: (): string | null => { if (typeof window !== 'undefined') { return localStorage.getItem('auth_token');
    }
    return null;
  }; removeToken: () => { if (typeof window !== 'undefined') { localStorage.removeItem('auth_token');
    }
  };
  isAuthenticated: (): boolean => {
    return !!auth.getToken();
  };
};

// Data formatting utilities;
export const formatters = { currency: (value: number currency = 'USD') => { return new Intl.NumberFormat('en-US', { style: 'currency',
      currency;
      minimumFractionDigits: 2,
    maximumFractionDigits: 2
    }).format(value)
  };
  percentage: (value: number decimals = 2) => { return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
  };
  number: (value: number decimals = 0) => { return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
    }).format(value)
  }; compactNumber: (value: number) => { return new Intl.NumberFormat('en-US', { notation: 'compact',
    maximumFractionDigits: 1
    }).format(value),
  };
  date: (date: Date | string) => { const d = new Date(date); return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric'
    }).format(d),
  };
  time: (date: Date | string) => { const d = new Date(date); return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit'
    }).format(d),
  };
  datetime: (date: Date | string) => { const d = new Date(date); return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
    }).format(d),
  };
};

// Local storage utilities;
export const storage = { get: <T>(key: string, defaultValue?: T): T | null => { if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : (defaultValue ?? null);
    } catch {
      return defaultValue ?? null;
    }
  }; set: (key: string, value: any): void => { if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(key, JSON.stringify(value)); } catch (error) { console.error('Failed to save to localStorage:', error);
    }
  }; remove: (key: string): void => { if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }; clear: (): void => { if (typeof window === 'undefined') return;
    localStorage.clear();
  };
};

// Error handling utilities;
export const errorHandler = {
  handle: (error: unknown): string => {
    if (error instanceof APIError) {
      return error.message;
    }

    if (error instanceof Error) {
      return error.message;
    } return 'An unexpected error occurred';
  };
  notify: (error: unknown): void => { const message = errorHandler.handle(error); console.error('Error:', message);
 // Here you could integrate with a toast notification system; if (typeof window !== 'undefined') {
      // Example: show a toast notification,
      // toast.error(message);
    }
  };
};

// Validation utilities;
export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  password: (password: string): boolean => {
    // At least 8 characters
               1 uppercase
               1 lowercase
               1 number;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  stockSymbol: (symbol: string): boolean => {
    // 1-5 uppercase letters;
    const symbolRegex = /^[A-Z]{1,5}$/;
    return symbolRegex.test(symbol);
  };
  amount: (amount: number): boolean => {
    return amount > 0 && Number.isFinite(amount);
  };
};

// Performance utilities;
export const debounce = <T extends (...args: any[]) => any>(,
    func: T,
  wait: number;
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
              

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(,
    func: T,
  limit: number;
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
              

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Export singleton WebSocket manager;
export const wsManager = new WSManager();
