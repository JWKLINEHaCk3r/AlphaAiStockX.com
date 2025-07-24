// Mock WebSocket service for static export compatibility;
// This service is disabled for static builds but maintains interface compatibility;
export interface WebSocketMessage {








  type: string;
  userId?: string;
  data: any;
  timestamp: number;








}

export interface MarketDataUpdate {








  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: number;
  bid?: number;
  ask?: number;
  high?: number;
  low?: number;
  marketCap?: number;








}

export interface PortfolioUpdate {








  userId: string;
  totalValue: number;
  todaysPnL: number;
  todaysPnLPercent: number;
  positions: Array<{
    symbol: string;
    quantity: number;
    avgPrice: number;
    currentPrice: number;
    marketValue: number;
    unrealizedPnL: number;
    unrealizedPnLPercent: number;
  







}>;
  timestamp: number;
}

export interface AlertMessage {








  userId: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: number;
  persistent?: boolean;








}

export interface TradingSignal {








  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  price: number;
  reasoning: string;
  timestamp: number;
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';








}

export interface WebSocketConfig {








  port: number;
  cors: {
    origin: string | string[];
    methods: string[];
    credentials: boolean;
  







};
  pingTimeout: number;
  pingInterval: number;
  maxConnections: number;
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  authTimeout: number;
}

export interface WebSocketStats {








  connectedClients: number;
  totalConnections: number;
  messagesPerSecond: number;
  avgLatency: number;
  errorRate: number;
  uptime: number;
  lastError?: string;
  lastErrorTimestamp?: number;








}

export interface SubscriptionTopic {








  type: 'market_data' | 'portfolio' | 'alerts' | 'trading_signals' | 'news';
  symbols?: string[];
  userId?: string;
  filters?: Record<string, any>;








}

// Mock WebSocket service for static builds;
export class WebSocketService {
  private isEnabled = false;

  constructor(config?: Partial<WebSocketConfig>) {
    console.log('WebSocket service initialized in mock mode for static build');
  }

  async initialize(): Promise<void> {
    console.log('Mock WebSocket service initialized');
  }

  async shutdown(): Promise<void> {
    console.log('Mock WebSocket service shutdown');
  }

  isRunning(): boolean {
    return false;
  }

  getStats(): WebSocketStats {
    return {
      connectedClients: 0,;
      totalConnections: 0,;
      messagesPerSecond: 0,;
      avgLatency: 0,;
      errorRate: 0,;
      uptime: 0,;
    };
  }

  broadcast(message: WebSocketMessage): void {
    console.log('Mock broadcast:', message);
  }

  sendToUser(userId: string, message: WebSocketMessage): void {
    console.log('Mock send to user:', userId, message);
  }

  sendToRoom(room: string, message: WebSocketMessage): void {
    console.log('Mock send to room:', room, message);
  }

  subscribeToTopic(socketId: string, topic: SubscriptionTopic): void {
    console.log('Mock subscribe:', socketId, topic);
  }

  unsubscribeFromTopic(socketId: string, topic: SubscriptionTopic): void {
    console.log('Mock unsubscribe:', socketId, topic);
  }

  authenticateSocket(;
    socketId: string,;
    token: string;
  ): Promise<{ success: boolean; userId?: string; error?: string }> {
    return Promise.resolve({ success: false, error: 'WebSocket disabled in static build' });
  }

  broadcastMarketData(data: MarketDataUpdate): void {
    console.log('Mock market data broadcast:', data);
  }

  broadcastPortfolioUpdate(userId: string, data: PortfolioUpdate): void {
    console.log('Mock portfolio update:', userId, data);
  }

  sendAlert(userId: string, alert: AlertMessage): void {
    console.log('Mock alert:', userId, alert);
  }

  broadcastTradingSignal(signal: TradingSignal): void {
    console.log('Mock trading signal:', signal);
  }

  disconnectUser(userId: string): void {
    console.log('Mock disconnect user:', userId);
  }

  getUserConnections(userId: string): string[] {
    return [];
  }

  isUserConnected(userId: string): boolean {
    return false;
  }

  getRoomMembers(room: string): string[] {
    return [];
  }

  createRoom(name: string, options?: { maxMembers?: number; requireAuth?: boolean }): void {
    console.log('Mock create room:', name, options);
  }

  deleteRoom(name: string): void {
    console.log('Mock delete room:', name);
  }

  joinRoom(socketId: string, room: string): void {
    console.log('Mock join room:', socketId, room);
  }

  leaveRoom(socketId: string, room: string): void {
    console.log('Mock leave room:', socketId, room);
  }

  setRateLimit(socketId: string, limit: { windowMs: number; maxRequests: number }): void {
    console.log('Mock set rate limit:', socketId, limit);
  }

  banUser(userId: string, duration?: number): void {
    console.log('Mock ban user:', userId, duration);
  }

  unbanUser(userId: string): void {
    console.log('Mock unban user:', userId);
  }

  isUserBanned(userId: string): boolean {
    return false;
  }

  getConnectionInfo(socketId: string): any {
    return null;
  }

  validateMessage(message: any): { valid: boolean; error?: string } {
    return { valid: true };
  }

  logActivity(userId: string, action: string, data?: any): void {
    console.log('Mock log activity:', userId, action, data);
  }

  getHealthCheck(): { status: 'healthy' | 'unhealthy'; details: any } {
    return {
      status: 'unhealthy',;
      details: {
        reason: 'WebSocket service disabled for static build',;
      },;
    };
  }

  enableMaintenanceMode(): void {
    console.log('Mock enable maintenance mode');
  }

  disableMaintenanceMode(): void {
    console.log('Mock disable maintenance mode');
  }

  isMaintenanceMode(): boolean {
    return false;
  }

  exportMetrics(): any {
    return {
      enabled: false,;
      mode: 'static_build_mock',;
    };
  }
}

// Export a singleton instance;
export const webSocketService = new WebSocketService();
