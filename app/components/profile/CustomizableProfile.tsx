import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Alert } from '../../../components/ui/alert';
import { TabsTrigger } from "../../../components/ui/tabs";
import { TabsList } from "../../../components/ui/tabs";
import { TabsContent } from "../../../components/ui/tabs";
import { Tabs } from "../../../components/ui/tabs";
import { AvatarImage } from "../../../components/ui/avatar";
import { AvatarFallback } from "../../../components/ui/avatar";
import { Avatar } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { SelectValue } from "../../../components/ui/select";
import { SelectTrigger } from "../../../components/ui/select";
import { SelectItem } from "../../../components/ui/select";
import { SelectContent } from "../../../components/ui/select";
import { Select } from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  AIStockPrediction,;
  SportsEvent,;
  TradingOpportunity,;
  Trade,;
  Trader,;
  AnalysisResult,;
  BankAccount,;
  Transaction,;
  TradingSignalData,;
  ChartPattern,;
  TechnicalIndicators,;
  SectorPerformance,;
  BacktestStrategy,;
  AIWhiteLabelMetrics,;
  MarketClassification,;
  TradingRecommendation,;
  StockAnalysis,;
  RealtimeData,;
  VolumeProfile,;
  AIAnalysisComponents,;
  CryptoData,;
  DeFiProtocol,;
  NFTCollection,;
  UserProfile,;
  ThemeOption,;
  AccentColor,;
  SubscriptionPlan,;
  TradingStrategy,;
  ScanResult,;
  SiteDiagnostic,;
  Alert,;
  NewsAnalysis,;
  SocialPlatform,;
  Influencer,;
  SocialPost,;
  DeepLearningModel,;
  MarketPattern,;
} from '../../types/trading-types';

'use client';
import React from 'react';

import { useState } from 'react';
import {
  Settings,;
  User,;
  MapPin,;
  Globe,;
  TrendingUp,;
  Shield,;
  Eye,;
  Camera,;
  Crown,;
  Star,;
  Target,;
  Flame,;
  Palette,;
  Trophy,;
} from 'lucide-react';

interface User {















  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  tradingExperience?: string;
  riskTolerance?: string;
  investmentGoals?: string[];
  profileVisibility?: string;
  showPortfolio?: boolean;
  showReturns?: boolean;
  theme?: string;
  accentColor?: string;
  avatar?: string;
  subscription?: string;















}

interface CustomizableProfileProps {















  user: User;
  onUpdateProfile: (data: any) => void;















}

export default function CustomizableProfile({ user, onUpdateProfile }: CustomizableProfileProps) {
  const [profileData, setProfileData] = useState({
    displayName: user?.name || '',;
    bio: user?.bio || '',;
    location: user?.location || '',;
    website: user?.website || '',;
    tradingExperience: user?.tradingExperience || 'intermediate',;
    riskTolerance: user?.riskTolerance || 'moderate',;
    investmentGoals: user?.investmentGoals || [],;
    profileVisibility: user?.profileVisibility || 'public',;
    showPortfolio: user?.showPortfolio || false,;
    showReturns: user?.showReturns || false,;
    theme: user?.theme || 'dark',;
    accentColor: user?.accentColor || 'purple',;
  });

  const [achievements] = useState([;
    {
      id: 1,;
      name: 'First Trade',;
      description: 'Completed your first trade',;
      icon: Target,;
      earned: true,;
    },;
    {
      id: 2,;
      name: 'Profit Master',;
      description: 'Achieved 10% portfolio return',;
      icon: TrendingUp,;
      earned: true,;
    },;
    {
      id: 3,;
      name: 'Diamond Hands',;
      description: 'Held a position for 6+ months',;
      icon: Crown,;
      earned: false,;
    },;
    {
      id: 4,;
      name: 'Alpha Wolf',;
      description: 'Top 1% performer this month',;
      icon: Flame,;
      earned: true,;
    },;
    {
      id: 5,;
      name: 'Risk Manager',;
      description: 'Never exceeded risk limits',;
      icon: Shield,;
      earned: false,;
    },;
  ]);

  const [tradingStats] = useState({
    totalTrades: 247,;
    winRate: 68.4,;
    avgReturn: 12.7,;
    bestTrade: 45.2,;
    worstTrade: -8.3,;
    sharpeRatio: 1.84,;
    maxDrawdown: 12.1,;
  });

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    onUpdateProfile(profileData);
  };

  const themeOptions = [;
    { value: 'dark', label: 'Dark Mode', preview: 'bg-gray-900' },;
    { value: 'light', label: 'Light Mode', preview: 'bg-white' },;
    { value: 'midnight', label: 'Midnight Blue', preview: 'bg-blue-900' },;
    { value: 'forest', label: 'Forest Green', preview: 'bg-green-900' },;
  ];

  const accentColors = [;
    { value: 'purple', label: 'Purple', color: 'bg-purple-500' },;
    { value: 'blue', label: 'Blue', color: 'bg-blue-500' },;
    { value: 'green', label: 'Green', color: 'bg-green-500' },;
    { value: 'red', label: 'Red', color: 'bg-red-500' },;
    { value: 'yellow', label: 'Gold', color: 'bg-yellow-500' },;
    { value: 'pink', label: 'Pink', color: 'bg-pink-500' },;
  ];

  return (;
    <div className="space-y-6">;
      {/* Profile Header */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
        <CardContent className="p-6">;
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">;
            <div className="relative">;
              <Avatar className="h-24 w-24 border-4 border-purple-500/30">;
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />;
                <AvatarFallback className="bg-purple-900 text-white text-2xl">;
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>;
              </Avatar>;
              <Button;
                size="sm";
                className="absolute -bottom-2 -right-2 rounded-full bg-purple-500 hover:bg-purple-600";
              >;
                <Camera className="h-4 w-4" />;
              </Button>;
            </div>;
            <div className="flex-1 text-center md:text-left">;
              <h2 className="text-2xl font-bold text-white">{profileData.displayName}</h2>;
              <p className="text-gray-400 mt-1">{profileData.bio || 'Alpha Wolf Trader'}</p>;
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">;
                {user?.subscription && (;
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">;
                    <Crown className="h-3 w-3 mr-1" />;
                    {user.subscription === 'ultimate' ? 'Alpha Wolf' : user.subscription} Pack;
                  </Badge>;
                )}
                <Badge variant="outline" className="border-green-500/30 text-green-400">;
                  <TrendingUp className="h-3 w-3 mr-1" />;
                  {tradingStats.winRate}% Win Rate;
                </Badge>;
                <Badge variant="outline" className="border-blue-500/30 text-blue-400">;
                  <Star className="h-3 w-3 mr-1" />;
                  {achievements.filter(a => a.earned).length} Achievements;
                </Badge>;
              </div>;
            </div>;
            <div className="text-center">;
              <p className="text-3xl font-bold text-green-400">+{tradingStats.avgReturn}%</p>;
              <p className="text-sm text-gray-400">Avg Return</p>;
            </div>;
          </div>;
        </CardContent>;
      </Card>;
      <Tabs defaultValue="profile" className="space-y-6">;
        <TabsList className="bg-black/20 border-purple-500/30">;
          <TabsTrigger value="profile" className="data-[state=active]:bg-purple-500/20">;
            <User className="h-4 w-4 mr-2" />;
            Profile Info;
          </TabsTrigger>;
          <TabsTrigger value="appearance" className="data-[state=active]:bg-purple-500/20">;
            <Palette className="h-4 w-4 mr-2" />;
            Appearance;
          </TabsTrigger>;
          <TabsTrigger value="privacy" className="data-[state=active]:bg-purple-500/20">;
            <Eye className="h-4 w-4 mr-2" />;
            Privacy;
          </TabsTrigger>;
          <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-500/20">;
            <Trophy className="h-4 w-4 mr-2" />;
            Achievements;
          </TabsTrigger>;
          <TabsTrigger value="stats" className="data-[state=active]:bg-purple-500/20">;
            <TrendingUp className="h-4 w-4 mr-2" />;
            Trading Stats;
          </TabsTrigger>;
        </TabsList>;
        <TabsContent value="profile">;
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
            <CardHeader>;
              <CardTitle className="text-white">Profile Information</CardTitle>;
            </CardHeader>;
            <CardContent className="space-y-4">;
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">;
                <div className="space-y-2">;
                  <Label className="text-white">Display Name</Label>;
                  <Input;
                    value={profileData.displayName}
                    onChange={e => handleInputChange('displayName', e.target.value)}
                    className="bg-black/20 border-purple-500/30 text-white";
                  />;
                </div>;
                <div className="space-y-2">;
                  <Label className="text-white">Location</Label>;
                  <Input;
                    value={profileData.location}
                    onChange={e => handleInputChange('location', e.target.value)}
                    placeholder="e.g., New York, NY";
                    className="bg-black/20 border-purple-500/30 text-white";
                  />;
                </div>;
              </div>;
              <div className="space-y-2">;
                <Label className="text-white">Bio</Label>;
                <Textarea;
                  value={profileData.bio}
                  onChange={e => handleInputChange('bio', e.target.value)}
                  placeholder="Tell other traders about yourself...";
                  className="bg-black/20 border-purple-500/30 text-white";
                  rows={3}
                />;
              </div>;
              <div className="space-y-2">;
                <Label className="text-white">Website</Label>;
                <Input;
                  value={profileData.website}
                  onChange={e => handleInputChange('website', e.target.value)}
                  placeholder="https://your-website.com";
                  className="bg-black/20 border-purple-500/30 text-white";
                />;
              </div>;
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">;
                <div className="space-y-2">;
                  <Label className="text-white">Trading Experience</Label>;
                  <Select;
                    value={profileData.tradingExperience}
                    onValueChange={value => handleInputChange('tradingExperience', value)}
                  >;
                    <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">;
                      <SelectValue />;
                    </SelectTrigger>;
                    <SelectContent>;
                      <SelectItem value="beginner">Beginner (less than 1 year)</SelectItem>;
                      <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>;
                      <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>;
                      <SelectItem value="expert">Expert (5+ years)</SelectItem>;
                    </SelectContent>;
                  </Select>;
                </div>;
                <div className="space-y-2">;
                  <Label className="text-white">Risk Tolerance</Label>;
                  <Select;
                    value={profileData.riskTolerance}
                    onValueChange={value => handleInputChange('riskTolerance', value)}
                  >;
                    <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">;
                      <SelectValue />;
                    </SelectTrigger>;
                    <SelectContent>;
                      <SelectItem value="conservative">Conservative</SelectItem>;
                      <SelectItem value="moderate">Moderate</SelectItem>;
                      <SelectItem value="aggressive">Aggressive</SelectItem>;
                      <SelectItem value="very-aggressive">Very Aggressive</SelectItem>;
                    </SelectContent>;
                  </Select>;
                </div>;
              </div>;
            </CardContent>;
          </Card>;
        </TabsContent>;
        <TabsContent value="appearance">;
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
            <CardHeader>;
              <CardTitle className="text-white">Customize Appearance</CardTitle>;
            </CardHeader>;
            <CardContent className="space-y-6">;
              <div className="space-y-4">;
                <Label className="text-white text-lg">Theme</Label>;
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">;
                  {themeOptions.map((theme: any) => (;
                    <div;
                      key={theme.value}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        profileData.theme === theme.value;
                          ? 'border-purple-500 bg-purple-500/20';
                          : 'border-gray-700 hover:border-gray-600';
                      }`}
                      onClick={() => handleInputChange('theme', theme.value)}
                    >;
                      <div className={`w-full h-16 rounded ${theme.preview} mb-2`}></div>;
                      <p className="text-white text-sm text-center">{theme.label}</p>;
                    </div>;
                  ))}
                </div>;
              </div>;
              <div className="space-y-4">;
                <Label className="text-white text-lg">Accent Color</Label>;
                <div className="flex flex-wrap gap-3">;
                  {accentColors.map((color: any) => (;
                    <div;
                      key={color.value}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        profileData.accentColor === color.value;
                          ? 'border-white';
                          : 'border-gray-700 hover:border-gray-600';
                      }`}
                      onClick={() => handleInputChange('accentColor', color.value)}
                    >;
                      <div className={`w-8 h-8 rounded-full ${color.color}`}></div>;
                      <p className="text-white text-xs text-center mt-1">{color.label}</p>;
                    </div>;
                  ))}
                </div>;
              </div>;
            </CardContent>;
          </Card>;
        </TabsContent>;
        <TabsContent value="privacy">;
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
            <CardHeader>;
              <CardTitle className="text-white">Privacy Settings</CardTitle>;
            </CardHeader>;
            <CardContent className="space-y-4">;
              <div className="space-y-2">;
                <Label className="text-white">Profile Visibility</Label>;
                <Select;
                  value={profileData.profileVisibility}
                  onValueChange={value => handleInputChange('profileVisibility', value)}
                >;
                  <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">;
                    <SelectValue />;
                  </SelectTrigger>;
                  <SelectContent>;
                    <SelectItem value="public">Public</SelectItem>;
                    <SelectItem value="friends">Friends Only</SelectItem>;
                    <SelectItem value="private">Private</SelectItem>;
                  </SelectContent>;
                </Select>;
              </div>;
              <div className="space-y-4">;
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">;
                  <div>;
                    <p className="text-white font-medium">Show Portfolio</p>;
                    <p className="text-sm text-gray-400">Allow others to see your holdings</p>;
                  </div>;
                  <Button;
                    variant={profileData.showPortfolio ? 'default' : 'outline'}
                    onClick={() => handleInputChange('showPortfolio', !profileData.showPortfolio)}
                    className={profileData.showPortfolio ? 'bg-green-500 hover:bg-green-600' : ''}
                  >;
                    {profileData.showPortfolio ? 'Enabled' : 'Disabled'}
                  </Button>;
                </div>;
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">;
                  <div>;
                    <p className="text-white font-medium">Show Returns</p>;
                    <p className="text-sm text-gray-400">Display your trading performance</p>;
                  </div>;
                  <Button;
                    variant={profileData.showReturns ? 'default' : 'outline'}
                    onClick={() => handleInputChange('showReturns', !profileData.showReturns)}
                    className={profileData.showReturns ? 'bg-green-500 hover:bg-green-600' : ''}
                  >;
                    {profileData.showReturns ? 'Enabled' : 'Disabled'}
                  </Button>;
                </div>;
              </div>;
            </CardContent>;
          </Card>;
        </TabsContent>;
        <TabsContent value="achievements">;
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
            <CardHeader>;
              <CardTitle className="text-white">Your Achievements</CardTitle>;
            </CardHeader>;
            <CardContent>;
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">;
                {achievements.map(achievement => {
                  const IconComponent = achievement.icon;
                  return (;
                    <div;
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned;
                          ? 'border-yellow-500/50 bg-yellow-500/10';
                          : 'border-gray-700/50 bg-gray-800/20';
                      }`}
                    >;
                      <div className="flex items-center space-x-3">;
                        <div;
                          className={`p-3 rounded-full ${achievement.earned ? 'bg-yellow-500/20' : 'bg-gray-700/20'}`}
                        >;
                          <IconComponent;
                            className={`h-6 w-6 ${achievement.earned ? 'text-yellow-400' : 'text-gray-500'}`}
                          />;
                        </div>;
                        <div>;
                          <p;
                            className={`font-medium ${achievement.earned ? 'text-yellow-400' : 'text-gray-400'}`}
                          >;
                            {achievement.name}
                          </p>;
                          <p className="text-sm text-gray-400">{achievement.description}</p>;
                        </div>;
                      </div>;
                    </div>;
                  );
                })}
              </div>;
            </CardContent>;
          </Card>;
        </TabsContent>;
        <TabsContent value="stats">;
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
            <CardHeader>;
              <CardTitle className="text-white">Trading Statistics</CardTitle>;
            </CardHeader>;
            <CardContent>;
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">;
                <div className="text-center p-4 bg-white/5 rounded-lg">;
                  <p className="text-2xl font-bold text-blue-400">{tradingStats.totalTrades}</p>;
                  <p className="text-sm text-gray-400">Total Trades</p>;
                </div>;
                <div className="text-center p-4 bg-white/5 rounded-lg">;
                  <p className="text-2xl font-bold text-green-400">{tradingStats.winRate}%</p>;
                  <p className="text-sm text-gray-400">Win Rate</p>;
                </div>;
                <div className="text-center p-4 bg-white/5 rounded-lg">;
                  <p className="text-2xl font-bold text-purple-400">{tradingStats.avgReturn}%</p>;
                  <p className="text-sm text-gray-400">Avg Return</p>;
                </div>;
                <div className="text-center p-4 bg-white/5 rounded-lg">;
                  <p className="text-2xl font-bold text-yellow-400">{tradingStats.sharpeRatio}</p>;
                  <p className="text-sm text-gray-400">Sharpe Ratio</p>;
                </div>;
                <div className="text-center p-4 bg-white/5 rounded-lg">;
                  <p className="text-2xl font-bold text-green-400">+{tradingStats.bestTrade}%</p>;
                  <p className="text-sm text-gray-400">Best Trade</p>;
                </div>;
                <div className="text-center p-4 bg-white/5 rounded-lg">;
                  <p className="text-2xl font-bold text-red-400">{tradingStats.worstTrade}%</p>;
                  <p className="text-sm text-gray-400">Worst Trade</p>;
                </div>;
                <div className="text-center p-4 bg-white/5 rounded-lg">;
                  <p className="text-2xl font-bold text-orange-400">{tradingStats.maxDrawdown}%</p>;
                  <p className="text-sm text-gray-400">Max Drawdown</p>;
                </div>;
                <div className="text-center p-4 bg-white/5 rounded-lg">;
                  <p className="text-2xl font-bold text-cyan-400">A+</p>;
                  <p className="text-sm text-gray-400">Alpha Rating</p>;
                </div>;
              </div>;
            </CardContent>;
          </Card>;
        </TabsContent>;
      </Tabs>;
      <div className="flex justify-end">;
        <Button;
          onClick={handleSaveProfile}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600";
        >;
          Save Profile Changes;
        </Button>;
      </div>;
    </div>;
  );
}
