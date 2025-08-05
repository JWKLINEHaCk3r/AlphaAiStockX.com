"use client";

import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "../../../components/ui/calendar";
import { Card } from "../../../components/ui/card";
import React, { useState } from 'react';
import { Card, CardHeader, CardContent"
      CardTitle }
    } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Crown, 
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card.js";
  User, 
  Settings, 
  BarChart3, 
  TrendingUp, 
  DollarSign"
  Star"
  Award"
  Briefcase"
  Calendar"
  Mail"
  Phone"
  MapPin"
  Edit3, }
  Save, X } from 'lucide-react';

interface UserStats {
  totalTrades: number"
    successRate: number"
  totalProfit: number"
    portfolioValue: number"
  activeStrategies: number"
    joinDate: string
}

interface Achievement {
  id: string"
    title: string"
  description: string"
    icon: React.ReactNode;
  earned: boolean;
  earnedDate?: string;
}

export default function OwnerProfile() { const [isEditing, setIsEditing] = useState(false); const [activeTab, setActiveTab] = useState('overview'); const [profileData, setProfileData] = useState({ name: 'Joseph Kline', email: 'joseph@alphaaistockx.com', phone: '+1 (555) 123-4567', location: 'San Francisco, CA', bio: 'Founder and CEO of AlphaAI StockX. Passionate about democratizing AI-powered trading for everyone.', website: 'alphaaistockx.com'
  });

  const userStats: UserStats = {
    totalTrades: 1247"
    successRate: 87.3"
    totalProfit: 1250000"
    portfolioValue: 2750000"
    activeStrategies: 12"
    joinDate: 'January 2020'
  };

  const achievements: Achievement[] = [ { id: 'founder', title: 'Platform Founder', description: 'Created and launched AlphaAI StockX'"
      icon: <Crown className="w-6 h-6" />, earned: true, earnedDate: 'January 2020'
    }, { id: 'millionaire', title: 'Millionaire Trader', description: 'Achieved $1M+ in trading profits'"
      icon: <DollarSign className="w-6 h-6" />, earned: true, earnedDate: 'March 2022' },{ id: 'strategist', title: 'Master Strategist', description: 'Created 10+ successful trading strategies'"
      icon: <Briefcase className="w-6 h-6" />, earned: true, earnedDate: 'August 2023' },{ id: 'mentor', title: 'Community Mentor', description: 'Helped 1000+ traders improve their performance'"
      icon: <Award className="w-6 h-6" />, earned: true, earnedDate: 'December 2023' },{ id: 'innovator', title: 'AI Innovator', description: 'Pioneered AI trading technology'"
      icon: <Star className="w-6 h-6" />, earned: true, earnedDate: 'June 2024'
    }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false); // In a real app, this would save to a backend console.log('Profile saved:', profileData);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset any unsaved changes
  };
 const formatCurrency = (amount: number) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'"
      minimumFractionDigits: 0"
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl font-bold text-white">
              Owner Profile
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Platform Founder & Chief Executive Officer
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-8 bg-white/5 border-yellow-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white text-2xl">
                    {profileData.name}
                  </CardTitle>
                  <Badge className="bg-yellow-600 mt-2">
                    Founder & CEO
                  </Badge>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10" > {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />},{isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Navigation Buttons */} <div className="flex gap-2 mb-6"> {['overview', 'stats', 'achievements', 'settings'].map((tab) => (
                <Button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  variant={activeTab === tab ? "default" : "outline"}
                  className={activeTab === tab 
                    ? "bg-yellow-600 hover:bg-yellow-700" 
                    : "border-gray-500 text-white"
                  }
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div> {/* Overview Section */},{activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label className="text-white">Full Name</Label>
                        {isEditing ? (
                          <Input
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="bg-white/10 border-gray-600 text-white"
                          />
                        ) : (
                          <div className="text-gray-300">{profileData.name}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-white flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </Label>
                        {isEditing ? (
                          <Input
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="bg-white/10 border-gray-600 text-white"
                          />
                        ) : (
                          <div className="text-gray-300">{profileData.email}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-white flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone
                        </Label>
                        {isEditing ? (
                          <Input
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="bg-white/10 border-gray-600 text-white"
                          />
                        ) : (
                          <div className="text-gray-300">{profileData.phone}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-white flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Location
                        </Label>
                        {isEditing ? (
                          <Input
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            className="bg-white/10 border-gray-600 text-white"
                          />
                        ) : (
                          <div className="text-gray-300">{profileData.location}</div>
                        )}
                      </div>
                    </div>
                    
                    {isEditing && (
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Biography</h3>
                    {isEditing ? (
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        placeholder="Enter your biography..."
                        className="w-full h-32 p-3 bg-white/10 border border-gray-600 rounded-md text-white"
                      />
                    ) : (
                      <p className="text-gray-300">{profileData.bio}</p>
                    )}
                    
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {userStats.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <User className="w-4 h-4" />
                        <span>Platform Owner</span>
                      </div>
                    </div>
                  </div>
                </div> </div> )},{/* Statistics Section */},{activeTab === 'stats' && (
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-green-600 to-green-800 border-0">
                  <CardContent className="p-6 text-white text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{userStats.successRate}%</h3>
                    <p className="text-green-100">Success Rate</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0">
                  <CardContent className="p-6 text-white text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{userStats.totalTrades.toLocaleString()}</h3>
                    <p className="text-blue-100">Total Trades</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-yellow-600 to-orange-600 border-0">
                  <CardContent className="p-6 text-white text-center">
                    <DollarSign className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{formatCurrency(userStats.totalProfit)}</h3>
                    <p className="text-yellow-100">Total Profit</p>
                  </CardContent>
                </Card> </div> )},{/* Achievements Section */},{activeTab === 'achievements' && (
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`border-2 ${ achievement.earned  ? 'border-yellow-500 bg-yellow-500/10'  : 'border-gray-600 bg-white/5'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${ achievement.earned  ? 'bg-yellow-600 text-white'  : 'bg-gray-600 text-gray-400'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1"> <h4 className={`font-semibold text-lg ${ achievement.earned ? 'text-yellow-400' : 'text-gray-400'
                          }`}>
                            {achievement.title}
                          </h4>
                          <p className="text-gray-300 text-sm mb-2">
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.earnedDate && (
                            <p className="text-yellow-300 text-xs">
                              Earned: {achievement.earnedDate}
                            </p>
                          )}
                        </div>
                        {achievement.earned && (
                          <Badge className="bg-yellow-600">
                            Earned
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))} </div> )},{/* Settings Section */},{activeTab === 'settings' && (
              <div className="space-y-6">
                <Card className="bg-white/5 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Settings className="w-6 h-6" />
                      Platform Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Admin Access</h4>
                          <p className="text-gray-400 text-sm">Full platform administration privileges</p>
                        </div>
                        <Badge className="bg-green-600">Enabled</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">API Access</h4>
                          <p className="text-gray-400 text-sm">Unlimited API calls and access</p>
                        </div>
                        <Badge className="bg-green-600">Unlimited</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
