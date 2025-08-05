"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card.js";

interface Prediction {
  metric: string"
    current: string"
  predicted: string, confidence: string, direction: 'up' | 'down'
}

export default function MarketPredictorDashboard() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);

  const generatePredictions = () => {
    setLoading(true);
    setTimeout(() => {
      setPredictions([ { metric: 'S&P 500', current: '4,150', predicted: '4,280', confidence: '78%', direction: 'up'
        }, { metric: 'NASDAQ', current: '12,800', predicted: '13,200', confidence: '82%', direction: 'up'
        }, { metric: 'VIX', current: '18.5', predicted: '15.2', confidence: '71%', direction: 'down'
        }
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Market Predictor Dashboard</h1>
        <Badge variant="outline">AI Predictions</Badge>
      </div>

      <Button 
        onClick={generatePredictions}
        disabled={loading}
        className="w-full" > {loading ? 'Generating Predictions...' : 'Generate AI Market Predictions'}
      </Button>

      {predictions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {predictions.map((prediction, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>{prediction.metric}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current:</span>
                    <span className="font-semibold">{prediction.current}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Predicted:</span> <div className="flex items-center space-x-1"> {prediction.direction === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )} <span className={`font-semibold ${ prediction.direction === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {prediction.predicted}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confidence:</span>
                    <span className="font-semibold text-blue-600">{prediction.confidence}</span>
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
