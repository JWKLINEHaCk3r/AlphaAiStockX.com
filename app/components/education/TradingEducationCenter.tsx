import { Select } from "@/components/ui/select";
import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

import { tradingEducationService } from '../../services/trading-education-service';

// Simple text-based icon placeholders
const BookOpen = ({ className }: { className?: string }) => <span className={className}>📚</span>;
const GraduationCap = ({ className }: { className?: string }) => (
  <span className={className}>🎓</span>
);
const Target = ({ className }: { className?: string }) => <span className={className}>🎯</span>;
const CheckCircle = ({ className }: { className?: string }) => (
  <span className={className}>✅</span>
);
const Clock = ({ className }: { className?: string }) => <span className={className}>⏰</span>;
const Star = ({ className }: { className?: string }) => <span className={className}>⭐</span>;
const TrendingUp = ({ className }: { className?: string }) => <span className={className}>📈</span>;
const BarChart3 = ({ className }: { className?: string }) => <span className={className}>📊</span>;
const Brain = ({ className }: { className?: string }) => <span className={className}>🧠</span>;
const Award = ({ className }: { className?: string }) => <span className={className}>🏆</span>;
const Play = ({ className }: { className?: string }) => <span className={className}>▶️</span>;
const Lightbulb = ({ className }: { className?: string }) => <span className={className}>💡</span>;

interface TradingEducationCenterProps {
  className?: string;
}

interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface TestResults {
  score: number;
  correct: number;
  total: number;
  passed: boolean;
  recommendations: string[];
}

interface StudyProgress {
  [key: string]: {
    completed: boolean;
    score?: number;
    timeSpent?: number;
  };
}

interface EducationalTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  lessons: number;
  duration: string;
  difficulty: string;
}

interface SeriesExam {
  id: string;
  title: string;
  description: string;
  questions: number;
  timeLimit: number;
  passingScore: number;
  topics: string[];
}

export default function TradingEducationCenter({ className = '' }: TradingEducationCenterProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSeries, setSelectedSeries] = useState('series_7');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [studyProgress, setStudyProgress] = useState<StudyProgress>({});

  useEffect(() => {
    const initEducation = async () => {
      try {
        await tradingEducationService.initialize();
        loadTestQuestions();
        loadUserProgress();
      } catch (error) {
        console.error('Error initializing education service:', error);
      }
    };
    initEducation();
  }, []);

  const loadTestQuestions = async () => {
    const questions: TestQuestion[] = [
      {
        id: '1',
        question: 'What is the primary purpose of technical analysis?',
        options: [
          'To predict company earnings',
          'To analyze price patterns and trends',
          'To calculate dividend yields',
          'To assess company management',
        ],
        correct: 1,
        explanation: 'Technical analysis focuses on price patterns and market trends.',
      },
    ];
    setTestQuestions(questions);
    setCurrentQuestion(0);
    setUserAnswers({});
    setTestResults(null);
  };

  const loadUserProgress = async () => {
    setStudyProgress({
      basics: { completed: true, score: 85 },
      technical_analysis: { completed: false },
    });
  };

  const handleAnswerSubmit = (questionId: string, answer: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateTestResults();
    }
  };
  const calculateTestResults = () => {
    const correct = testQuestions.filter(q => userAnswers[q.id] === q.correct).length;
    const total = testQuestions.length;
    const score = (correct / total) * 100;
    const passed = score >= 70;

    const results: TestResults = {
      score,
      correct,
      total,
      passed,
      recommendations: passed
        ? ['Excellent work! You can proceed to the next level.']
        : ['More study needed. Focus on fundamental concepts.'],
    };

    setTestResults(results);
  };

  const educationalTopics: EducationalTopic[] = [
    {
      id: 'securities_basics',
      title: 'Securities Fundamentals',
      description: 'Learn about stocks, bonds, and other securities',
      icon: TrendingUp,
      lessons: 12,
      duration: '4 hours',
      difficulty: 'Beginner',
    },
    {
      id: 'market_analysis',
      title: 'Market Analysis',
      description: 'Technical and fundamental analysis techniques',
      icon: BarChart3,
      lessons: 15,
      duration: '6 hours',
      difficulty: 'Intermediate',
    },
    {
      id: 'options_trading',
      title: 'Options Trading',
      description: 'Comprehensive options strategies and risk management',
      icon: Target,
      lessons: 18,
      duration: '8 hours',
      difficulty: 'Advanced',
    },
    {
      id: 'risk_management',
      title: 'Risk Management',
      description: 'Portfolio risk assessment and mitigation strategies',
      icon: Brain,
      lessons: 10,
      duration: '5 hours',
      difficulty: 'Intermediate',
    },
  ];

  const seriesExams: SeriesExam[] = [
    {
      id: 'series_6',
      title: 'Series 6',
      description: 'Investment Company and Variable Contracts Products Representative',
      questions: 100,
      timeLimit: 135,
      passingScore: 70,
      topics: [
        'Investment Company Products (50%)',
        'Securities and Tax Regulations (25%)',
        'Customer Accounts and Prohibited Activities (25%)',
      ],
    },
    {
      id: 'series_7',
      title: 'Series 7',
      description: 'General Securities Representative',
      questions: 125,
      timeLimit: 225,
      passingScore: 72,
      topics: [
        'Seeks Business for the Broker-Dealer (9%)',
        "Opens Accounts After Obtaining and Evaluating Customers' Financial Profile (11%)",
        'Provides Customers with Information About Investments (31%)',
        "Obtains and Verifies Customers' Purchase and Sales Instructions (16%)",
        'Processes Transactions (4%)',
        'Maintains Customer Accounts (29%)',
      ],
    },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3 text-2xl">
            <GraduationCap className="h-8 w-8 text-blue-400" />
            Trading Education Center
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">
              <Star className="h-3 w-3 mr-1" />
              Series 6 & 7 Prep
            </Badge>
          </CardTitle>
          <CardDescription className="text-blue-200">
            Master trading fundamentals with our comprehensive education platform
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Lessons
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Practice Tests
          </TabsTrigger>
          <TabsTrigger value="series" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Series Exams
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Progress
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationalTopics.map(topic => (
              <Card
                key={topic.id}
                className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-400/40 transition-all cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <topic.icon className="h-8 w-8 text-blue-400" />
                    <Badge className="text-xs">{topic.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-white text-lg">{topic.title}</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">
                    {topic.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Lessons:</span>
                      <span className="text-blue-400">{topic.lessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="text-blue-400">{topic.duration}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    <Play className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-400">0</div>
                <div className="text-slate-400">Questions Correct</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-400">0%</div>
                <div className="text-slate-400">Success Rate</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-400">0</div>
                <div className="text-slate-400">Total Questions</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Practice Tests Tab */}
        <TabsContent value="practice" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Practice Tests</h3>
              <p className="text-slate-400">Test your knowledge with realistic exam questions</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedSeries === 'series_6' ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedSeries('series_6');
                  loadTestQuestions();
                }}
              >
                Series 6
              </Button>
              <Button
                variant={selectedSeries === 'series_7' ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedSeries('series_7');
                  loadTestQuestions();
                }}
              >
                Series 7
              </Button>
            </div>
          </div>

          {testResults ? (
            <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">
                      {testResults.score.toFixed(0)}%
                    </div>
                    <div className="text-slate-300">
                      {testResults.correct} out of {testResults.total} correct
                    </div>
                    <Badge className={testResults.passed ? 'bg-green-600' : 'bg-red-600'}>
                      {testResults.passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-white font-semibold">Recommendations:</h4>
                    {testResults.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => loadTestQuestions()} className="flex-1">
                      Retake Test
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Review Answers
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : testQuestions.length > 0 ? (
            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Question {currentQuestion + 1} of {testQuestions.length}
                  </CardTitle>
                  <Progress
                    value={((currentQuestion + 1) / testQuestions.length) * 100}
                    className="w-32"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {testQuestions[currentQuestion] && (
                  <div className="space-y-4">
                    <div className="text-white text-lg font-medium">
                      {testQuestions[currentQuestion].question}
                    </div>

                    <div className="space-y-2">
                      {testQuestions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full text-left justify-start h-auto p-4 text-wrap"
                          onClick={() =>
                            handleAnswerSubmit(testQuestions[currentQuestion].id, index)
                          }
                        >
                          <span className="font-semibold mr-3">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
              <CardContent className="p-8 text-center">
                <Target className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Ready to Practice?</h3>
                <p className="text-slate-400 mb-4">
                  Select a series exam and start your practice test
                </p>
                <Button onClick={loadTestQuestions}>Start Practice Test</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Series Exams Tab */}
        <TabsContent value="series" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {seriesExams.map(exam => (
              <Card key={exam.id} className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="h-6 w-6 text-blue-400" />
                    {exam.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300">{exam.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Questions:</span>
                        <div className="text-white font-semibold">{exam.questions}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Time Limit:</span>
                        <div className="text-white font-semibold">{exam.timeLimit} min</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Passing Score:</span>
                        <div className="text-white font-semibold">{exam.passingScore}%</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Format:</span>
                        <div className="text-white font-semibold">Multiple Choice</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2">Exam Topics:</h4>
                      <div className="space-y-1">
                        {exam.topics.map((topic, index) => (
                          <div
                            key={index}
                            className="text-sm text-slate-300 flex items-start gap-2"
                          >
                            <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">Study Plan</Button>
                      <Button variant="outline" className="flex-1">
                        Practice Exam
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Progress Tab placeholder */}
        <TabsContent value="progress" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
            <CardContent className="p-8 text-center">
              <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Progress Tracking</h3>
              <p className="text-slate-400 mb-4">
                Your study progress will appear here as you complete lessons and practice tests
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lessons Tab placeholder */}
        <TabsContent value="lessons" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Interactive Lessons</h3>
              <p className="text-slate-400 mb-4">
                Comprehensive trading lessons will be available here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
