'use client';

import { useState, useEffect } from 'react';
import { ntent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  BookOpen,
  GraduationCap,
  Target,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  BarChart3,
  Brain,
  Award,
  Search,
  Play,
  FileText,
  Users,
  Lightbulb,
} from 'lucide-react';

import { tradingEducationService } from '../../services/trading-education-service';

interface TradingEducationCenterProps {
  className?: string;
}

export default function TradingEducationCenter({ className = '' }: TradingEducationCenterProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSeries, setSelectedSeries] = useState('series_7');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testQuestions, setTestQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [studyProgress, setStudyProgress] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    initializeEducation();
  }, []);

  const initializeEducation = async () => {
    await tradingEducationService.initialize();
    loadTestQuestions();
    loadUserProgress();
  };

  const loadTestQuestions = () => {
    const questions = tradingEducationService.getTestQuestions(selectedSeries, 10);
    setTestQuestions(questions);
    setCurrentQuestion(0);
    setUserAnswers({});
    setTestResults(null);
  };

  const loadUserProgress = () => {
    const progress = tradingEducationService.getUserProgress('user123');
    setStudyProgress(progress);
  };

  const handleAnswerSubmit = (questionId: string, answer: number) => {
    const result = tradingEducationService.submitTestAnswer('user123', questionId, answer);
    setUserAnswers(prev => ({ ...prev, [questionId]: { answer, result } }));

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Test completed
      calculateTestResults();
    }
  };

  const calculateTestResults = () => {
    const totalQuestions = testQuestions.length;
    const correctAnswers = Object.values(userAnswers).filter(
      (answer: any) => answer.result.correct
    ).length;
    const score = (correctAnswers / totalQuestions) * 100;

    setTestResults({
      score,
      correct: correctAnswers,
      total: totalQuestions,
      passed: score >= 70,
      recommendations: generateRecommendations(score),
    });
  };

  const generateRecommendations = (score: number) => {
    if (score >= 90) {
      return [
        "Excellent performance! You're ready for the exam.",
        'Consider taking practice tests to maintain your knowledge.',
      ];
    } else if (score >= 70) {
      return [
        'Good performance! Review weak areas before the exam.',
        'Take additional practice tests to improve confidence.',
      ];
    } else {
      return [
        'More study needed. Focus on fundamental concepts.',
        'Review educational materials and retake practice tests.',
      ];
    }
  };

  const educationalTopics = [
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

  const seriesExams = [
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
                    <Badge variant="outline" className="text-xs">
                      {topic.difficulty}
                    </Badge>
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
                <div className="text-2xl font-bold text-green-400">
                  {studyProgress.correct || 0}
                </div>
                <div className="text-slate-400">Questions Correct</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-400">
                  {Math.floor((studyProgress.correct / Math.max(studyProgress.total, 1)) * 100) ||
                    0}
                  %
                </div>
                <div className="text-slate-400">Success Rate</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-400">{studyProgress.total || 0}</div>
                <div className="text-slate-400">Total Questions</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Lessons Tab */}
        <TabsContent value="lessons" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/30 border-blue-500/30 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Series 6 Content */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Series 6 - Investment Company Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Mutual Funds</h4>
                    <p className="text-slate-300 text-sm mb-3">
                      Learn about open-end investment companies, share classes, and fee structures.
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-600">8 Lessons</Badge>
                      <Button size="sm" variant="outline">
                        Start Module
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Variable Annuities</h4>
                    <p className="text-slate-300 text-sm mb-3">
                      Understand variable annuity features, phases, and charges.
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-600">6 Lessons</Badge>
                      <Button size="sm" variant="outline">
                        Start Module
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Regulations</h4>
                    <p className="text-slate-300 text-sm mb-3">
                      Master the Investment Company Act of 1940 and related regulations.
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-600">5 Lessons</Badge>
                      <Button size="sm" variant="outline">
                        Start Module
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Series 7 Content */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-400" />
                  Series 7 - General Securities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Equity Securities</h4>
                    <p className="text-slate-300 text-sm mb-3">
                      Common stock, preferred stock, rights, and warrants.
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-purple-600">12 Lessons</Badge>
                      <Button size="sm" variant="outline">
                        Start Module
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Debt Securities</h4>
                    <p className="text-slate-300 text-sm mb-3">
                      Corporate bonds, government securities, and municipal bonds.
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-purple-600">10 Lessons</Badge>
                      <Button size="sm" variant="outline">
                        Start Module
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Options</h4>
                    <p className="text-slate-300 text-sm mb-3">
                      Options basics, strategies, and risk management.
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-purple-600">15 Lessons</Badge>
                      <Button size="sm" variant="outline">
                        Start Module
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Topics */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-400" />
                Advanced Trading Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Technical Analysis</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    Chart patterns, indicators, and trend analysis.
                  </p>
                  <Progress value={65} className="mb-2" />
                  <div className="text-xs text-slate-400">65% Complete</div>
                </div>

                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Fundamental Analysis</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    Financial ratios, valuation methods, and economic indicators.
                  </p>
                  <Progress value={40} className="mb-2" />
                  <div className="text-xs text-slate-400">40% Complete</div>
                </div>

                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Risk Management</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    Portfolio theory, diversification, and risk measures.
                  </p>
                  <Progress value={80} className="mb-2" />
                  <div className="text-xs text-slate-400">80% Complete</div>
                </div>

                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Market Psychology</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    Bull/bear markets, sentiment analysis, and behavioral finance.
                  </p>
                  <Progress value={25} className="mb-2" />
                  <div className="text-xs text-slate-400">25% Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>
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

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Overall Progress</h3>
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {Math.floor((studyProgress.correct / Math.max(studyProgress.total, 1)) * 100) ||
                    0}
                  %
                </div>
                <Progress
                  value={
                    Math.floor((studyProgress.correct / Math.max(studyProgress.total, 1)) * 100) ||
                    0
                  }
                  className="mb-2"
                />
                <div className="text-sm text-slate-400">
                  {studyProgress.correct || 0} of {studyProgress.total || 0} questions correct
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Study Streak</h3>
                  <Clock className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-green-400 mb-2">7</div>
                <div className="text-sm text-slate-400">Days in a row</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Time Studied</h3>
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-purple-400 mb-2">24h</div>
                <div className="text-sm text-slate-400">This month</div>
              </CardContent>
            </Card>
          </div>

          {/* Study Plan */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Personalized Study Plan</CardTitle>
              <CardDescription className="text-slate-400">
                Based on your performance and target exam date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { week: 1, topic: 'Securities Fundamentals', progress: 100, status: 'completed' },
                  {
                    week: 2,
                    topic: 'Market Structure & Regulations',
                    progress: 75,
                    status: 'in-progress',
                  },
                  { week: 3, topic: 'Investment Products', progress: 0, status: 'upcoming' },
                  { week: 4, topic: 'Options & Derivatives', progress: 0, status: 'upcoming' },
                  { week: 5, topic: 'Practice Tests & Review', progress: 0, status: 'upcoming' },
                ].map(item => (
                  <div
                    key={item.week}
                    className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg"
                  >
                    <div className="text-white font-semibold min-w-[80px]">Week {item.week}</div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{item.topic}</div>
                      <Progress value={item.progress} className="mt-2" />
                    </div>
                    <Badge
                      className={
                        item.status === 'completed'
                          ? 'bg-green-600'
                          : item.status === 'in-progress'
                            ? 'bg-blue-600'
                            : 'bg-slate-600'
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
