// Comprehensive Trading Education Service - Series 6 & 7 Test Prep
export class TradingEducationService {
  private static instance: TradingEducationService;
  private educationalContent: Map<string, any> = new Map();
  private testQuestions: Map<string, any> = new Map();
  private userProgress: Map<string, any> = new Map();

  static getInstance(): TradingEducationService {
    if (!TradingEducationService.instance) {
      TradingEducationService.instance = new TradingEducationService();
    }
    return TradingEducationService.instance;
  }

  async initialize() {
    this.loadSeries6Content();
    this.loadSeries7Content();
    this.loadAdvancedTradingConcepts();
    this.loadMarketAnalysisEducation();
    this.loadRiskManagementEducation();
    this.loadTestQuestions();
  }

  private loadSeries6Content() {
    const series6Content = {
      investment_company_products: {
        title: 'Investment Company Products',
        sections: {
          mutual_funds: {
            title: 'Mutual Funds',
            content: `
              Mutual funds are investment vehicles that pool money from many investors to purchase securities.
              
              Key Characteristics:
              • Professional management
              • Diversification
              • Liquidity (daily redemption)
              • Regulated by Investment Company Act of 1940
              
              Types of Mutual Funds:
              • Open-end funds (most common)
              • Closed-end funds
              • Unit Investment Trusts (UITs)
              
              Share Classes:
              • Class A: Front-end load
              • Class B: Back-end load (CDSC)
              • Class C: Level load
              • Class I: Institutional shares
            `,
            examples: [
              {
                scenario: 'Client wants to invest $10,000 in a diversified portfolio',
                solution: 'Recommend a balanced mutual fund with low expense ratio',
                reasoning: 'Provides instant diversification and professional management',
              },
            ],
          },
          variable_annuities: {
            title: 'Variable Annuities',
            content: `
              Variable annuities combine insurance and investment features.
              
              Key Features:
              • Tax-deferred growth
              • Death benefit
              • Annuitization options
              • Investment risk borne by contract holder
              
              Phases:
              • Accumulation phase: Premium payments and growth
              • Annuity phase: Income payments
              
              Charges:
              • Mortality and expense risk charge (M&E)
              • Administrative fees
              • Investment management fees
              • Surrender charges
            `,
            examples: [
              {
                scenario: 'Retirement planning for high-income earner',
                solution: 'Variable annuity after maxing out 401(k) and IRA',
                reasoning: 'Tax-deferred growth and guaranteed death benefit',
              },
            ],
          },
        },
      },
      securities_regulations: {
        title: 'Securities Regulations',
        sections: {
          investment_company_act_1940: {
            title: 'Investment Company Act of 1940',
            content: `
              Regulates investment companies and their operations.
              
              Key Provisions:
              • Registration requirements
              • Board composition (40% independent directors)
              • Custody of assets
              • Pricing of shares (NAV calculation)
              • Prohibited transactions
              
              Types of Investment Companies:
              • Face-amount certificate companies
              • Unit investment trusts
              • Management companies (open-end and closed-end)
            `,
          },
          investment_advisers_act_1940: {
            title: 'Investment Advisers Act of 1940',
            content: `
              Regulates investment advisers and their fiduciary duties.
              
              Key Requirements:
              • Registration with SEC or state
              • Fiduciary duty to clients
              • Form ADV disclosure
              • Custody rules
              • Code of ethics
              
              Exemptions:
              • Banks and bank holding companies
              • Lawyers, accountants, engineers, teachers (incidental advice)
              • Publishers of general circulation
            `,
          },
        },
      },
    };

    this.educationalContent.set('series_6', series6Content);
  }

  private loadSeries7Content() {
    const series7Content = {
      equity_securities: {
        title: 'Equity Securities',
        sections: {
          common_stock: {
            title: 'Common Stock',
            content: `
              Common stock represents ownership in a corporation.
              
              Rights of Common Stockholders:
              • Voting rights (usually one vote per share)
              • Right to receive dividends (if declared)
              • Preemptive rights (in some cases)
              • Right to inspect corporate books
              • Limited liability
              
              Types of Common Stock:
              • Growth stocks: Companies expected to grow faster than market
              • Value stocks: Trading below intrinsic value
              • Income stocks: High dividend yield
              • Blue chip stocks: Large, established companies
              • Penny stocks: Trading under $5 per share
              
              Valuation Methods:
              • Price-to-Earnings (P/E) ratio
              • Price-to-Book (P/B) ratio
              • Dividend Discount Model (DDM)
              • Discounted Cash Flow (DCF)
            `,
            examples: [
              {
                scenario: 'Client seeks long-term growth',
                solution: 'Recommend growth stocks in technology sector',
                reasoning: 'Higher potential returns over long time horizon',
              },
            ],
          },
          preferred_stock: {
            title: 'Preferred Stock',
            content: `
              Preferred stock has characteristics of both stocks and bonds.
              
              Features:
              • Fixed dividend rate
              • Priority over common stock for dividends and liquidation
              • Usually no voting rights
              • May be callable or convertible
              
              Types:
              • Cumulative: Unpaid dividends accumulate
              • Non-cumulative: Unpaid dividends are lost
              • Participating: Share in excess profits
              • Convertible: Can be converted to common stock
              • Adjustable rate: Dividend rate adjusts with interest rates
            `,
          },
        },
      },
      debt_securities: {
        title: 'Debt Securities',
        sections: {
          corporate_bonds: {
            title: 'Corporate Bonds',
            content: `
              Corporate bonds are debt obligations issued by corporations.
              
              Key Features:
              • Face value (par value): Usually $1,000
              • Coupon rate: Annual interest rate
              • Maturity date: When principal is repaid
              • Credit rating: Measures default risk
              
              Types:
              • Secured bonds: Backed by collateral
              • Unsecured bonds (debentures): Backed by full faith and credit
              • Subordinated debentures: Lower priority in bankruptcy
              • Convertible bonds: Can be converted to common stock
              • Zero-coupon bonds: Sold at discount, no periodic interest
              
              Risks:
              • Credit risk: Risk of default
              • Interest rate risk: Bond prices move inverse to rates
              • Inflation risk: Purchasing power erosion
              • Call risk: Early redemption by issuer
            `,
          },
          government_securities: {
            title: 'Government Securities',
            content: `
              Government securities are debt obligations of federal, state, and local governments.
              
              U.S. Treasury Securities:
              • Treasury Bills (T-Bills): Maturity ≤ 1 year
              • Treasury Notes (T-Notes): Maturity 2-10 years
              • Treasury Bonds (T-Bonds): Maturity > 10 years
              • Treasury Inflation-Protected Securities (TIPS)
              
              Municipal Bonds:
              • General Obligation (GO) bonds: Backed by taxing power
              • Revenue bonds: Backed by specific revenue source
              • Tax advantages: Interest often exempt from federal taxes
              
              Agency Securities:
              • Government National Mortgage Association (GNMA)
              • Federal National Mortgage Association (FNMA)
              • Federal Home Loan Mortgage Corporation (FHLMC)
            `,
          },
        },
      },
      options: {
        title: 'Options',
        sections: {
          basic_options: {
            title: 'Basic Options Concepts',
            content: `
              Options give the holder the right, but not obligation, to buy or sell an underlying asset.
              
              Types:
              • Call options: Right to buy
              • Put options: Right to sell
              
              Key Terms:
              • Strike price: Exercise price
              • Expiration date: When option expires
              • Premium: Cost of the option
              • Exercise: Using the option
              • Assignment: Being required to fulfill obligation
              
              Option Positions:
              • Long call: Bullish strategy
              • Short call: Bearish/neutral strategy
              • Long put: Bearish strategy
              • Short put: Bullish/neutral strategy
              
              Factors Affecting Option Prices:
              • Underlying stock price
              • Strike price
              • Time to expiration
              • Volatility
              • Interest rates
              • Dividends
            `,
          },
          option_strategies: {
            title: 'Option Strategies',
            content: `
              Basic Strategies:
              • Covered call: Long stock + short call
              • Protective put: Long stock + long put
              • Cash-secured put: Short put with cash collateral
              
              Spread Strategies:
              • Bull call spread: Long lower strike call + short higher strike call
              • Bear put spread: Long higher strike put + short lower strike put
              • Iron condor: Combination of bull put and bear call spreads
              
              Straddle/Strangle:
              • Long straddle: Long call and put at same strike
              • Long strangle: Long call and put at different strikes
              • Used when expecting high volatility
            `,
          },
        },
      },
    };

    this.educationalContent.set('series_7', series7Content);
  }

  private loadAdvancedTradingConcepts() {
    const advancedConcepts = {
      technical_analysis: {
        title: 'Technical Analysis',
        sections: {
          chart_patterns: {
            title: 'Chart Patterns',
            content: `
              Technical analysis uses price and volume data to predict future price movements.
              
              Trend Lines:
              • Support: Price level where buying interest emerges
              • Resistance: Price level where selling pressure emerges
              • Trend lines: Connect series of highs or lows
              
              Chart Patterns:
              • Head and Shoulders: Reversal pattern
              • Double Top/Bottom: Reversal patterns
              • Triangles: Continuation patterns
              • Flags and Pennants: Short-term continuation patterns
              • Cup and Handle: Bullish continuation pattern
              
              Volume Analysis:
              • Volume confirms price movements
              • High volume on breakouts indicates strength
              • Divergence between price and volume signals weakness
            `,
            examples: [
              {
                pattern: 'Head and Shoulders',
                description: 'Three peaks with middle peak highest',
                signal: 'Bearish reversal',
                target: 'Distance from head to neckline subtracted from neckline',
              },
            ],
          },
          technical_indicators: {
            title: 'Technical Indicators',
            content: `
              Moving Averages:
              • Simple Moving Average (SMA): Average price over period
              • Exponential Moving Average (EMA): Gives more weight to recent prices
              • Golden Cross: 50-day MA crosses above 200-day MA (bullish)
              • Death Cross: 50-day MA crosses below 200-day MA (bearish)
              
              Momentum Indicators:
              • Relative Strength Index (RSI): Measures overbought/oversold conditions
              • MACD: Moving Average Convergence Divergence
              • Stochastic Oscillator: Compares closing price to price range
              
              Volume Indicators:
              • On-Balance Volume (OBV): Cumulative volume indicator
              • Volume Rate of Change: Measures volume momentum
              • Accumulation/Distribution Line: Volume-price indicator
              
              Volatility Indicators:
              • Bollinger Bands: Price channels based on standard deviation
              • Average True Range (ATR): Measures volatility
              • VIX: Market volatility index
            `,
          },
        },
      },
      fundamental_analysis: {
        title: 'Fundamental Analysis',
        sections: {
          financial_ratios: {
            title: 'Financial Ratios',
            content: `
              Profitability Ratios:
              • Return on Equity (ROE): Net Income / Shareholders' Equity
              • Return on Assets (ROA): Net Income / Total Assets
              • Gross Profit Margin: Gross Profit / Revenue
              • Net Profit Margin: Net Income / Revenue
              
              Liquidity Ratios:
              • Current Ratio: Current Assets / Current Liabilities
              • Quick Ratio: (Current Assets - Inventory) / Current Liabilities
              • Cash Ratio: Cash / Current Liabilities
              
              Leverage Ratios:
              • Debt-to-Equity: Total Debt / Total Equity
              • Interest Coverage: EBIT / Interest Expense
              • Debt Service Coverage: Operating Income / Total Debt Service
              
              Valuation Ratios:
              • Price-to-Earnings (P/E): Stock Price / Earnings per Share
              • Price-to-Book (P/B): Stock Price / Book Value per Share
              • Price-to-Sales (P/S): Market Cap / Revenue
              • Enterprise Value/EBITDA: EV / EBITDA
            `,
          },
          economic_indicators: {
            title: 'Economic Indicators',
            content: `
              Leading Indicators:
              • Stock market performance
              • Building permits
              • Consumer confidence
              • Yield curve
              • Money supply (M2)
              
              Coincident Indicators:
              • Gross Domestic Product (GDP)
              • Employment levels
              • Industrial production
              • Personal income
              
              Lagging Indicators:
              • Unemployment rate
              • Consumer Price Index (CPI)
              • Interest rates
              • Corporate profits
              
              Federal Reserve Policy:
              • Federal Funds Rate: Rate banks charge each other
              • Discount Rate: Rate Fed charges banks
              • Reserve Requirements: Cash banks must hold
              • Open Market Operations: Buying/selling government securities
            `,
          },
        },
      },
    };

    this.educationalContent.set('advanced_concepts', advancedConcepts);
  }

  private loadMarketAnalysisEducation() {
    const marketAnalysis = {
      market_cycles: {
        title: 'Market Cycles and Sentiment',
        content: `
          Bull Markets:
          • Sustained upward price movement (typically 20%+ gain from recent low)
          • Characterized by optimism and investor confidence
          • Often coincide with economic growth and low unemployment
          • Average duration: 2-7 years
          • Investor behavior: Increased buying, risk-taking
          
          Bear Markets:
          • Sustained downward price movement (typically 20%+ decline from recent high)
          • Characterized by pessimism and fear
          • Often coincide with economic recessions
          • Average duration: 6 months to 2 years
          • Investor behavior: Selling, flight to safety
          
          Market Phases:
          1. Accumulation: Smart money buying
          2. Public participation: Trend becomes obvious
          3. Distribution: Smart money selling
          4. Decline: Public realizes trend has changed
          
          Sentiment Indicators:
          • VIX (Fear Index): High VIX = high fear
          • Put/Call Ratio: High ratio = bearish sentiment
          • Insider Trading: Insider buying = bullish
          • Margin Debt: High margin = excessive optimism
        `,
      },
      sector_analysis: {
        title: 'Sector Analysis',
        content: `
          Economic Sectors:
          • Technology: Growth-oriented, high volatility
          • Healthcare: Defensive, steady growth
          • Financial: Interest rate sensitive
          • Energy: Commodity price dependent
          • Consumer Discretionary: Economic cycle sensitive
          • Consumer Staples: Defensive, stable
          • Utilities: Interest rate sensitive, defensive
          • Materials: Commodity and economic cycle dependent
          • Industrials: Economic cycle sensitive
          • Real Estate: Interest rate sensitive
          • Communication Services: Mixed characteristics
          
          Sector Rotation:
          • Early Recession: Utilities, Consumer Staples
          • Full Recession: Technology, Communication Services
          • Early Recovery: Industrials, Materials
          • Full Recovery: Energy, Financials
          • Early Expansion: Consumer Discretionary
          • Late Expansion: Healthcare, Consumer Staples
        `,
      },
    };

    this.educationalContent.set('market_analysis', marketAnalysis);
  }

  private loadRiskManagementEducation() {
    const riskManagement = {
      types_of_risk: {
        title: 'Types of Investment Risk',
        content: `
          Systematic Risk (Market Risk):
          • Cannot be diversified away
          • Affects entire market
          • Examples: Interest rate risk, inflation risk, political risk
          
          Unsystematic Risk (Specific Risk):
          • Can be reduced through diversification
          • Affects individual securities or sectors
          • Examples: Business risk, financial risk, management risk
          
          Specific Risk Types:
          • Credit Risk: Risk of default
          • Liquidity Risk: Difficulty selling investment
          • Reinvestment Risk: Risk of reinvesting at lower rates
          • Currency Risk: Exchange rate fluctuations
          • Concentration Risk: Over-exposure to single investment
          • Operational Risk: Internal process failures
          
          Risk Measures:
          • Beta: Measures systematic risk relative to market
          • Standard Deviation: Measures total volatility
          • Sharpe Ratio: Risk-adjusted return measure
          • Value at Risk (VaR): Maximum expected loss
          • Maximum Drawdown: Largest peak-to-trough decline
        `,
      },
      portfolio_management: {
        title: 'Portfolio Management',
        content: `
          Modern Portfolio Theory:
          • Diversification reduces risk without reducing expected return
          • Efficient frontier: Optimal risk-return combinations
          • Capital Asset Pricing Model (CAPM): Expected return = Risk-free rate + Beta × Market risk premium
          
          Asset Allocation:
          • Strategic: Long-term target allocations
          • Tactical: Short-term adjustments based on market conditions
          • Dynamic: Continuous rebalancing
          
          Diversification Strategies:
          • Across asset classes (stocks, bonds, commodities)
          • Across sectors and industries
          • Across geographic regions
          • Across market capitalizations
          • Across investment styles (growth vs. value)
          
          Rebalancing:
          • Time-based: Quarterly, annually
          • Threshold-based: When allocation deviates by set percentage
          • Combination approach: Both time and threshold triggers
        `,
      },
    };

    this.educationalContent.set('risk_management', riskManagement);
  }

  private loadTestQuestions() {
    const series6Questions = [
      {
        id: 's6_q1',
        question: 'Which of the following is NOT a characteristic of mutual funds?',
        options: [
          'Professional management',
          'Daily liquidity',
          'Guaranteed returns',
          'Diversification',
        ],
        correct: 2,
        explanation:
          'Mutual funds do not guarantee returns. They offer professional management, daily liquidity, and diversification, but returns depend on market performance.',
      },
      {
        id: 's6_q2',
        question: 'A Class A mutual fund share typically has:',
        options: ['A back-end load', 'A front-end load', 'No sales charge', 'A level load'],
        correct: 1,
        explanation:
          'Class A shares typically have a front-end load (sales charge paid when purchasing shares).',
      },
    ];

    const series7Questions = [
      {
        id: 's7_q1',
        question:
          'If XYZ stock is trading at $50 and has a P/E ratio of 20, what are the earnings per share?',
        options: ['$1.00', '$2.50', '$4.00', '$10.00'],
        correct: 1,
        explanation: 'EPS = Stock Price / P/E Ratio = $50 / 20 = $2.50',
      },
      {
        id: 's7_q2',
        question:
          'Which option strategy would be most appropriate for an investor who is bullish on a stock but wants to generate income?',
        options: ['Buy a call', 'Buy a put', 'Sell a covered call', 'Sell a naked put'],
        correct: 2,
        explanation:
          'A covered call (owning stock and selling a call) generates income from the premium while maintaining upside potential to the strike price.',
      },
    ];

    this.testQuestions.set('series_6', series6Questions);
    this.testQuestions.set('series_7', series7Questions);
  }

  // Public API Methods
  getEducationalContent(series: string, topic?: string) {
    const content = this.educationalContent.get(series);
    if (topic && content) {
      return content[topic] || null;
    }
    return content;
  }

  getTestQuestions(series: string, count = 10) {
    const questions = this.testQuestions.get(series) || [];
    return questions.slice(0, count);
  }

  submitTestAnswer(userId: string, questionId: string, answer: number) {
    // Track user progress
    if (!this.userProgress.has(userId)) {
      this.userProgress.set(userId, { correct: 0, total: 0, questions: [] });
    }

    const progress = this.userProgress.get(userId);
    const question = this.findQuestionById(questionId);

    if (question) {
      const isCorrect = answer === question.correct;
      progress.total++;
      if (isCorrect) progress.correct++;

      progress.questions.push({
        questionId,
        answer,
        correct: isCorrect,
        timestamp: new Date(),
      });
    }

    return {
      correct: question?.correct === answer,
      explanation: question?.explanation,
      score: (progress.correct / progress.total) * 100,
    };
  }

  private findQuestionById(questionId: string) {
    for (const [series, questions] of this.testQuestions) {
      const question = questions.find(q => q.id === questionId);
      if (question) return question;
    }
    return null;
  }

  getUserProgress(userId: string) {
    return this.userProgress.get(userId) || { correct: 0, total: 0, questions: [] };
  }

  generateStudyPlan(userId: string, targetExam: string) {
    const progress = this.getUserProgress(userId);
    const weakAreas = this.identifyWeakAreas(progress, targetExam);

    return {
      targetExam,
      estimatedStudyTime: this.calculateStudyTime(progress, targetExam),
      weeklyPlan: this.createWeeklyPlan(weakAreas, targetExam),
      practiceTests: this.recommendPracticeTests(targetExam),
      keyTopics: this.getKeyTopics(targetExam),
    };
  }

  private identifyWeakAreas(progress: any, targetExam: string) {
    // Analyze incorrect answers to identify weak areas
    const weakAreas = [];

    if (progress.questions.length > 0) {
      const incorrectQuestions = progress.questions.filter(q => !q.correct);
      // Group by topic and identify patterns
      // This would be more sophisticated in a real implementation
    }

    return weakAreas;
  }

  private calculateStudyTime(progress: any, targetExam: string) {
    const baseHours = targetExam === 'series_7' ? 80 : 40;
    const currentScore = progress.total > 0 ? (progress.correct / progress.total) * 100 : 0;

    if (currentScore >= 80) return Math.max(baseHours * 0.5, 20);
    if (currentScore >= 60) return baseHours * 0.75;
    return baseHours;
  }

  private createWeeklyPlan(weakAreas: string[], targetExam: string) {
    // Create a structured weekly study plan
    return [
      { week: 1, topics: ['Securities Basics', 'Market Structure'], hours: 10 },
      { week: 2, topics: ['Equity Securities', 'Debt Securities'], hours: 12 },
      { week: 3, topics: ['Options', 'Investment Companies'], hours: 12 },
      { week: 4, topics: ['Regulations', 'Ethics'], hours: 10 },
      { week: 5, topics: ['Practice Tests', 'Review'], hours: 8 },
    ];
  }

  private recommendPracticeTests(targetExam: string) {
    return [
      { name: 'Diagnostic Test', questions: 50, timeLimit: 90 },
      { name: 'Mid-term Practice', questions: 100, timeLimit: 180 },
      { name: 'Final Practice', questions: 125, timeLimit: 225 },
      { name: 'Simulated Exam', questions: 125, timeLimit: 225 },
    ];
  }

  private getKeyTopics(targetExam: string) {
    const topics = {
      series_6: [
        'Investment Company Products (50%)',
        'Securities and Tax Regulations (25%)',
        'Customer Accounts and Prohibited Activities (25%)',
      ],
      series_7: [
        'Seeks Business for the Broker-Dealer (9%)',
        "Opens Accounts After Obtaining and Evaluating Customers' Financial Profile (11%)",
        'Provides Customers with Information About Investments (31%)',
        "Obtains and Verifies Customers' Purchase and Sales Instructions (16%)",
        'Processes Transactions (4%)',
        'Maintains Customer Accounts (29%)',
      ],
    };

    return topics[targetExam] || [];
  }
}

export const tradingEducationService = TradingEducationService.getInstance();
