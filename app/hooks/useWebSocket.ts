'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseWebSocketOptions {
  onOpen?: () => void;
  onMessage?: (data: any) => void;
  onError?: (error: any) => void;
  onClose?: () => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

interface WebSocketHook {
  sendMessage: (message: any) => void;
  readyState: number;
  isConnected: boolean;
}

// Mock WebSocket states for SSR compatibility
const CONNECTING = 0;
const OPEN = 1;
const CLOSING = 2;
const CLOSED = 3;

export function useWebSocket(url: string, options: UseWebSocketOptions = {}): WebSocketHook {
  const {
    onOpen,
    onMessage,
    onError,
    onClose,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
  } = options;

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const readyStateRef = useRef(CLOSED);
  const isConnectedRef = useRef(false);

  const sendMessage = useCallback(
    (message: any) => {
      if (typeof window === 'undefined') {
        console.warn('WebSocket: Cannot send message on server side');
        return;
      }

      if (wsRef.current && wsRef.current.readyState === OPEN) {
        try {
          wsRef.current.send(JSON.stringify(message));
        } catch (error) {
          console.error('WebSocket send error:', error);
          onError?.(error);
        }
      } else {
        console.warn('WebSocket: Connection not ready');
      }
    },
    [onError]
  );

  const connect = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      wsRef.current = new WebSocket(url);
      readyStateRef.current = CONNECTING;

      wsRef.current.onopen = () => {
        readyStateRef.current = OPEN;
        isConnectedRef.current = true;
        reconnectAttemptsRef.current = 0;
        onOpen?.();
      };

      wsRef.current.onmessage = event => {
        try {
          const data = JSON.parse(event.data);
          onMessage?.(data);
        } catch (error) {
          onMessage?.(event.data);
        }
      };

      wsRef.current.onerror = error => {
        console.error('WebSocket error:', error);
        onError?.(error);
      };

      wsRef.current.onclose = () => {
        readyStateRef.current = CLOSED;
        isConnectedRef.current = false;
        onClose?.();

        // Attempt to reconnect
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++;
          setTimeout(connect, reconnectInterval);
        }
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      onError?.(error);
    }
  }, [url, onOpen, onMessage, onError, onClose, reconnectInterval, maxReconnectAttempts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  return {
    sendMessage,
    readyState: readyStateRef.current,
    isConnected: isConnectedRef.current,
  };
}
