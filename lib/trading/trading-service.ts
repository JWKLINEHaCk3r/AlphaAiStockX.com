import { createAlpacaClient, AlpacaClient, formatOrderForDatabase, formatPositionForDatabase } from './alpaca-client';
import { prisma } from '@/app/lib/prisma';
import { SecurityAudit } from '@/lib/security';
import { WebSocketService } from './websocket-service';

export interface TradingServiceConfig {
  userId: string;
  portfolioId: string;
  alpacaClient: AlpacaClient;
  wsService?: WebSocketService;
}

export interface OrderRequest {
  symbol: string;
  quantity?: number;
  notional?: number;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop' | 'stop_limit' | 'trailing_stop';
  timeInForce: 'day' | 'gtc' | 'opg' | 'cls' | 'ioc' | 'fok';
  limitPrice?: number;
  stopPrice?: number;
  trailPrice?: number;
  trailPercent?: number;
  extendedHours?: boolean;
  clientOrderId?: string;
  takeProfitPrice?: number;
  stopLossPrice?: number;
  stopLossLimitPrice?: number;
}

export interface PositionSummary {
  symbol: string;
  quantity: number;
  marketValue: number;
  costBasis: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  averageEntryPrice: number;
  currentPrice: number;
  side: 'LONG' | 'SHORT';
  changeToday: number;
  changeTodayPercent?: number;
}

export interface PortfolioSummary {
  totalValue: number;
  cash: number;
  buyingPower: number;
  dayPnL: number;
  dayPnLPercent: number;
  totalPnL: number;
  totalPnLPercent: number;
  positions: PositionSummary[];
  equity: number;
  longMarketValue: number;
  shortMarketValue: number;
}

export interface OrderSummary {
  id: string;
  clientOrderId?: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  type: string;
  quantity: number;
  filledQuantity: number;
  price?: number;
  filledPrice?: number;
  status: string;
  timeInForce: string;
  extendedHours: boolean;
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  filledAt?: Date;
  canceledAt?: Date;
  expiredAt?: Date;
}

export class TradingService {
  private config: TradingServiceConfig;
  private alpaca: AlpacaClient;

  constructor(config: TradingServiceConfig) {
    this.config = config;
    this.alpaca = config.alpacaClient;
  }

  // Factory method to create service instance
  static async create(userId: string, portfolioId?: string): Promise<TradingService> {
    const alpacaClient = createAlpacaClient();
    
    // Get or create default portfolio if not specified
    let resolvedPortfolioId = portfolioId;
    if (!resolvedPortfolioId) {
      const defaultPortfolio = await prisma.portfolio.findFirst({
        where: { 
          userId,
          type: 'PERSONAL',
        },
      });

      if (!defaultPortfolio) {
        throw new Error('No default portfolio found for user');
      }

      resolvedPortfolioId = defaultPortfolio.id;
    }

    const wsService = new WebSocketService();

    return new TradingService({
      userId,
      portfolioId: resolvedPortfolioId,
      alpacaClient,
      wsService,
    });
  }

  // Order management
  async placeOrder(orderRequest: OrderRequest): Promise<OrderSummary> {
    try {
      // Validate order request
      this.validateOrderRequest(orderRequest);

      // Check account and buying power
      await this.validateTradingPermissions(orderRequest);

      // Create Alpaca order
      const alpacaOrderData = this.buildAlpacaOrder(orderRequest);
      const alpacaOrder = await this.alpaca.placeOrder(alpacaOrderData);

      // Save order to database
      const dbOrder = await this.saveOrderToDatabase(alpacaOrder);

      // Update portfolio cash balance for buy orders
      if (orderRequest.side === 'buy' && orderRequest.type === 'market') {
        await this.updatePortfolioCash(orderRequest);
      }

      // Notify via WebSocket
      this.notifyOrderUpdate(dbOrder);

      // Log security event
      SecurityAudit.logSecurityEvent({
        type: 'trading_activity',
        userId: this.config.userId,
        details: {
          action: 'order_placed',
          orderId: alpacaOrder.id,
          symbol: orderRequest.symbol,
          side: orderRequest.side,
          quantity: orderRequest.quantity,
          type: orderRequest.type,
        },
      });

      return this.formatOrderSummary(dbOrder);
    } catch (error) {
      SecurityAudit.logSecurityEvent({
        type: 'trading_error',
        userId: this.config.userId,
        details: {
          action: 'order_placement_failed',
          symbol: orderRequest.symbol,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }
  }

  async cancelOrder(orderId: string): Promise<void> {
    try {
      // Cancel with Alpaca
      await this.alpaca.cancelOrder(orderId);

      // Update order status in database
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'CANCELED',
          canceledAt: new Date(),
          updatedAt: new Date(),
        },
      });

      SecurityAudit.logSecurityEvent({
        type: 'trading_activity',
        userId: this.config.userId,
        details: {
          action: 'order_canceled',
          orderId,
        },
      });
    } catch (error) {
      SecurityAudit.logSecurityEvent({
        type: 'trading_error',
        userId: this.config.userId,
        details: {
          action: 'order_cancellation_failed',
          orderId,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }
  }

  async getOrders(params: {
    status?: 'open' | 'closed' | 'all';
    limit?: number;
    after?: string;
    until?: string;
  } = {}): Promise<OrderSummary[]> {
    try {
      // Get orders from database with Alpaca sync
      const dbOrders = await prisma.order.findMany({
        where: {
          portfolioId: this.config.portfolioId,
          ...(params.status && params.status !== 'all' && {
            status: params.status === 'open' 
              ? { in: ['PENDING', 'PARTIALLY_FILLED', 'ACCEPTED'] }
              : { in: ['FILLED', 'CANCELED', 'EXPIRED', 'REJECTED'] }
          }),
        },
        orderBy: { createdAt: 'desc' },
        take: params.limit || 50,
      });

      return dbOrders.map(order => this.formatOrderSummary(order));
    } catch (error) {
      SecurityAudit.logSecurityEvent({
        type: 'data_access_error',
        userId: this.config.userId,
        details: {
          action: 'get_orders_failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }
  }

  // Position management
  async getPositions(): Promise<PositionSummary[]> {
    try {
      // Get fresh positions from Alpaca
      const alpacaPositions = await this.alpaca.getPositions();

      // Sync with database
      await this.syncPositionsWithDatabase(alpacaPositions);

      // Get current market data for each position
      const positionsWithMarketData = await Promise.all(
        alpacaPositions.map(async (position) => {
          const snapshot = await this.alpaca.getSnapshot(position.symbol);
          return this.formatPositionSummary(position, snapshot);
        })
      );

      return positionsWithMarketData;
    } catch (error) {
      SecurityAudit.logSecurityEvent({
        type: 'data_access_error',
        userId: this.config.userId,
        details: {
          action: 'get_positions_failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }
  }

  async getPosition(symbol: string): Promise<PositionSummary | null> {
    try {
      const alpacaPosition = await this.alpaca.getPosition(symbol);
      if (!alpacaPosition) return null;

      const snapshot = await this.alpaca.getSnapshot(symbol);
      return this.formatPositionSummary(alpacaPosition, snapshot);
    } catch (error) {
      SecurityAudit.logSecurityEvent({
        type: 'data_access_error',
        userId: this.config.userId,
        details: {
          action: 'get_position_failed',
          symbol,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }
  }

  // Portfolio management
  async getPortfolioSummary(): Promise<PortfolioSummary> {
    try {
      const [account, positions] = await Promise.all([
        this.alpaca.getAccount(),
        this.getPositions(),
      ]);

      const totalValue = parseFloat(account.portfolio_value);
      const cash = parseFloat(account.cash);
      const equity = parseFloat(account.equity);
      const lastEquity = parseFloat(account.last_equity);

      const summary: PortfolioSummary = {
        totalValue,
        cash,
        buyingPower: parseFloat(account.buying_power),
        dayPnL: equity - lastEquity,
        dayPnLPercent: lastEquity > 0 ? ((equity - lastEquity) / lastEquity) * 100 : 0,
        totalPnL: positions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0),
        totalPnLPercent: 0, // Calculate based on cost basis
        positions,
        equity,
        longMarketValue: parseFloat(account.long_market_value),
        shortMarketValue: parseFloat(account.short_market_value),
      };

      // Calculate total PnL percentage
      const totalCostBasis = positions.reduce((sum, pos) => sum + pos.costBasis, 0);
      if (totalCostBasis > 0) {
        summary.totalPnLPercent = (summary.totalPnL / totalCostBasis) * 100;
      }

      // Update database portfolio
      await this.updatePortfolioInDatabase(summary);

      return summary;
    } catch (error) {
      SecurityAudit.logSecurityEvent({
        type: 'data_access_error',
        userId: this.config.userId,
        details: {
          action: 'get_portfolio_summary_failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }
  }

  // Market data
  async getMarketData(symbols: string[]): Promise<Record<string, any>> {
    try {
      const snapshots = await this.alpaca.getSnapshots(symbols);
      return snapshots;
    } catch (error) {
      SecurityAudit.logSecurityEvent({
        type: 'data_access_error',
        userId: this.config.userId,
        details: {
          action: 'get_market_data_failed',
          symbols,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }
  }

  async getHistoricalData(params: {
    symbols: string[];
    timeframe: '1Min' | '5Min' | '15Min' | '30Min' | '1Hour' | '1Day';
    start?: string;
    end?: string;
    limit?: number;
  }) {
    try {
      return await this.alpaca.getBars(params);
    } catch (error) {
      SecurityAudit.logSecurityEvent({
        type: 'data_access_error',
        userId: this.config.userId,
        details: {
          action: 'get_historical_data_failed',
          symbols: params.symbols,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }
  }

  // Sync methods
  async syncOrdersWithAlpaca(): Promise<void> {
    try {
      const alpacaOrders = await this.alpaca.getOrders({ limit: 100 });
      
      for (const alpacaOrder of alpacaOrders) {
        const existingOrder = await prisma.order.findUnique({
          where: { id: alpacaOrder.id },
        });

        const orderData = formatOrderForDatabase(alpacaOrder);

        if (existingOrder) {
          // Update existing order
          await prisma.order.update({
            where: { id: alpacaOrder.id },
            data: orderData,
          });
        } else {
          // Create new order
          await prisma.order.create({
            data: {
              ...orderData,
              portfolioId: this.config.portfolioId,
            },
          });
        }
      }
    } catch (error) {
      SecurityAudit.logSecurityEvent({
        type: 'sync_error',
        userId: this.config.userId,
        details: {
          action: 'sync_orders_failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }
  }

  // Private helper methods
  private validateOrderRequest(orderRequest: OrderRequest): void {
    if (!orderRequest.symbol || orderRequest.symbol.length === 0) {
      throw new Error('Symbol is required');
    }

    if (!orderRequest.quantity && !orderRequest.notional) {
      throw new Error('Either quantity or notional amount is required');
    }

    if (orderRequest.quantity && orderRequest.quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    if (orderRequest.notional && orderRequest.notional <= 0) {
      throw new Error('Notional amount must be positive');
    }

    if (orderRequest.type === 'limit' && !orderRequest.limitPrice) {
      throw new Error('Limit price is required for limit orders');
    }

    if ((orderRequest.type === 'stop' || orderRequest.type === 'stop_limit') && !orderRequest.stopPrice) {
      throw new Error('Stop price is required for stop orders');
    }
  }

  private async validateTradingPermissions(orderRequest: OrderRequest): Promise<void> {
    // Check if user has trading permissions
    const user = await prisma.user.findUnique({
      where: { id: this.config.userId },
      select: { status: true, kycStatus: true },
    });

    if (!user || user.status !== 'ACTIVE') {
      throw new Error('Account is not active for trading');
    }

    if (user.kycStatus !== 'APPROVED') {
      throw new Error('KYC verification required for trading');
    }

    // Check buying power for buy orders
    if (orderRequest.side === 'buy') {
      const account = await this.alpaca.getAccount();
      const buyingPower = parseFloat(account.buying_power);
      
      if (orderRequest.notional && orderRequest.notional > buyingPower) {
        throw new Error('Insufficient buying power');
      }

      if (orderRequest.quantity && orderRequest.limitPrice) {
        const orderValue = orderRequest.quantity * orderRequest.limitPrice;
        if (orderValue > buyingPower) {
          throw new Error('Insufficient buying power');
        }
      }
    }

    // Check position for sell orders
    if (orderRequest.side === 'sell' && orderRequest.quantity) {
      const position = await this.alpaca.getPosition(orderRequest.symbol);
      if (!position || parseFloat(position.qty) < orderRequest.quantity) {
        throw new Error('Insufficient position for sell order');
      }
    }
  }

  private buildAlpacaOrder(orderRequest: OrderRequest) {
    const alpacaOrder: any = {
      symbol: orderRequest.symbol.toUpperCase(),
      side: orderRequest.side,
      type: orderRequest.type,
      time_in_force: orderRequest.timeInForce,
      extended_hours: orderRequest.extendedHours || false,
    };

    if (orderRequest.quantity) {
      alpacaOrder.qty = orderRequest.quantity;
    }

    if (orderRequest.notional) {
      alpacaOrder.notional = orderRequest.notional;
    }

    if (orderRequest.limitPrice) {
      alpacaOrder.limit_price = orderRequest.limitPrice;
    }

    if (orderRequest.stopPrice) {
      alpacaOrder.stop_price = orderRequest.stopPrice;
    }

    if (orderRequest.trailPrice) {
      alpacaOrder.trail_price = orderRequest.trailPrice;
    }

    if (orderRequest.trailPercent) {
      alpacaOrder.trail_percent = orderRequest.trailPercent;
    }

    if (orderRequest.clientOrderId) {
      alpacaOrder.client_order_id = orderRequest.clientOrderId;
    }

    // Add bracket order legs if specified
    if (orderRequest.takeProfitPrice || orderRequest.stopLossPrice) {
      alpacaOrder.order_class = 'bracket';
      
      if (orderRequest.takeProfitPrice) {
        alpacaOrder.take_profit = { limit_price: orderRequest.takeProfitPrice };
      }

      if (orderRequest.stopLossPrice) {
        alpacaOrder.stop_loss = { 
          stop_price: orderRequest.stopLossPrice,
          ...(orderRequest.stopLossLimitPrice && { limit_price: orderRequest.stopLossLimitPrice })
        };
      }
    }

    return alpacaOrder;
  }

  private async saveOrderToDatabase(alpacaOrder: any) {
    const orderData = formatOrderForDatabase(alpacaOrder);
    return await prisma.order.create({
      data: {
        ...orderData,
        portfolioId: this.config.portfolioId,
      },
    });
  }

  private async updatePortfolioCash(orderRequest: OrderRequest): Promise<void> {
    if (orderRequest.side === 'buy' && orderRequest.notional) {
      await prisma.portfolio.update({
        where: { id: this.config.portfolioId },
        data: {
          cashBalance: {
            decrement: orderRequest.notional,
          },
        },
      });
    }
  }

  private notifyOrderUpdate(order: any): void {
    if (this.config.wsService) {
      this.config.wsService.notifyOrderUpdate(this.config.userId, order);
    }
  }

  private formatOrderSummary(dbOrder: any): OrderSummary {
    return {
      id: dbOrder.id,
      clientOrderId: dbOrder.clientOrderId,
      symbol: dbOrder.symbol,
      side: dbOrder.side,
      type: dbOrder.type,
      quantity: dbOrder.quantity,
      filledQuantity: dbOrder.filledQuantity,
      price: dbOrder.price,
      filledPrice: dbOrder.filledPrice,
      status: dbOrder.status,
      timeInForce: dbOrder.timeInForce,
      extendedHours: dbOrder.extendedHours,
      createdAt: dbOrder.createdAt,
      updatedAt: dbOrder.updatedAt,
      submittedAt: dbOrder.submittedAt,
      filledAt: dbOrder.filledAt,
      canceledAt: dbOrder.canceledAt,
      expiredAt: dbOrder.expiredAt,
    };
  }

  private formatPositionSummary(alpacaPosition: any, snapshot: any): PositionSummary {
    const currentPrice = snapshot?.latestTrade?.price || parseFloat(alpacaPosition.avg_entry_price);
    const changeToday = parseFloat(alpacaPosition.change_today || '0');
    const quantity = parseFloat(alpacaPosition.qty);
    const marketValue = parseFloat(alpacaPosition.market_value);
    
    return {
      symbol: alpacaPosition.symbol,
      quantity,
      marketValue,
      costBasis: parseFloat(alpacaPosition.cost_basis),
      unrealizedPnL: parseFloat(alpacaPosition.unrealized_pl),
      unrealizedPnLPercent: parseFloat(alpacaPosition.unrealized_plpc),
      averageEntryPrice: parseFloat(alpacaPosition.avg_entry_price),
      currentPrice,
      side: alpacaPosition.side.toUpperCase() as 'LONG' | 'SHORT',
      changeToday,
      changeTodayPercent: marketValue > 0 ? (changeToday / (marketValue - changeToday)) * 100 : 0,
    };
  }

  private async syncPositionsWithDatabase(alpacaPositions: any[]): Promise<void> {
    for (const alpacaPosition of alpacaPositions) {
      const positionData = formatPositionForDatabase(alpacaPosition);
      
      await prisma.position.upsert({
        where: {
          portfolioId_symbol: {
            portfolioId: this.config.portfolioId,
            symbol: alpacaPosition.symbol,
          },
        },
        update: positionData,
        create: {
          ...positionData,
          portfolioId: this.config.portfolioId,
        },
      });
    }
  }

  private async updatePortfolioInDatabase(summary: PortfolioSummary): Promise<void> {
    await prisma.portfolio.update({
      where: { id: this.config.portfolioId },
      data: {
        totalValue: summary.totalValue,
        cashBalance: summary.cash,
        dailyPnL: summary.dayPnL,
        totalPnL: summary.totalPnL,
        updatedAt: new Date(),
      },
    });
  }
}
