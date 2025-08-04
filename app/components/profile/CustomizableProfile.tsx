'use client'; import React, { useState } from 'react';
import { Card, CardHeader, CardContent,
      CardTitle
    } from "../../../components/ui/card";
import { Alert } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Eye, 
  Camera, 
  Edit3, 
  Save,
  Upload,
  AlertCircle,
  CheckCircle,
  Star,
  TrendingUp,
  BarChart3,
  Calendar,
  Target, Zap } from 'lucide-react';

interface UserProfile {
  id: string,
    username: string,
  email: string,
    fullName: string,
  bio: string,
  avatar: string, joinDate: string, tradingLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert', preferences: { theme: 'light' | 'dark' | 'auto',
    notifications: boolean,
    emailUpdates: boolean,
    publicProfile: boolean,
    showPerformance: boolean
  };
  stats: {
    totalTrades: number,
    winRate: number,
    totalReturn: number,
    currentStreak: number
  };
}

interface TabsProps {
  value: string,
    onValueChange: (value: string) => void,
    children: React.ReactNode
}

interface TabsListProps {
  children: React.ReactNode
}

interface TabsTriggerProps {
  value: string,
    children: React.ReactNode
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

// Simple Tabs Implementation
const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children }) => {
  return (
    <div className="w-full">
      {React.Children.map(children, (child) => 
        React.cloneElement(child as React.ReactElement, { activeTab: value, onTabChange: onValueChange })
      )}
    </div>
  );
};

const TabsList: React.FC<TabsListProps & { activeTab?: string, onTabChange?: (value: string) => void }> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-4">
      {React.Children.map(children, (child ) => 
        React.cloneElement(child as React.ReactElement, { activeTab,
      onTabChange
    })
      )}
    </div>
  );
};

const TabsTrigger: React.FC<TabsTriggerProps & { activeTab?: string; onTabChange?: (value: string) => void }> = ({ 
  value,
  children, 
  activeTab,
  onTabChange
}) => {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => onTabChange?.(value)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive 
          ? 'bg-white text-blue-600 shadow-sm' 
          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  );
};

const TabsContent: React.FC<TabsContentProps & { activeTab?: string }> = ({ value, children,
      activeTab
    }) => {
  if (activeTab !== value) return null;
  return <div>{children}</div>;
};

export default function CustomizableProfile() { const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false); const [profile, setProfile] = useState<UserProfile>({ id: '1', username: 'alphatrader_pro', email: 'john.doe@example.com', fullName: 'John Doe', bio: 'Professional trader specializing in AI-driven strategies and risk management. 8+ years experience in algorithmic trading.', avatar: '/api/placeholder/150/150', joinDate: '2023-03-15', tradingLevel: 'Expert', preferences: { theme: 'dark',
      notifications: true,
      emailUpdates: true,
      publicProfile: true,
      showPerformance: true
    },
    stats: {
      totalTrades: 2847,
      winRate: 73.2,
      totalReturn: 127.4,
      currentStreak: 12
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      case 'Expert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Profile Settings</h1>
          <p className="text-xl text-gray-600">Customize your trading profile and preferences</p>
        </div>

        {/* Profile Overview Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{profile.fullName}</h2>
                <p className="text-blue-100 mb-2">@{profile.username}</p>
                <Badge className={`${getLevelColor(profile.tradingLevel)} text-sm`}>
                  {profile.tradingLevel} Trader
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold">{profile.stats.totalTrades.toLocaleString()}</p>
                  <p className="text-blue-100 text-sm">Total Trades</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{profile.stats.winRate}%</p>
                  <p className="text-blue-100 text-sm">Win Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">+{profile.stats.totalReturn}%</p>
                  <p className="text-blue-100 text-sm">Total Return</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{profile.stats.currentStreak}</p>
                  <p className="text-blue-100 text-sm">Win Streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="performance">
              <BarChart3 className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Basic Information</span>
                    <Button
                      variant="outline"
                      size="sm"
              
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text" value={profile.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none, focus:ring-2,
      focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.fullName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text" value={profile.username} onChange={(e) => handleInputChange('username', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none, focus:ring-2,
      focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">@{profile.username}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email" value={profile.email} onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none, focus:ring-2,
      focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea value={profile.bio} onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none, focus:ring-2,
      focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.bio}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trading Level
                    </label>
                    {isEditing ? (
                      <select value={profile.tradingLevel} onChange={(e) => handleInputChange('tradingLevel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none, focus:ring-2,
      focus:ring-blue-500"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    ) : (
                      <Badge className={getLevelColor(profile.tradingLevel)}>
                        {profile.tradingLevel}
                      </Badge>
                    )}
                  </div>
                  
                  {isEditing && (
                    <Button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="font-semibold">Total Trades</p>
                          <p className="text-sm text-gray-600">All time</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">
                        {profile.stats.totalTrades.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Target className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="font-semibold">Win Rate</p>
                          <p className="text-sm text-gray-600">Success percentage</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {profile.stats.winRate}%
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-purple-600" />
                        <div>
                          <p className="font-semibold">Total Return</p>
                          <p className="text-sm text-gray-600">Portfolio performance</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">
                        +{profile.stats.totalReturn}%
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Zap className="w-8 h-8 text-yellow-600" />
                        <div>
                          <p className="font-semibold">Current Streak</p>
                          <p className="text-sm text-gray-600">Consecutive wins</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-yellow-600">
                        {profile.stats.currentStreak}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Theme Preference
                  </label> <div className="flex gap-4"> {['light', 'dark', 'auto'].map((theme) => (
                      <button key={theme} onClick={() => handlePreferenceChange('theme', theme)}
                        className={`px-4 py-2 rounded-md border ${ profile.preferences.theme === theme ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Updates</p>
                    <p className="text-sm text-gray-600">Receive trading insights and market updates</p>
                  </div> <button onClick={() => handlePreferenceChange('emailUpdates', !profile.preferences.emailUpdates)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ profile.preferences.emailUpdates ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ profile.preferences.emailUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-600">Real-time alerts for price movements and signals</p>
                  </div> <button onClick={() => handlePreferenceChange('notifications', !profile.preferences.notifications)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ profile.preferences.notifications ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ profile.preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Public Profile</p>
                    <p className="text-sm text-gray-600">Allow others to view your trading statistics</p>
                  </div> <button onClick={() => handlePreferenceChange('publicProfile', !profile.preferences.publicProfile)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ profile.preferences.publicProfile ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ profile.preferences.publicProfile ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Performance</p>
                    <p className="text-sm text-gray-600">Display your trading performance to other users</p>
                  </div> <button onClick={() => handlePreferenceChange('showPerformance', !profile.preferences.showPerformance)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ profile.preferences.showPerformance ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ profile.preferences.showPerformance ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <div className="ml-2">
                    <h4 className="font-semibold text-yellow-800">Privacy Notice</h4>
                    <p className="text-yellow-700 text-sm mt-1">
                      Your personal information and trading data are protected with bank-grade encryption. 
                      We never share your data with third parties without your explicit consent.
                    </p>
                  </div>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
        
      </div>
    </div>
  );
}
