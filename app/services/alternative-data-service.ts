import { Card } from '../../components/ui/card.tsx';
import { Card } from '../../components/ui/card';
// Alternative Data Service for unique market insights

interface SatelliteData {
  yearOverYearChange: number;
  confidence: number;
}

interface CreditCardData {
  yearOverYearChange: number;
}

interface WebTrafficData {
  yearOverYearChange: number;
}

interface SocialSentimentData {
  overallSentiment: number;
}

interface MobileAppData {
  yearOverYearGrowth: number;
}

interface GeolocationData {
  yearOverYearChange: number;
}

export class AlternativeDataService {
  private static instance: AlternativeDataService;
  private dataSources: Map<string, any> = new Map();
  private dataCache: Map<string, any> = new Map();
  private satelliteImagery: Map<string, any> = new Map();
  private creditCardData: Map<string, any> = new Map();
  private webTrafficData: Map<string, any> = new Map();
  private socialSentimentData: Map<string, any> = new Map();
  private mobileAppData: Map<string, any> = new Map();
  private geolocationData: Map<string, any> = new Map();

  static getInstance(): AlternativeDataService {
    if (!AlternativeDataService.instance) {
      AlternativeDataService.instance = new AlternativeDataService();
    }
    return AlternativeDataService.instance;
  }

  async initialize() {
    console.log('Initializing Alternative Data Service...');
    await this.initializeDataSources();
    await this.startDataCollection();
    console.log('Alternative Data Service initialized');
    return true;
  }

  private async initializeDataSources() {
    // Initialize alternative data sources
    const sources = [
      {
        id: 'satellite_imagery',
        name: 'Satellite Imagery Analysis',
        type: 'visual',
        updateFrequency: 'daily',
        latency: '1 day',
        coverage: 'global',
        accuracy: 0.92,
        description:
          'Analyzes retail parking lots, oil storage, shipping ports, and agricultural yields',
      },
      {
        id: 'credit_card_transactions',
        name: 'Credit Card Transaction Data',
        type: 'financial',
        updateFrequency: 'daily',
        latency: '2 days',
        coverage: 'US, Europe, Asia',
        accuracy: 0.95,
        description: 'Aggregated and anonymized consumer spending patterns across retailers',
      },
      {
        id: 'web_traffic',
        name: 'Web Traffic Analytics',
        type: 'digital',
        updateFrequency: 'hourly',
        latency: '6 hours',
        coverage: 'global',
        accuracy: 0.97,
        description:
          'Website visits, engagement metrics, and conversion rates for public companies',
      },
      {
        id: 'social_sentiment',
        name: 'Social Media Sentiment',
        type: 'text',
        updateFrequency: 'real-time',
        latency: '5 minutes',
        coverage: 'global',
        accuracy: 0.85,
        description: 'AI-powered sentiment analysis across Twitter, Reddit, StockTwits, and forums',
      },
      {
        id: 'mobile_app_usage',
        name: 'Mobile App Usage Data',
        type: 'digital',
        updateFrequency: 'daily',
        latency: '1 day',
        coverage: 'global',
        accuracy: 0.93,
        description: 'Downloads, active users, and engagement metrics for mobile applications',
      },
      {
        id: 'geolocation',
        name: 'Geolocation Analytics',
        type: 'location',
        updateFrequency: 'hourly',
        latency: '3 hours',
        coverage: 'global',
        accuracy: 0.91,
        description:
          'Foot traffic analysis for retail, restaurants, hotels, and commercial locations',
      },
      {
        id: 'supply_chain',
        name: 'Supply Chain Intelligence',
        type: 'logistics',
        updateFrequency: 'daily',
        latency: '1 day',
        coverage: 'global',
        accuracy: 0.89,
        description: 'Shipping container tracking, factory activity, and supply chain disruptions',
      },
      {
        id: 'esg_sentiment',
        name: 'ESG News Sentiment',
        type: 'text',
        updateFrequency: 'hourly',
        latency: '1 hour',
        coverage: 'global',
        accuracy: 0.88,
        description:
          'Environmental, social, and governance sentiment analysis from news and reports',
      },
    ];

    sources.forEach(source => {
      this.dataSources.set(source.id, source);
    });
  }

  private async startDataCollection() {
    // Start collecting alternative data
    this.collectSatelliteData();
    this.collectCreditCardData();
    this.collectWebTrafficData();
    this.collectSocialSentimentData();
    this.collectMobileAppData();
    this.collectGeolocationData();
  }

  private async collectSatelliteData() {
    // Simulate satellite data collection
    setInterval(() => {
      const retailers = ['WMT', 'TGT', 'COST', 'HD', 'LOW'];
      const oilCompanies = ['XOM', 'CVX', 'BP', 'RDS.A', 'TOT'];
      const agricultureCompanies = ['DE', 'ADM', 'CTVA', 'NTR', 'CF'];

      // Retail parking lot data
      retailers.forEach(symbol => {
        const parkingLotData = {
          symbol,
          timestamp: new Date(),
          parkingLotOccupancy: 0.4 + Math.random() * 0.5, // 40-90%
          weekOverWeekChange: (Math.random() - 0.5) * 0.2, // -10% to +10%
          yearOverYearChange: (Math.random() - 0.3) * 0.3, // -9% to +21%
          confidence: 0.85 + Math.random() * 0.1,
          locations: Math.floor(Math.random() * 50) + 50, // 50-100 locations
          anomalies: Math.random() > 0.8,
        };

        this.satelliteImagery.set(`parking_${symbol}_${Date.now()}`, parkingLotData);
      });

      // Oil storage data
      oilCompanies.forEach(symbol => {
        const oilStorageData = {
          symbol,
          timestamp: new Date(),
          storageCapacity: 0.6 + Math.random() * 0.3, // 60-90%
          weekOverWeekChange: (Math.random() - 0.5) * 0.15, // -7.5% to +7.5%
          yearOverYearChange: (Math.random() - 0.4) * 0.4, // -16% to +24%
          confidence: 0.9 + Math.random() * 0.08,
          facilities: Math.floor(Math.random() * 20) + 10, // 10-30 facilities
          anomalies: Math.random() > 0.85,
        };

        this.satelliteImagery.set(`oil_${symbol}_${Date.now()}`, oilStorageData);
      });

      // Agricultural yield data
      agricultureCompanies.forEach(symbol => {
        const agriculturalData = {
          symbol,
          timestamp: new Date(),
          cropHealth: 0.7 + Math.random() * 0.25, // 70-95%
          estimatedYield: 0.8 + Math.random() * 0.3, // 80-110%
          weekOverWeekChange: (Math.random() - 0.5) * 0.1, // -5% to +5%
          yearOverYearChange: (Math.random() - 0.3) * 0.25, // -7.5% to +17.5%
          confidence: 0.87 + Math.random() * 0.1,
          acreage: Math.floor(Math.random() * 1000000) + 500000, // 500K-1.5M acres
          anomalies: Math.random() > 0.82,
        };

        this.satelliteImagery.set(`agriculture_${symbol}_${Date.now()}`, agriculturalData);
      });
    }, 86400000 / 100); // Daily data compressed to every ~15 minutes for simulation
  }

  private async collectCreditCardData() {
    // Simulate credit card transaction data collection
    setInterval(() => {
      const retailers = ['AMZN', 'WMT', 'TGT', 'COST', 'HD', 'LOW', 'BBY', 'DG', 'DLTR'];
      const restaurants = ['MCD', 'SBUX', 'YUM', 'QSR', 'DPZ', 'CMG', 'DRI'];
      const travel = ['MAR', 'HLT', 'BKNG', 'EXPE', 'DAL', 'UAL', 'AAL', 'CCL', 'RCL'];

      // Retail transaction data
      retailers.forEach(symbol => {
        const transactionData = {
          symbol,
          timestamp: new Date(),
          transactionVolume: 1000000 + Math.random() * 5000000,
          averageTicket: 50 + Math.random() * 200,
          weekOverWeekChange: (Math.random() - 0.4) * 0.2, // -8% to +12%
          yearOverYearChange: (Math.random() - 0.3) * 0.3, // -9% to +21%
          customerCount: 100000 + Math.random() * 500000,
          newCustomerPercent: 0.1 + Math.random() * 0.2,
          repeatCustomerPercent: 0.5 + Math.random() * 0.4,
        };

        this.creditCardData.set(`retail_${symbol}_${Date.now()}`, transactionData);
      });

      // Restaurant transaction data
      restaurants.forEach(symbol => {
        const transactionData = {
          symbol,
          timestamp: new Date(),
          transactionVolume: 500000 + Math.random() * 2000000,
          averageTicket: 15 + Math.random() * 50,
          weekOverWeekChange: (Math.random() - 0.4) * 0.25, // -10% to +15%
          yearOverYearChange: (Math.random() - 0.3) * 0.35, // -10.5% to +24.5%
          customerCount: 50000 + Math.random() * 200000,
          newCustomerPercent: 0.15 + Math.random() * 0.25,
          repeatCustomerPercent: 0.4 + Math.random() * 0.4,
        };

        this.creditCardData.set(`restaurant_${symbol}_${Date.now()}`, transactionData);
      });

      // Travel transaction data
      travel.forEach(symbol => {
        const transactionData = {
          symbol,
          timestamp: new Date(),
          transactionVolume: 2000000 + Math.random() * 8000000,
          averageTicket: 200 + Math.random() * 1000,
          weekOverWeekChange: (Math.random() - 0.4) * 0.3, // -12% to +18%
          yearOverYearChange: (Math.random() - 0.3) * 0.4, // -12% to +28%
          customerCount: 20000 + Math.random() * 100000,
          newCustomerPercent: 0.2 + Math.random() * 0.3,
          repeatCustomerPercent: 0.3 + Math.random() * 0.3,
        };

        this.creditCardData.set(`travel_${symbol}_${Date.now()}`, transactionData);
      });
    }, 86400000 / 100); // Daily data compressed to every ~15 minutes for simulation
  }

  private async collectWebTrafficData() {
    // Simulate web traffic data collection
    setInterval(() => {
      const ecommerce = ['AMZN', 'EBAY', 'ETSY', 'W', 'CHWY', 'BABA'];
      const media = ['NFLX', 'DIS', 'CMCSA', 'PARA', 'SPOT', 'ROKU'];
      const finance = ['JPM', 'BAC', 'C', 'WFC', 'MS', 'GS', 'V', 'MA', 'PYPL', 'SQ'];

      // Ecommerce web traffic
      ecommerce.forEach(symbol => {
        const trafficData = {
          symbol,
          timestamp: new Date(),
          visitors: 1000000 + Math.random() * 10000000,
          pageviews: 5000000 + Math.random() * 50000000,
          bounceRate: 0.2 + Math.random() * 0.4,
          averageSessionDuration: 120 + Math.random() * 300,
          conversionRate: 0.01 + Math.random() * 0.05,
          weekOverWeekChange: (Math.random() - 0.4) * 0.25, // -10% to +15%
          yearOverYearChange: (Math.random() - 0.3) * 0.4, // -12% to +28%
          mobilePercent: 0.5 + Math.random() * 0.3,
          newVisitorPercent: 0.3 + Math.random() * 0.4,
        };

        this.webTrafficData.set(`ecommerce_${symbol}_${Date.now()}`, trafficData);
      });

      // Media web traffic
      media.forEach(symbol => {
        const trafficData = {
          symbol,
          timestamp: new Date(),
          visitors: 2000000 + Math.random() * 20000000,
          pageviews: 10000000 + Math.random() * 100000000,
          bounceRate: 0.3 + Math.random() * 0.3,
          averageSessionDuration: 300 + Math.random() * 600,
          conversionRate: 0.005 + Math.random() * 0.02,
          weekOverWeekChange: (Math.random() - 0.4) * 0.2, // -8% to +12%
          yearOverYearChange: (Math.random() - 0.3) * 0.35, // -10.5% to +24.5%
          mobilePercent: 0.4 + Math.random() * 0.4,
          newVisitorPercent: 0.25 + Math.random() * 0.35,
        };

        this.webTrafficData.set(`media_${symbol}_${Date.now()}`, trafficData);
      });

      // Finance web traffic
      finance.forEach(symbol => {
        const trafficData = {
          symbol,
          timestamp: new Date(),
          visitors: 500000 + Math.random() * 5000000,
          pageviews: 2000000 + Math.random() * 20000000,
          bounceRate: 0.25 + Math.random() * 0.25,
          averageSessionDuration: 180 + Math.random() * 420,
          conversionRate: 0.008 + Math.random() * 0.03,
          weekOverWeekChange: (Math.random() - 0.4) * 0.15, // -6% to +9%
          yearOverYearChange: (Math.random() - 0.3) * 0.25, // -7.5% to +17.5%
          mobilePercent: 0.35 + Math.random() * 0.35,
          newVisitorPercent: 0.2 + Math.random() * 0.3,
        };

        this.webTrafficData.set(`finance_${symbol}_${Date.now()}`, trafficData);
      });
    }, 3600000 / 100); // Hourly data compressed to every ~36 seconds for simulation
  }

  private async collectSocialSentimentData() {
    // Simulate social sentiment data collection
    setInterval(() => {
      const tech = ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN', 'TSLA', 'NVDA', 'AMD', 'INTC'];
      const memeStocks = ['GME', 'AMC', 'BB', 'BBBY', 'NOK', 'PLTR', 'WISH', 'CLOV'];
      const crypto = ['BTC', 'ETH', 'SOL', 'ADA', 'XRP', 'DOGE', 'SHIB', 'DOT', 'AVAX'];

      // Tech sentiment
      tech.forEach(symbol => {
        const sentimentData = {
          symbol,
          timestamp: new Date(),
          overallSentiment: 0.5 + (Math.random() - 0.5) * 0.8, // -0.3 to +0.9
          sentimentVolume: 10000 + Math.random() * 100000,
          bullishPercent: 0.4 + Math.random() * 0.5,
          bearishPercent: 0.1 + Math.random() * 0.4,
          neutralPercent: 0.1 + Math.random() * 0.2,
          weekOverWeekChange: (Math.random() - 0.5) * 0.4, // -20% to +20%
          influencerSentiment: 0.3 + Math.random() * 0.6,
          sentimentMomentum: (Math.random() - 0.5) * 0.3, // -0.15 to +0.15
          platforms: {
            twitter: 0.4 + (Math.random() - 0.5) * 0.8,
            reddit: 0.3 + (Math.random() - 0.5) * 0.8,
            stocktwits: 0.5 + (Math.random() - 0.5) * 0.8,
            discord: 0.2 + (Math.random() - 0.5) * 0.8,
          },
        };

        this.socialSentimentData.set(`tech_${symbol}_${Date.now()}`, sentimentData);
      });

      // Meme stock sentiment
      memeStocks.forEach(symbol => {
        const sentimentData = {
          symbol,
          timestamp: new Date(),
          overallSentiment: 0.6 + (Math.random() - 0.5) * 1.0, // -0.4 to +1.0
          sentimentVolume: 50000 + Math.random() * 500000,
          bullishPercent: 0.5 + Math.random() * 0.4,
          bearishPercent: 0.2 + Math.random() * 0.3,
          neutralPercent: 0.05 + Math.random() * 0.15,
          weekOverWeekChange: (Math.random() - 0.4) * 0.8, // -32% to +48%
          influencerSentiment: 0.4 + Math.random() * 0.6,
          sentimentMomentum: (Math.random() - 0.4) * 0.5, // -0.2 to +0.3
          platforms: {
            twitter: 0.5 + (Math.random() - 0.5) * 0.9,
            reddit: 0.7 + (Math.random() - 0.5) * 0.6,
            stocktwits: 0.6 + (Math.random() - 0.5) * 0.8,
            discord: 0.8 + (Math.random() - 0.5) * 0.4,
          },
        };

        this.socialSentimentData.set(`meme_${symbol}_${Date.now()}`, sentimentData);
      });

      // Crypto sentiment
      crypto.forEach(symbol => {
        const sentimentData = {
          symbol,
          timestamp: new Date(),
          overallSentiment: 0.55 + (Math.random() - 0.5) * 0.9, // -0.35 to +0.95
          sentimentVolume: 30000 + Math.random() * 300000,
          bullishPercent: 0.45 + Math.random() * 0.45,
          bearishPercent: 0.15 + Math.random() * 0.35,
          neutralPercent: 0.1 + Math.random() * 0.2,
          weekOverWeekChange: (Math.random() - 0.45) * 0.7, // -31.5% to +38.5%
          influencerSentiment: 0.5 + Math.random() * 0.5,
          sentimentMomentum: (Math.random() - 0.45) * 0.4, // -0.18 to +0.22
          platforms: {
            twitter: 0.6 + (Math.random() - 0.5) * 0.8,
            reddit: 0.5 + (Math.random() - 0.5) * 0.8,
            discord: 0.7 + (Math.random() - 0.5) * 0.6,
            telegram: 0.8 + (Math.random() - 0.5) * 0.4,
          },
        };

        this.socialSentimentData.set(`crypto_${symbol}_${Date.now()}`, sentimentData);
      });
    }, 300000 / 100); // 5-minute data compressed to every 3 seconds for simulation
  }

  private async collectMobileAppData() {
    // Simulate mobile app usage data collection
    setInterval(() => {
      const social = ['META', 'SNAP', 'PINS', 'TWTR', 'MTCH'];
      const gaming = ['ATVI', 'EA', 'TTWO', 'RBLX', 'U'];
      const finance = ['SQ', 'PYPL', 'COIN', 'HOOD', 'SOFI'];

      // Social app usage
      social.forEach(symbol => {
        const appData = {
          symbol,
          timestamp: new Date(),
          dailyActiveUsers: 1000000 + Math.random() * 50000000,
          monthlyActiveUsers: 5000000 + Math.random() * 200000000,
          averageSessionTime: 10 + Math.random() * 30, // minutes
          sessionsPerUser: 3 + Math.random() * 12,
          retentionRate: 0.4 + Math.random() * 0.5,
          weekOverWeekGrowth: (Math.random() - 0.4) * 0.1, // -4% to +6%
          yearOverYearGrowth: (Math.random() - 0.3) * 0.3, // -9% to +21%
          downloads: 100000 + Math.random() * 1000000,
          uninstalls: 50000 + Math.random() * 500000,
          inAppPurchaseRevenue: 500000 + Math.random() * 5000000,
        };

        this.mobileAppData.set(`social_${symbol}_${Date.now()}`, appData);
      });

      // Gaming app usage
      gaming.forEach(symbol => {
        const appData = {
          symbol,
          timestamp: new Date(),
          dailyActiveUsers: 500000 + Math.random() * 10000000,
          monthlyActiveUsers: 2000000 + Math.random() * 50000000,
          averageSessionTime: 20 + Math.random() * 40, // minutes
          sessionsPerUser: 2 + Math.random() * 8,
          retentionRate: 0.3 + Math.random() * 0.4,
          weekOverWeekGrowth: (Math.random() - 0.4) * 0.15, // -6% to +9%
          yearOverYearGrowth: (Math.random() - 0.3) * 0.4, // -12% to +28%
          downloads: 50000 + Math.random() * 500000,
          uninstalls: 25000 + Math.random() * 250000,
          inAppPurchaseRevenue: 1000000 + Math.random() * 10000000,
        };

        this.mobileAppData.set(`gaming_${symbol}_${Date.now()}`, appData);
      });

      // Finance app usage
      finance.forEach(symbol => {
        const appData = {
          symbol,
          timestamp: new Date(),
          dailyActiveUsers: 200000 + Math.random() * 5000000,
          monthlyActiveUsers: 1000000 + Math.random() * 20000000,
          averageSessionTime: 5 + Math.random() * 15, // minutes
          sessionsPerUser: 1 + Math.random() * 5,
          retentionRate: 0.5 + Math.random() * 0.4,
          weekOverWeekGrowth: (Math.random() - 0.4) * 0.12, // -4.8% to +7.2%
          yearOverYearGrowth: (Math.random() - 0.3) * 0.5, // -15% to +35%
          downloads: 20000 + Math.random() * 200000,
          uninstalls: 10000 + Math.random() * 100000,
          transactionVolume: 10000000 + Math.random() * 100000000,
        };

        this.mobileAppData.set(`finance_${symbol}_${Date.now()}`, appData);
      });
    }, 86400000 / 100); // Daily data compressed to every ~15 minutes for simulation
  }

  private async collectGeolocationData() {
    // Simulate geolocation data collection
    setInterval(() => {
      const retail = ['WMT', 'TGT', 'COST', 'HD', 'LOW', 'BBY', 'DG', 'DLTR'];
      const restaurants = ['MCD', 'SBUX', 'YUM', 'QSR', 'DPZ', 'CMG', 'DRI'];
      const hotels = ['MAR', 'HLT', 'H', 'WH', 'CHH'];

      // Retail foot traffic
      retail.forEach(symbol => {
        const geoData = {
          symbol,
          timestamp: new Date(),
          footTraffic: 10000 + Math.random() * 100000,
          averageDuration: 15 + Math.random() * 45, // minutes
          weekOverWeekChange: (Math.random() - 0.4) * 0.2, // -8% to +12%
          yearOverYearChange: (Math.random() - 0.3) * 0.3, // -9% to +21%
          peakHours: {
            morning: 0.2 + Math.random() * 0.3,
            afternoon: 0.4 + Math.random() * 0.4,
            evening: 0.3 + Math.random() * 0.4,
          },
          competitorVisitation: 0.1 + Math.random() * 0.2, // % who also visited competitors
          newVisitorPercent: 0.2 + Math.random() * 0.3,
          repeatVisitorPercent: 0.5 + Math.random() * 0.3,
        };

        this.geolocationData.set(`retail_${symbol}_${Date.now()}`, geoData);
      });

      // Restaurant foot traffic
      restaurants.forEach(symbol => {
        const geoData = {
          symbol,
          timestamp: new Date(),
          footTraffic: 5000 + Math.random() * 50000,
          averageDuration: 30 + Math.random() * 60, // minutes
          weekOverWeekChange: (Math.random() - 0.4) * 0.25, // -10% to +15%
          yearOverYearChange: (Math.random() - 0.3) * 0.35, // -10.5% to +24.5%
          peakHours: {
            morning: 0.1 + Math.random() * 0.2,
            lunch: 0.4 + Math.random() * 0.3,
            dinner: 0.5 + Math.random() * 0.3,
          },
          competitorVisitation: 0.15 + Math.random() * 0.25, // % who also visited competitors
          newVisitorPercent: 0.25 + Math.random() * 0.35,
          repeatVisitorPercent: 0.4 + Math.random() * 0.4,
        };

        this.geolocationData.set(`restaurant_${symbol}_${Date.now()}`, geoData);
      });

      // Hotel foot traffic
      hotels.forEach(symbol => {
        const geoData = {
          symbol,
          timestamp: new Date(),
          footTraffic: 1000 + Math.random() * 10000,
          averageDuration: 1000 + Math.random() * 2000, // minutes (multi-day stays)
          weekOverWeekChange: (Math.random() - 0.4) * 0.3, // -12% to +18%
          yearOverYearChange: (Math.random() - 0.3) * 0.4, // -12% to +28%
          occupancyEstimate: 0.5 + Math.random() * 0.4,
          localVsTravel: {
            local: 0.2 + Math.random() * 0.3,
            domestic: 0.5 + Math.random() * 0.3,
            international: 0.1 + Math.random() * 0.2,
          },
          competitorVisitation: 0.05 + Math.random() * 0.15, // % who also visited competitors
          newVisitorPercent: 0.6 + Math.random() * 0.3,
          repeatVisitorPercent: 0.1 + Math.random() * 0.3,
        };

        this.geolocationData.set(`hotel_${symbol}_${Date.now()}`, geoData);
      });
    }, 3600000 / 100); // Hourly data compressed to every ~36 seconds for simulation
  }

  async getSatelliteData(symbol: string, dataType = 'all'): Promise<any> {
    // Get satellite data for a specific symbol
    const results = [];

    for (const [key, value] of this.satelliteImagery.entries()) {
      if (key.includes(symbol) && (dataType === 'all' || key.includes(dataType))) {
        results.push(value);
      }
    }

    // Sort by timestamp (newest first)
    results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return results.slice(0, 10); // Return the 10 most recent entries
  }

  async getCreditCardData(symbol: string, dataType = 'all'): Promise<any> {
    // Get credit card data for a specific symbol
    const results = [];

    for (const [key, value] of this.creditCardData.entries()) {
      if (key.includes(symbol) && (dataType === 'all' || key.includes(dataType))) {
        results.push(value);
      }
    }

    // Sort by timestamp (newest first)
    results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return results.slice(0, 10); // Return the 10 most recent entries
  }

  async getWebTrafficData(symbol: string, dataType = 'all'): Promise<any> {
    // Get web traffic data for a specific symbol
    const results = [];

    for (const [key, value] of this.webTrafficData.entries()) {
      if (key.includes(symbol) && (dataType === 'all' || key.includes(dataType))) {
        results.push(value);
      }
    }

    // Sort by timestamp (newest first)
    results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return results.slice(0, 10); // Return the 10 most recent entries
  }

  async getSocialSentimentData(symbol: string, dataType = 'all'): Promise<any> {
    // Get social sentiment data for a specific symbol
    const results = [];

    for (const [key, value] of this.socialSentimentData.entries()) {
      if (key.includes(symbol) && (dataType === 'all' || key.includes(dataType))) {
        results.push(value);
      }
    }

    // Sort by timestamp (newest first)
    results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return results.slice(0, 10); // Return the 10 most recent entries
  }

  async getMobileAppData(symbol: string, dataType = 'all'): Promise<any> {
    // Get mobile app data for a specific symbol
    const results = [];

    for (const [key, value] of this.mobileAppData.entries()) {
      if (key.includes(symbol) && (dataType === 'all' || key.includes(dataType))) {
        results.push(value);
      }
    }

    // Sort by timestamp (newest first)
    results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return results.slice(0, 10); // Return the 10 most recent entries
  }

  async getGeolocationData(symbol: string, dataType = 'all'): Promise<any> {
    // Get geolocation data for a specific symbol
    const results = [];

    for (const [key, value] of this.geolocationData.entries()) {
      if (key.includes(symbol) && (dataType === 'all' || key.includes(dataType))) {
        results.push(value);
      }
    }

    // Sort by timestamp (newest first)
    results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return results.slice(0, 10); // Return the 10 most recent entries
  }

  async getComprehensiveAlternativeData(symbol: string): Promise<any> {
    // Get all alternative data for a specific symbol
    const [satellite, creditCard, webTraffic, socialSentiment, mobileApp, geolocation] =
      await Promise.all([
        this.getSatelliteData(symbol),
        this.getCreditCardData(symbol),
        this.getWebTrafficData(symbol),
        this.getSocialSentimentData(symbol),
        this.getMobileAppData(symbol),
        this.getGeolocationData(symbol),
      ]);

    return {
      symbol,
      timestamp: new Date(),
      satellite: satellite.length > 0 ? satellite[0] : null,
      creditCard: creditCard.length > 0 ? creditCard[0] : null,
      webTraffic: webTraffic.length > 0 ? webTraffic[0] : null,
      socialSentiment: socialSentiment.length > 0 ? socialSentiment[0] : null,
      mobileApp: mobileApp.length > 0 ? mobileApp[0] : null,
      geolocation: geolocation.length > 0 ? geolocation[0] : null,
      alternativeSignal: this.calculateAlternativeSignal(
        satellite[0],
        creditCard[0],
        webTraffic[0],
        socialSentiment[0],
        mobileApp[0],
        geolocation[0]
      ),
    };
  }

  private calculateAlternativeSignal(
    satellite: SatelliteData | null,
    creditCard: CreditCardData | null,
    webTraffic: WebTrafficData | null,
    socialSentiment: SocialSentimentData | null,
    mobileApp: MobileAppData | null,
    geolocation: GeolocationData | null
  ): any {
    // Calculate a combined signal from all alternative data sources
    let bullishFactors = 0;
    let bearishFactors = 0;
    let totalFactors = 0;
    let confidence = 0.5;

    // Satellite data
    if (satellite) {
      totalFactors++;
      if (satellite.yearOverYearChange > 0.05) bullishFactors++;
      if (satellite.yearOverYearChange < -0.05) bearishFactors++;
      confidence += satellite.confidence * 0.1;
    }

    // Credit card data
    if (creditCard) {
      totalFactors++;
      if (creditCard.yearOverYearChange > 0.05) bullishFactors++;
      if (creditCard.yearOverYearChange < -0.05) bearishFactors++;
      confidence += 0.05;
    }

    // Web traffic data
    if (webTraffic) {
      totalFactors++;
      if (webTraffic.yearOverYearChange > 0.1) bullishFactors++;
      if (webTraffic.yearOverYearChange < -0.1) bearishFactors++;
      confidence += 0.05;
    }

    // Social sentiment data
    if (socialSentiment) {
      totalFactors++;
      if (socialSentiment.overallSentiment > 0.6) bullishFactors++;
      if (socialSentiment.overallSentiment < 0.4) bearishFactors++;
      confidence += 0.1;
    }

    // Mobile app data
    if (mobileApp) {
      totalFactors++;
      if (mobileApp.yearOverYearGrowth > 0.1) bullishFactors++;
      if (mobileApp.yearOverYearGrowth < -0.1) bearishFactors++;
      confidence += 0.05;
    }

    // Geolocation data
    if (geolocation) {
      totalFactors++;
      if (geolocation.yearOverYearChange > 0.05) bullishFactors++;
      if (geolocation.yearOverYearChange < -0.05) bearishFactors++;
      confidence += 0.05;
    }

    // Calculate signal
    let signal = 0;
    if (totalFactors > 0) {
      signal = (bullishFactors - bearishFactors) / totalFactors;
    }

    // Normalize confidence
    confidence = Math.min(confidence, 1.0);

    return {
      signal,
      direction: signal > 0.2 ? 'BULLISH' : signal < -0.2 ? 'BEARISH' : 'NEUTRAL',
      strength: Math.abs(signal),
      confidence,
      bullishFactors,
      bearishFactors,
      totalFactors,
    };
  }

  getDataSources(): Record<string, unknown>[] {
    return Array.from(this.dataSources.values());
  }

  getDataSourceById(id: string): any {
    return this.dataSources.get(id);
  }
}

export const alternativeDataService = AlternativeDataService.getInstance();
