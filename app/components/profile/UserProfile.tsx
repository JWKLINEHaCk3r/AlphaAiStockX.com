'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  User,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Activity,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Edit,
  Download,
  Trash2,
} from 'lucide-react';

interface UserProfileProps {
  user: any;
  onUpdate: (user: any) => void;
}

export default function UserProfile({ user, onUpdate }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    location: user.location || '',
    bio: user.bio || '',
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketAlerts: true,
    educationUpdates: true,
    weeklyReports: true,
    darkMode: true,
    autoSave: true,
    ...user.preferences,
  });

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      preferences,
    };
    onUpdate(updatedUser);
    setEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (preference: string, value: boolean) => {
    setPreferences((prev: any) => ({ ...prev, [preference]: value }));
  };

  const getSubscriptionColor = (subscription: string) => {
    const colors: { [key: string]: string } = {
      free: 'bg-slate-600',
      basic: 'bg-blue-600',
      premium: 'bg-purple-600',
      enterprise: 'bg-yellow-600',
    };
    return colors[subscription] || colors.free;
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-slate-400">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getSubscriptionColor(user.subscription)}>
                    {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                  </Badge>
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant={editing ? 'default' : 'outline'}
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-2"
            >
              {editing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              {editing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 backdrop-blur-sm">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Personal Information</CardTitle>
              <CardDescription className="text-slate-400">
                Update your personal details and profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                      disabled={!editing}
                      className="pl-10 bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      disabled={!editing}
                      className="pl-10 bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={e => handleInputChange('phone', e.target.value)}
                      disabled={!editing}
                      placeholder="Enter phone number"
                      className="pl-10 bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={e => handleInputChange('location', e.target.value)}
                      disabled={!editing}
                      placeholder="Enter your location"
                      className="pl-10 bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white">
                  Bio
                </Label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={e => handleInputChange('bio', e.target.value)}
                  disabled={!editing}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white disabled:opacity-50 resize-none"
                />
              </div>

              {editing && (
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Stats */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-400" />
                Activity Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">127</div>
                  <div className="text-slate-400 text-sm">Stocks Analyzed</div>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">23</div>
                  <div className="text-slate-400 text-sm">Lessons Completed</div>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">89%</div>
                  <div className="text-slate-400 text-sm">Test Score Average</div>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">15</div>
                  <div className="text-slate-400 text-sm">Days Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Application Preferences</CardTitle>
              <CardDescription className="text-slate-400">
                Customize your experience with AlphaAIStockX
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Dark Mode</div>
                    <div className="text-slate-400 text-sm">
                      Use dark theme throughout the application
                    </div>
                  </div>
                  <Switch
                    checked={preferences.darkMode}
                    onCheckedChange={checked => handlePreferenceChange('darkMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Auto-save</div>
                    <div className="text-slate-400 text-sm">
                      Automatically save your work and preferences
                    </div>
                  </div>
                  <Switch
                    checked={preferences.autoSave}
                    onCheckedChange={checked => handlePreferenceChange('autoSave', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Advanced Charts</div>
                    <div className="text-slate-400 text-sm">
                      Show advanced technical analysis charts
                    </div>
                  </div>
                  <Switch
                    checked={preferences.advancedCharts}
                    onCheckedChange={checked => handlePreferenceChange('advancedCharts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Real-time Data</div>
                    <div className="text-slate-400 text-sm">
                      Enable real-time market data updates
                    </div>
                  </div>
                  <Switch
                    checked={preferences.realTimeData}
                    onCheckedChange={checked => handlePreferenceChange('realTimeData', checked)}
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="w-full">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Notification Settings</CardTitle>
              <CardDescription className="text-slate-400">
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Email Notifications</div>
                    <div className="text-slate-400 text-sm">Receive updates via email</div>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={checked =>
                      handlePreferenceChange('emailNotifications', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Push Notifications</div>
                    <div className="text-slate-400 text-sm">Receive browser push notifications</div>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={checked =>
                      handlePreferenceChange('pushNotifications', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Market Alerts</div>
                    <div className="text-slate-400 text-sm">
                      Get notified about important market movements
                    </div>
                  </div>
                  <Switch
                    checked={preferences.marketAlerts}
                    onCheckedChange={checked => handlePreferenceChange('marketAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Education Updates</div>
                    <div className="text-slate-400 text-sm">
                      Notifications about new courses and content
                    </div>
                  </div>
                  <Switch
                    checked={preferences.educationUpdates}
                    onCheckedChange={checked => handlePreferenceChange('educationUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Weekly Reports</div>
                    <div className="text-slate-400 text-sm">
                      Receive weekly performance summaries
                    </div>
                  </div>
                  <Switch
                    checked={preferences.weeklyReports}
                    onCheckedChange={checked => handlePreferenceChange('weeklyReports', checked)}
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="w-full">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-red-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-400" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-slate-400">
                Manage your account security and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Password</h4>
                  <p className="text-slate-400 text-sm mb-3">Last changed 30 days ago</p>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Two-Factor Authentication</h4>
                  <p className="text-slate-400 text-sm mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Active Sessions</h4>
                  <p className="text-slate-400 text-sm mb-3">
                    Manage devices that are signed into your account
                  </p>
                  <Button variant="outline" size="sm">
                    View Sessions
                  </Button>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Data Export</h4>
                  <p className="text-slate-400 text-sm mb-3">Download a copy of your data</p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>

                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-2">Danger Zone</h4>
                  <p className="text-slate-400 text-sm mb-3">
                    Permanently delete your account and all data
                  </p>
                  <Button variant="destructive" size="sm" className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-400" />
                Billing & Subscription
              </CardTitle>
              <CardDescription className="text-slate-400">
                Manage your subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-white font-semibold">Current Plan</h4>
                    <p className="text-slate-400 text-sm">
                      {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)} Plan
                    </p>
                  </div>
                  <Badge className={getSubscriptionColor(user.subscription)}>
                    {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Change Plan
                  </Button>
                  <Button variant="outline" size="sm">
                    View Usage
                  </Button>
                </div>
              </div>

              {user.subscription !== 'free' && (
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Payment Method</h4>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <span className="text-slate-300">•••• •••• •••• 4242</span>
                    <span className="text-slate-400 text-sm">Expires 12/25</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Update Payment Method
                  </Button>
                </div>
              )}

              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Billing History</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Dec 2024 - Premium Plan</span>
                    <span className="text-white">$79.00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Nov 2024 - Premium Plan</span>
                    <span className="text-white">$79.00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Oct 2024 - Basic Plan</span>
                    <span className="text-white">$29.00</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  View All Invoices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
