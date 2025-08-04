import { NextResponse } from 'next/server';

export async function GET() {
  try {  
    // TODO: Complete this comment
    // Mock portfolio data
    const portfolio = {
      totalValue: 125847.92,
      dayChange: 1247.83,
      dayChangePercent: 1.02,
      holdings: [ { symbol: 'AAPL',
          shares: 50,
          currentPrice: 189.50,
          totalValue: 9475.00,
          dayChange: 2.5
          } catch (error) { console.error(error); } catch (error) { console.error(error); }, { symbol: 'NVDA',
          shares: 25,
          currentPrice: 875.30,
          totalValue: 21882.50,
          dayChange: 15.2
        }
      ]
    };
    
    return NextResponse.json({ 
      success: true,
      portfolio
    }); } catch (error) { console.error('Portfolio fetch error:', error); return NextResponse.json( { success: false, error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
}
}
