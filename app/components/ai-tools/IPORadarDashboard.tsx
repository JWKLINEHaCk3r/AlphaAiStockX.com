import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
'use client';
import { Calendar } from "../../../components/ui/calendar";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import React, { useState } from 'react';
import { Rocket, Calendar, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card.js";

interface IPOData {
  company: string,
    symbol: string,
  date: string,
    priceRange: string,
  valuation: string,
    aiScore: string
}

export default function IPORadarDashboard() {
  const [ipos, setIpos] = useState<IPOData[]>([]);
  const [loading, setLoading] = useState(false);

  const scanIPOs = () => {
    setLoading(true);
    setTimeout(() => {
      setIpos([ { company: 'TechFlow AI', symbol: 'TFAI', date: '2025-02-15', priceRange: '$18-22', valuation: '$2.1B', aiScore: '8.5/10'
        }, { company: 'GreenEnergy Solutions', symbol: 'GREN', date: '2025-02-28', priceRange: '$25-30', valuation: '$3.8B', aiScore: '7.2/10'
        }, { company: 'BioTech Innovations', symbol: 'BIOT', date: '2025-03-10', priceRange: '$15-20', valuation: '$1.5B', aiScore: '9.1/10'
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const getScoreColor = (score: string) => { const numScore = parseFloat(score); if (numScore >= 8) return 'text-green-600'; if (numScore >= 6) return 'text-yellow-600'; return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Rocket className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold">IPO Radar Dashboard</h1>
        </div>
        <Badge variant="outline">Upcoming IPOs</Badge>
      </div>

      <Button 
        onClick={scanIPOs}
        disabled={loading}
        className="w-full" > {loading ? 'Scanning for IPOs...' : 'Scan Upcoming IPOs'}
      </Button>

      {ipos.length > 0 && (
        <div className="space-y-4">
          {ipos.map((ipo, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <span>{ipo.company}</span>
                    <Badge variant="outline">{ipo.symbol}</Badge>
                  </CardTitle>
                  <Badge className={getScoreColor(ipo.aiScore)}>
                    AI Score: {ipo.aiScore}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">IPO Date</p>
                      <p className="font-semibold">{ipo.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Price Range</p>
                      <p className="font-semibold">{ipo.priceRange}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Rocket className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Valuation</p>
                      <p className="font-semibold">{ipo.valuation}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
