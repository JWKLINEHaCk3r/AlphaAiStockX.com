'use client';
import { Calendar } from "../../../components/ui/calendar";
import { Avatar } from "../../../components/ui/avatar";
import { Card } from "../../../components/ui/card";
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardDescription,
      CardTitle }
    } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { User, 
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card.js";
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Target, 
  Award, 
  Star, 
  Edit2, 
  Settings, 
  Share2, 
  Trophy,
  Zap,
  DollarSign,
  Activity, }
  Clock, CheckCircle } from 'lucide-react';

interface UserData {
  id: string,
    name: string,
  username: string,
    email: string,
  phone: string,
    location: string,
  joinDate: string;
  avatar?: string, bio: string, tradingLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert', subscription: 'Free' | 'Pro' | 'Premium' | 'Enterprise',
    isVerified: boolean,
  stats: {
      totalTrades: number,
    successfulTrades: number,
    winRate: number,
    totalReturn: number,
    bestMonth: number,
    currentStreak: number,
    rank: number,
    portfolioValue: number
  },
  achievements: Array<{
      id: string,
    title: string,
    description: string,
    icon: string,
    earnedDate: string
  }>,
  recentActivity: Array<{ id: string, type: 'trade' | 'achievement' | 'milestone',
    description: string,
    date: string;
    value?: number;
  }>;
}

interface SimpleTabsProps {
  value: string,
    onValueChange: (value: string) => void,
    children: React.ReactNode
}

// Simple tabs implementation to avoid import conflicts
const SimpleTabs: React.FunctionComponent<SimpleTabsProps> = ({ value, onValueChange, children }) => {
  return (
    <div className="w-full">
      {React.Children.map(children, (child, index) => {
        if (index === 0) {
          // Tab list
          return React.cloneElement(child as React.ReactElement, { activeTab: value, onTabChange: onValueChange });
        }
        // Tab content
        return React.cloneElement(child as React.ReactElement, { activeTab: value });
      })}
    </div>
  );
};

const SimpleTabsList: React.FunctionComponent<{
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
      {React.Children.map(children, (child) => 
        React.cloneElement(child as React.ReactElement, { activeTab, onTabChange })
      )}
    </div>
  );
};
      )}
    </div>
  );
};

const SimpleTabsTrigger: React.FunctionComponent<{
      value: string, 
  children: React.ReactNode; 
  activeTab?: string; 
  onTabChange?: (value: string) => void 
}> = ({ value, children, activeTab,
      onTabChange
    }) => {  
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => onTabChange?.(value)  }
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${ isActive  ? 'bg-white text-blue-600 shadow-sm'  : 'text-gray-600 hover: text-gray-800, hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  );
};

const SimpleTabsContent: React.FunctionComponent<{
      value: string, children: React.ReactNode, activeTab?: string }> = ({ 
  value, 
  children,
      activeTab
    }) => {  
  if (activeTab !== value) return null;
  return <div>{children  }</div>;
};

export default function UserProfile() { const [activeTab, setActiveTab] = useState('overview');
   const userData: UserData = { id: '1', name: 'Alexander Johnson', username: 'alphatrader_pro', email: 'alex.johnson@example.com', phone: '+1 (555) 123-4567', location: 'New York, NY', joinDate: '2023-03-15', bio: 'Professional algorithmic trader with 8+ years of experience in quantitative finance. Specializing in AI-driven trading strategies and risk management.', tradingLevel: 'Expert', subscription: 'Premium',
    isVerified: true,
    stats: {
      totalTrades: 2847,
      successfulTrades: 2084;
      winRate: 73.2,
      totalReturn: 127.4;
      bestMonth: 31.8,
      currentStreak: 12;
      rank: 47,
      portfolioValue: 895400
    };
    achievements: [ { id: '1', title: 'Consistent Performer', description: 'Maintained positive returns for 12 consecutive months', icon: 'trophy', earnedDate: '2024-01-15' },{ id: '2', title: 'Risk Master', description: 'Kept maximum drawdown under 5% for 6 months', icon: 'shield', earnedDate: '2023-12-03' },{ id: '3', title: 'AI Pioneer', description: 'Early adopter of AI trading strategies', icon: 'star', earnedDate: '2023-08-22'
      }
    ],
    recentActivity: [ { id: '1', type: 'trade', description: 'Executed successful TSLA options trade', date: '2024-01-20',
        value: 2847 },{ id: '2', type: 'achievement', description: 'Earned "Consistent Performer" badge', date: '2024-01-15' },{ id: '3', type: 'milestone', description: 'Reached $800K portfolio milestone', date: '2024-01-10'
      }
    ]
  };

  const getLevelColor = (level: string) => {   switch (level) { case 'Beginner': return 'bg-green-100 text-green-800'; case 'Intermediate': return 'bg-blue-100 text-blue-800'; case 'Advanced': return 'bg-purple-100 text-purple-800'; case 'Expert': return 'bg-red-100 text-red-800'; default: return 'bg-gray-100 text-gray-800'
      }
  };

  const getSubscriptionColor = (subscription: string) => {   switch (subscription) { case 'Free': return 'bg-gray-100 text-gray-800'; case 'Pro': return 'bg-blue-100 text-blue-800'; case 'Premium': return 'bg-purple-100 text-purple-800'; case 'Enterprise': return 'bg-yellow-100 text-yellow-800'; default: return 'bg-gray-100 text-gray-800'
      }
  };
 const formatCurrency = (amount: number) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Header */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{userData.name}</h1>
                    {userData.isVerified && (
                      <CheckCircle className="w-6 h-6 text-blue-200" />
                    )}
                  </div>
                  <p className="text-blue-100 text-lg mb-1">@{userData.username}</p>
                  <div className="flex items-center gap-3">
                    <Badge className={getLevelColor(userData.tradingLevel)}>
                      {userData.tradingLevel} Trader
                    </Badge>
                    <Badge className={getSubscriptionColor(userData.subscription)}>
                      {userData.subscription}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex-1 grid grid-cols-2 md: grid-cols-4 gap-4 mt-4,
      md:mt-0">
                <div className="text-center">
                  <p className="text-2xl font-bold">{userData.stats.totalTrades.toLocaleString()}</p>
                  <p className="text-blue-200 text-sm">Total Trades</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{userData.stats.winRate}%</p>
                  <p className="text-blue-200 text-sm">Win Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">+{userData.stats.totalReturn}%</p>
                  <p className="text-blue-200 text-sm">Total Return</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">#{userData.stats.rank}</p>
                  <p className="text-blue-200 text-sm">Global Rank</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" className="border-white/30 text-white hover: bg-white/10">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" className="border-white/30 text-white, hover:bg-white/10">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <SimpleTabs value={activeTab} onValueChange={setActiveTab}>
          <SimpleTabsList>
            <SimpleTabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </SimpleTabsTrigger>
            <SimpleTabsTrigger value="stats">
              <Target className="w-4 h-4 mr-2" />
              Statistics
            </SimpleTabsTrigger>
            <SimpleTabsTrigger value="achievements">
              <Trophy className="w-4 h-4 mr-2" />
              Achievements
            </SimpleTabsTrigger>
            <SimpleTabsTrigger value="activity">
              <Activity className="w-4 h-4 mr-2" />
              Activity
            </SimpleTabsTrigger>
            <SimpleTabsTrigger value="about">
              <User className="w-4 h-4 mr-2" />
              About
            </SimpleTabsTrigger>
          </SimpleTabsList>

          {/* Overview Tab */}
          <SimpleTabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Portfolio Summary */}
              <div className="lg: col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-green-600" />
                      Portfolio Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid, md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Current Value</p>
                        <p className="text-3xl font-bold text-green-600">
                          {formatCurrency(userData.stats.portfolioValue)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Return</p>
                        <p className="text-3xl font-bold text-blue-600">
                          +{userData.stats.totalReturn}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Best Month</p>
                        <p className="text-xl font-semibold text-purple-600">
                          +{userData.stats.bestMonth}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Current Streak</p>
                        <p className="text-xl font-semibold text-yellow-600">
                          {userData.stats.currentStreak} wins
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trading Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                      Trading Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Trades</span>
                        <span className="font-semibold">{userData.stats.totalTrades.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Successful Trades</span>
                        <span className="font-semibold text-green-600">{userData.stats.successfulTrades.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Win Rate</span>
                        <span className="font-semibold">{userData.stats.winRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{width: `${userData.stats.winRate}%`}}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div>
                {/* Recent Achievements */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-6 h-6 text-yellow-600" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userData.achievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{achievement.title}</p>
                            <p className="text-xs text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-6 h-6 text-gray-600" />
                      Quick Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{userData.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{userData.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Joined {new Date(userData.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SimpleTabsContent>

          {/* Statistics Tab */}
          <SimpleTabsContent value="stats">
            <div className="grid md: grid-cols-2,
      lg:grid-cols-3 gap-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-blue-700 mb-2">{userData.stats.totalTrades}</h3>
                  <p className="text-blue-600">Total Trades</p>
                </CardContent>
              </Card>
              
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-700 mb-2">{userData.stats.winRate}%</h3>
                  <p className="text-green-600">Win Rate</p>
                </CardContent>
              </Card>
              
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-purple-700 mb-2">+{userData.stats.totalReturn}%</h3>
                  <p className="text-purple-600">Total Return</p>
                </CardContent>
              </Card>
              
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-yellow-700 mb-2">#{userData.stats.rank}</h3>
                  <p className="text-yellow-600">Global Rank</p>
                </CardContent>
              </Card>
              
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-red-700 mb-2">{userData.stats.currentStreak}</h3>
                  <p className="text-red-600">Win Streak</p>
                </CardContent>
              </Card>
              
              <Card className="border-indigo-200 bg-indigo-50">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-indigo-700 mb-2">
                    {formatCurrency(userData.stats.portfolioValue)}
                  </h3>
                  <p className="text-indigo-600">Portfolio Value</p>
                </CardContent>
              </Card>
            </div>
          </SimpleTabsContent>

          {/* Achievements Tab */}
          <SimpleTabsContent value="achievements">
            <div className="grid md: grid-cols-2,
      lg:grid-cols-3 gap-6">
              {userData.achievements.map((achievement) => (
                <Card key={achievement.id} className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-yellow-800">{achievement.title}</h3>
                        <p className="text-sm text-yellow-600">
                          {new Date(achievement.earnedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-yellow-700">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SimpleTabsContent>

          {/* Activity Tab */}
          <SimpleTabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest trading activities and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg"> <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"> {activity.type === 'trade' && <BarChart3 className="w-5 h-5 text-blue-600" />},{activity.type === 'achievement' && <Trophy className="w-5 h-5 text-yellow-600" />},{activity.type === 'milestone' && <Star className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{activity.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {new Date(activity.date).toLocaleDateString()},{activity.value && (
                            <span className="font-semibold text-green-600">
                              +${activity.value}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SimpleTabsContent>

          {/* About Tab */}
          <SimpleTabsContent value="about">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-gray-800">{userData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-800">{userData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-gray-800">{userData.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Location</label>
                    <p className="text-gray-800">{userData.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Member Since</label>
                    <p className="text-gray-800">{new Date(userData.joinDate).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
                  <div className="mt-6 flex gap-3">
                    <Button variant="outline">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SimpleTabsContent>
        </SimpleTabs>
        
      </div>
    </div>
  );
}
