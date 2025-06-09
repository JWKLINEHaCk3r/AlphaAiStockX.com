"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  Save,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Bot,
  Brain,
  Target,
  Key,
  Lock,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function UserProfile({ user, onLogout, onOpenSubscription }) {
  const [activeTab, setActiveTab] = useState("account")
  const [formState, setFormState] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    twoFactor: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (type, checked) => {
    setFormState((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [type]: checked },
    }))
  }

  const handleSaveProfile = async () => {
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would call an API to update the user profile
      // For demo purposes, we'll just show a success message
      setSuccess("Profile updated successfully!")
    } catch (err) {
      setError("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getPlanDetails = () => {
    switch (user.subscription) {
      case "basic":
        return {
          name: "Basic",
          color: "blue",
          icon: Target,
          features: ["Real-time market data", "Basic AI insights", "Technical indicators", "Portfolio tracking"],
        }
      case "pro":
        return {
          name: "Pro",
          color: "purple",
          icon: Brain,
          features: [
            "Real-time market data",
            "Advanced AI insights",
            "Technical indicators",
            "Portfolio tracking & optimization",
            "News sentiment analysis",
            "5 AI trading strategies",
            "Risk analysis tools",
          ],
        }
      case "ultimate":
        return {
          name: "Ultimate",
          color: "pink",
          icon: Bot,
          features: [
            "Real-time market data",
            "Advanced AI insights",
            "Technical indicators",
            "Portfolio tracking & optimization",
            "News sentiment analysis",
            "All AI trading strategies",
            "AutoTrade Bot",
            "Advanced risk analysis tools",
          ],
        }
      default:
        return {
          name: "Free",
          color: "gray",
          icon: Target,
          features: ["Limited market data", "Basic portfolio tracking"],
        }
    }
  }

  const planDetails = getPlanDetails()
  const PlanIcon = planDetails.icon

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-purple-500">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
            <AvatarFallback className="bg-purple-900 text-white">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>
        <Button variant="outline" className="border-red-500/30 text-red-400 hover:text-red-300" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-black/20 border-purple-500/30">
          <TabsTrigger value="account" className="data-[state=active]:bg-purple-500/20">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="subscription" className="data-[state=active]:bg-purple-500/20">
            <CreditCard className="h-4 w-4 mr-2" />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-500/20">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-purple-500/20">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Account Information</CardTitle>
              <CardDescription className="text-gray-400">Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 text-red-300">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-900/20 border-green-500/50 text-green-300">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  className="bg-black/20 border-purple-500/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className="bg-black/20 border-purple-500/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  className="bg-black/20 border-purple-500/30 text-white"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveProfile}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Subscription Plan</CardTitle>
                  <CardDescription className="text-gray-400">Manage your subscription</CardDescription>
                </div>
                <Button
                  onClick={onOpenSubscription}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {user.subscription ? "Change Plan" : "Upgrade Now"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30">
                <div className={`p-3 rounded-full bg-${planDetails.color}-500/20`}>
                  <PlanIcon className={`h-6 w-6 text-${planDetails.color}-400`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-white">{planDetails.name} Plan</h3>
                    <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500">Current</Badge>
                  </div>
                  <p className="text-sm text-gray-400">
                    {user.subscription ? "Renews on January 1, 2026" : "Limited features"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white">
                    {user.subscription === "basic"
                      ? "$49.99"
                      : user.subscription === "pro"
                        ? "$100.00"
                        : user.subscription === "ultimate"
                          ? "$175.00"
                          : "$0"}
                    <span className="text-sm text-gray-400">/mo</span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Included Features</h4>
                <ul className="space-y-2">
                  {planDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-purple-500/20">
                <h4 className="text-white font-semibold mb-3">Payment Method</h4>
                {user.subscription ? (
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-white">Visa ending in 4242</p>
                        <p className="text-sm text-gray-400">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-purple-500/30 text-white">
                      Update
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-400">No payment method on file</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription className="text-gray-400">Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-400">Receive alerts and updates via email</p>
                  </div>
                  <Switch
                    checked={formState.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-400">Receive alerts on your device</p>
                  </div>
                  <Switch
                    checked={formState.notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-400">Receive alerts via text message</p>
                  </div>
                  <Switch
                    checked={formState.notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-purple-500/20">
                <h4 className="text-white font-semibold mb-3">Notification Types</h4>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="trade-alerts" className="data-[state=checked]:bg-purple-500" defaultChecked />
                    <label htmlFor="trade-alerts" className="text-sm text-gray-300 cursor-pointer">
                      Trade alerts and signals
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-alerts" className="data-[state=checked]:bg-purple-500" defaultChecked />
                    <label htmlFor="price-alerts" className="text-sm text-gray-300 cursor-pointer">
                      Price movement alerts
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="news-alerts" className="data-[state=checked]:bg-purple-500" defaultChecked />
                    <label htmlFor="news-alerts" className="text-sm text-gray-300 cursor-pointer">
                      Breaking news alerts
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="account-updates" className="data-[state=checked]:bg-purple-500" defaultChecked />
                    <label htmlFor="account-updates" className="text-sm text-gray-300 cursor-pointer">
                      Account updates
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing" className="data-[state=checked]:bg-purple-500" />
                    <label htmlFor="marketing" className="text-sm text-gray-300 cursor-pointer">
                      Marketing and promotional emails
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveProfile}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
              <CardDescription className="text-gray-400">Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={formState.twoFactor}
                    onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, twoFactor: checked }))}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>

                <div className="pt-4 border-t border-purple-500/20">
                  <h4 className="text-white font-semibold mb-3">Change Password</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-white">
                        Current Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="currentPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-black/20 border-purple-500/30 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-white">
                        New Password
                      </Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-black/20 border-purple-500/30 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-black/20 border-purple-500/30 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-500/20">
                  <h4 className="text-white font-semibold mb-3">Login Sessions</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white">Current Session</p>
                          <p className="text-xs text-gray-400">Chrome on Windows • New York, USA</p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                    </div>

                    <div className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white">Mobile App</p>
                          <p className="text-xs text-gray-400">iOS 16 • Last active 2 days ago</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500/30 text-red-400 hover:text-red-300"
                        >
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveProfile}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
