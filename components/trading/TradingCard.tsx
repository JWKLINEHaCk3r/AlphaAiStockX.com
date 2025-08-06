import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export interface TradingCardProps {
  title: string
  description: string
  href: string
  stats?: {
    [key: string]: string
  }
}

export function TradingCard({ title, description, href, stats }: TradingCardProps) {
  return (
    <Card className="trading-card group cursor-pointer">
      <CardHeader>
        <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4 leading-relaxed">
          {description}
        </p>
        
        {stats && (
          <div className="space-y-2 mb-6">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-gray-500 text-sm capitalize">{key}:</span>
                <span className="text-white font-semibold">{value}</span>
              </div>
            ))}
          </div>
        )}
        
        <Link href={href}>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            Explore {title.replace(/🤖|📊|📈/g, '').trim()}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
