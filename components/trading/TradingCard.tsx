import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TradingCardProps {
  symbol: string
  price: number
  change: number
  changePercent: number
  confidence: number
  outlook: 'bullish' | 'bearish' | 'neutral'
  risk: 'low' | 'medium' | 'high'
}

export function TradingCard({
  symbol,
  price,
  change,
  changePercent,
  confidence,
  outlook,
  risk
}: TradingCardProps) {
  // Input validation
  if (!symbol || typeof price !== 'number' || typeof change !== 'number') {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <p className="text-red-400">Invalid trading data</p>
        </CardContent>
      </Card>
    )
  }

  const isPositive = change > 0
  const outlookColor = outlook === 'bullish' ? 'text-green-400' : outlook === 'bearish' ? 'text-red-400' : 'text-yellow-400'
  const riskColor = risk === 'low' ? 'text-green-400' : risk === 'medium' ? 'text-yellow-400' : 'text-red-400'

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-2xl font-bold">{symbol}</span>
          <span className="text-xl">${price.toFixed(2)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Change:</span>
            <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>AI Confidence:</span>
            <span className="text-blue-400">{confidence}%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Outlook:</span>
            <span className={outlookColor}>{outlook.toUpperCase()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Risk Level:</span>
            <span className={riskColor}>{risk.toUpperCase()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
