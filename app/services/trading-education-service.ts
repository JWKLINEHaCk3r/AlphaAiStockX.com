// Comprehensive Trading Education Service - Series 6 & 7 Test Prep;
interface TestQuestion {















  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;















}

interface UserAnswer {















  questionId: string;
  answer: number;
  correct: boolean;
  timestamp: Date;















}

interface UserProgress {















  answers: UserAnswer[];
  score: number;















}

interface StudyPlan {















  targetExam: string;
  weakAreas: string[];
  recommendedStudyTime: number;
  weeklyPlan: WeeklyPlan[];
  practiceTests: PracticeTest[];















}

interface WeeklyPlan {















  week: number;
  topic: string;
  tasks: string[];















}

interface PracticeTest {















  name: string;
  difficulty: string;
  questions: number;















}

export class TradingEducationService {
  private static instance: TradingEducationService;
  private educationalContent: Map<string, Record<string, string>> = new Map();
  private testQuestions: Map<string, TestQuestion[]> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();

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
    const series6Questions: TestQuestion[] = [;
      {
        id: 's6_q1',;
        question: 'Which of the following is NOT a characteristic of mutual funds?',;
        options: [;
          'Professional management',;
          'Daily liquidity',;
          'Guaranteed returns',;
          'Diversification',;
        ],;
        correct: 2,;
        explanation: 'Mutual funds do not guarantee returns.',;
      },;
      {
        id: 's6_q2',;
        question: 'What is the maximum sales charge for a mutual fund Class A share?',;
        options: ['5.75%', '6.25%', '8.5%', '10%'],;
        correct: 2,;
        explanation: 'The maximum sales charge for Class A shares is 8.5%.',;
      },;
    ];

    const series7Questions: TestQuestion[] = [;
      {
        id: 's7_q1',;
        question:;
          'If XYZ stock is trading at $50 and has a P/E ratio of 20, what are the earnings per share?',;
        options: ['$1.00', '$2.50', '$4.00', '$10.00'],;
        correct: 1,;
        explanation: 'EPS = Stock Price / P/E Ratio = $50 / 20 = $2.50',;
      },;
      {
        id: 's7_q2',;
        question: 'Which of the following is true about margin requirements?',;
        options: [;
          'Initial margin requirement is 25%',;
          'Maintenance margin is 50%',;
          'Initial margin requirement is 50%',;
          'There are no margin requirements',;
        ],;
        correct: 2,;
        explanation: 'The initial margin requirement is 50% for most securities.',;
      },;
    ];

    this.testQuestions.set('series_6', series6Questions);
    this.testQuestions.set('series_7', series7Questions);
  }

  getEducationalContent(series: string, topic?: string) {
    const content = this.educationalContent.get(series);
    if (topic && content) {
      return content[topic];
    }
    return content;
  }

  getTestQuestions(series: string, count = 10) {
    const questions = this.testQuestions.get(series) || [];
    return questions.slice(0, count);
  }

  submitTestAnswer(userId: string, questionId: string, answer: number) {
    const userAnswers = this.userProgress.get(userId) || { answers: [], score: 0 };

    const question = this.findQuestionById(questionId);
    if (question) {
      const isCorrect = question.correct === answer;
      userAnswers.answers.push({
        questionId,;
        answer,;
        correct: isCorrect,;
        timestamp: new Date(),;
      });

      if (isCorrect) {
        userAnswers.score += 1;
      }

      this.userProgress.set(userId, userAnswers);

      return {
        correct: isCorrect,;
        explanation: question.explanation,;
        score: userAnswers.score,;
        totalAnswered: userAnswers.answers.length,;
      };
    }

    return null;
  }

  private findQuestionById(questionId: string): TestQuestion | null {
    for (const questions of this.testQuestions.values()) {
      const question = questions.find(q => q.id === questionId);
      if (question) return question;
    }
    return null;
  }

  getUserProgress(userId: string): UserProgress {
    return this.userProgress.get(userId) || { answers: [], score: 0 };
  }

  generateStudyPlan(userId: string, targetExam: string): StudyPlan {
    const progress = this.getUserProgress(userId);
    const weakAreas = this.identifyWeakAreas(progress, targetExam);
    const studyTime = this.calculateStudyTime(progress, targetExam);

    return {
      targetExam,;
      weakAreas,;
      recommendedStudyTime: studyTime,;
      weeklyPlan: this.createWeeklyPlan(weakAreas),;
      practiceTests: this.recommendPracticeTests(targetExam),;
    };
  }

  private identifyWeakAreas(progress: UserProgress, targetExam: string): string[] {
    const keyTopics = this.getKeyTopics(targetExam);
    const wrongAnswers = progress.answers?.filter((a: UserAnswer) => !a.correct) || [];

    // Analyze wrong answers to identify weak areas;
    const weakAreas = keyTopics.filter(topic => {
      const topicErrors = wrongAnswers.filter((a: UserAnswer) =>;
        a.questionId.includes(topic.toLowerCase());
      );
      return topicErrors.length > 1;
    });

    return weakAreas.length > 0 ? weakAreas : keyTopics.slice(0, 3);
  }

  private calculateStudyTime(progress: UserProgress, targetExam: string): number {
    const totalQuestions = this.testQuestions.get(targetExam)?.length || 100;
    const correctAnswers = progress.answers?.filter((a: UserAnswer) => a.correct).length || 0;
    const accuracy = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;

    // Recommend study time based on accuracy;
    if (accuracy >= 0.8) return 2; // 2 weeks;
    if (accuracy >= 0.6) return 4; // 4 weeks;
    return 6; // 6 weeks;
  }

  private createWeeklyPlan(weakAreas: string[]): WeeklyPlan[] {
    return weakAreas.map((area, index) => ({
      week: index + 1,;
      topic: area,;
      tasks: [;
        `Review ${area} concepts`,;
        `Complete practice questions`,;
        `Take mini-quiz on ${area}`,;
      ],;
    }));
  }

  private recommendPracticeTests(targetExam: string): PracticeTest[] {
    return [;
      { name: `${targetExam} Practice Test 1`, difficulty: 'Easy', questions: 50 },;
      { name: `${targetExam} Practice Test 2`, difficulty: 'Medium', questions: 75 },;
      { name: `${targetExam} Final Practice Test`, difficulty: 'Hard', questions: 100 },;
    ];
  }

  private getKeyTopics(targetExam: string): string[] {
    const topics = {
      series_6: [;
        'Investment Company Products',;
        'Securities and Tax Regulations',;
        'Customer Accounts and Recommendations',;
        'Retirement Plans',;
      ],;
      series_7: [;
        'Market Structure',;
        'Customer Accounts',;
        'Investment Banking',;
        'Trading Securities',;
        'Options',;
        'Municipal Securities',;
      ],;
    };

    return topics[targetExam as keyof typeof topics] || [];
  }
}

// Export singleton instance;
export const tradingEducationService = TradingEducationService.getInstance();
