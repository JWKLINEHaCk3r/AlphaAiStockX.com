// Comprehensive Trading Education Service - Series 6 & 7 Test Prep
export class TradingEducationService {
  private static instance: TradingEducationService;
  private educationalContent: Map<string, Record<string, any>> = new Map();
  private testQuestions: Map<string, any[]> = new Map();
  private userProgress: Map<string, any> = new Map();

  static getInstance(): TradingEducationService {
    if (!TradingEducationService.instance) {
      TradingEducationService.instance = new TradingEducationService();
    }
    return TradingEducationService.instance;
  }

  async initialize() {
    this.loadTestQuestions();
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
        explanation: 'Mutual funds do not guarantee returns.',
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
    ];

    this.testQuestions.set('series_6', series6Questions);
    this.testQuestions.set('series_7', series7Questions);
  }

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
    for (const [, questions] of this.testQuestions) {
      const question = questions.find((q: any) => q.id === questionId);
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

  private identifyWeakAreas(progress: any, _targetExam: string): string[] {
    const weakAreas: string[] = [];

    if (progress && progress.questions && progress.questions.length > 0) {
      const incorrectQuestions = progress.questions.filter((q: any) => !q.correct);
      if (incorrectQuestions.length > 0) {
        weakAreas.push('Review incorrect topics');
      }
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

  private createWeeklyPlan(_weakAreas: string[], _targetExam: string) {
    return [
      { week: 1, topics: ['Securities Basics', 'Market Structure'], hours: 10 },
      { week: 2, topics: ['Equity Securities', 'Debt Securities'], hours: 12 },
      { week: 3, topics: ['Options', 'Investment Companies'], hours: 12 },
      { week: 4, topics: ['Regulations', 'Ethics'], hours: 10 },
      { week: 5, topics: ['Practice Tests', 'Review'], hours: 8 },
    ];
  }

  private recommendPracticeTests(_targetExam: string) {
    return [
      { name: 'Diagnostic Test', questions: 50, timeLimit: 90 },
      { name: 'Mid-term Practice', questions: 100, timeLimit: 180 },
      { name: 'Final Practice', questions: 125, timeLimit: 225 },
      { name: 'Simulated Exam', questions: 125, timeLimit: 225 },
    ];
  }

  private getKeyTopics(targetExam: string): string[] {
    const topics: Record<string, string[]> = {
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
