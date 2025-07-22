// Mock WebSocket Service for SSR compatibility;
export class WebSocketService {
  private url: string;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectInterval: number = 3000;

  constructor(url: string) {
    this.url = url;
  }

  connect(): Promise<void> {
    return Promise.resolve();
  }

  disconnect(): void {
    // No-op for SSR;
  }

  send(message: any): void {
    if (typeof window !== 'undefined') {
      console.log('WebSocket send (mock):', message);
    }
  }

  onMessage(callback: (data: any) => void): void {
    // No-op for SSR;
  }

  onError(callback: (error: any) => void): void {
    // No-op for SSR;
  }

  onClose(callback: () => void): void {
    // No-op for SSR;
  }

  isConnected(): boolean {
    return false;
  }
}

export const createWebSocketService = (url: string) => {
  return new WebSocketService(url);
};

// Export for compatibility;
export default WebSocketService;
