import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { TradingDashboard } from '@/components/trading/TradingDashboard';
import { ThemeProvider } from '@/components/ui/theme-provider';

// Mock next-auth
jest.mock('next-auth/react');
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;

// Mock WebSocket
global.WebSocket = jest.fn(() => ({
  send: jest.fn(),
  close: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock chart library
jest.mock('recharts', () => ({
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: any) => (
    <div data-testid="responsive-container">{children}</div>
  ),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(<ThemeProvider defaultTheme="dark">{component}</ThemeProvider>);
};

describe('TradingDashboard', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
        },
        expires: '2024-12-31',
      },
      status: 'authenticated',
      update: jest.fn(),
    });

    // Mock fetch for API calls
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            portfolio: {
              totalValue: 100000,
              dailyPnL: 1500,
              positions: [],
            },
            marketData: {
              indices: [],
            },
          }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders trading dashboard components', async () => {
    renderWithProviders(<TradingDashboard />);

    expect(screen.getByTestId('trading-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('portfolio-overview')).toBeInTheDocument();
    expect(screen.getByTestId('market-overview')).toBeInTheDocument();
    expect(screen.getByTestId('trading-panel')).toBeInTheDocument();
  });

  it('displays portfolio value correctly', async () => {
    renderWithProviders(<TradingDashboard />);

    await waitFor(() => {
      expect(screen.getByTestId('portfolio-value')).toHaveTextContent('$100,000');
    });
  });

  it('handles order placement', async () => {
    renderWithProviders(<TradingDashboard />);

    const symbolInput = screen.getByTestId('symbol-input');
    const quantityInput = screen.getByTestId('quantity-input');
    const placeOrderButton = screen.getByTestId('place-order-button');

    fireEvent.change(symbolInput, { target: { value: 'AAPL' } });
    fireEvent.change(quantityInput, { target: { value: '10' } });
    fireEvent.click(placeOrderButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/trading/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: 'AAPL',
          quantity: 10,
          type: 'market',
          side: 'buy',
        }),
      });
    });
  });

  it('validates order inputs', async () => {
    renderWithProviders(<TradingDashboard />);

    const placeOrderButton = screen.getByTestId('place-order-button');
    fireEvent.click(placeOrderButton);

    await waitFor(() => {
      expect(screen.getByText('Symbol is required')).toBeInTheDocument();
      expect(screen.getByText('Quantity must be positive')).toBeInTheDocument();
    });
  });

  it('handles WebSocket connection for real-time data', async () => {
    renderWithProviders(<TradingDashboard />);

    await waitFor(() => {
      expect(global.WebSocket).toHaveBeenCalledWith('ws://localhost:3001/market-data');
    });
  });

  it('displays error states appropriately', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('API Error')));

    renderWithProviders(<TradingDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load portfolio data')).toBeInTheDocument();
    });
  });

  it('updates real-time prices', async () => {
    const mockWebSocket = {
      send: jest.fn(),
      close: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    global.WebSocket = jest.fn(() => mockWebSocket);

    renderWithProviders(<TradingDashboard />);

    // Simulate WebSocket message
    const messageHandler = mockWebSocket.addEventListener.mock.calls.find(
      call => call[0] === 'message'
    )[1];

    messageHandler({
      data: JSON.stringify({
        type: 'price_update',
        symbol: 'AAPL',
        price: 150.25,
      }),
    });

    await waitFor(() => {
      expect(screen.getByTestId('aapl-price')).toHaveTextContent('$150.25');
    });
  });

  it('handles authentication requirement', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    });

    renderWithProviders(<TradingDashboard />);

    expect(screen.getByText('Please log in to access trading')).toBeInTheDocument();
  });
});
