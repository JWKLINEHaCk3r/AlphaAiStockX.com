import { getSession } from 'next-auth/react';

// API Base Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const session = await getSession();
    return {
      'Content-Type': 'application/json',
      ...(session?.user && { 'Authorization': `Bearer ${session.user.id}` }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // User Authentication & Profile
  async registerUser(userData: {
    name: string;
    email: string;
    password: string;
    username?: string;
  }) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUserProfile() {
    return this.request('/api/user/profile');
  }

  async updateUserProfile(profileData: any) {
    return this.request('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Portfolio Management
  async getPortfolios(portfolioId?: string) {
    const query = portfolioId ? `?portfolioId=${portfolioId}` : '';
    return this.request(`/api/portfolio${query}`);
  }

  async createPortfolio(portfolioData: {
    name: string;
    description: string;
    type?: string;
    initialDeposit?: number;
  }) {
    return this.request('/api/portfolio', {
      method: 'POST',
      body: JSON.stringify(portfolioData),
    });
  }

  // Trading Orders
  async placeOrder(orderData: {
    symbol: string;
    side: 'BUY' | 'SELL';
    type: 'MARKET' | 'LIMIT' | 'STOP' | 'STOP_LIMIT';
    quantity: number;
    price?: number;
    stopPrice?: number;
    timeInForce?: 'DAY' | 'GTC' | 'IOC' | 'FOK';
    portfolioId?: string;
  }) {
    return this.request('/api/trading/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(filters?: {
    portfolioId?: string;
    status?: string;
    limit?: number;
  }) {
    const query = new URLSearchParams(filters as any).toString();
    return this.request(`/api/trading/orders${query ? `?${query}` : ''}`);
  }

  // Market Data
  async getMarketData(symbols: string[], interval = '1m', limit = 100) {
    const query = new URLSearchParams({
      symbols: symbols.join(','),
      interval,
      limit: limit.toString(),
    }).toString();
    return this.request(`/api/market/data?${query}`);
  }

  async subscribeToMarketData(symbols: string[]) {
    return this.request('/api/market/data', {
      method: 'POST',
      body: JSON.stringify({ action: 'subscribe', symbols }),
    });
  }

  // AI Trading Signals
  async getAISignals(filters?: {
    limit?: number;
    minConfidence?: number;
  }) {
    const query = new URLSearchParams(filters as any).toString();
    return this.request(`/api/ai/signals${query ? `?${query}` : ''}`);
  }

  // AI Models
  async getAIModels(filters?: {
    type?: string;
    public?: boolean;
    limit?: number;
  }) {
    const query = new URLSearchParams(filters as any).toString();
    return this.request(`/api/ai/models${query ? `?${query}` : ''}`);
  }

  async createAIModel(modelData: {
    name: string;
    description: string;
    type: string;
    parameters: any;
    trainingData: any;
    isPublic?: boolean;
    subscriptionPrice?: number;
  }) {
    return this.request('/api/ai/models', {
      method: 'POST',
      body: JSON.stringify(modelData),
    });
  }

  async subscribeToAIModel(modelId: string) {
    return this.request(`/api/ai/models/${modelId}/subscribe`, {
      method: 'POST',
    });
  }

  async unsubscribeFromAIModel(modelId: string) {
    return this.request(`/api/ai/models/${modelId}/subscribe`, {
      method: 'DELETE',
    });
  }

  // Social Trading
  async getSocialFeed(filters?: {
    type?: string;
    userId?: string;
    limit?: number;
  }) {
    const query = new URLSearchParams(filters as any).toString();
    return this.request(`/api/social/feed${query ? `?${query}` : ''}`);
  }

  async createSocialPost(postData: {
    content: string;
    type: 'POST' | 'TRADE_IDEA' | 'MARKET_ANALYSIS' | 'NEWS_SHARE';
    attachments?: string[];
    tradingData?: any;
  }) {
    return this.request('/api/social/feed', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async followUser(userId: string) {
    return this.request(`/api/social/follow/${userId}`, {
      method: 'POST',
    });
  }

  async unfollowUser(userId: string) {
    return this.request(`/api/social/follow/${userId}`, {
      method: 'DELETE',
    });
  }

  // System Health
  async getSystemHealth() {
    return this.request('/api/health');
  }
}

export const apiClient = new ApiClient();
export default apiClient;
