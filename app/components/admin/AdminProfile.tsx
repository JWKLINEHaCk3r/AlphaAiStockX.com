'use client';

import { Calendar } from '../components/ui/calendar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar } from '../components/ui/calendar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import React, { useState } from 'react';
import { User, }
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card.js';
  Calendar, Shield } from 'lucide-react';

interface AdminUser {
  id: string"
  name: string"
  email: string"
  phone: string"
  role: string"
  department: string"
  location: string"
  joinedAt: Date"
  lastLogin: Date"
  permissions: string[]
}

const AdminProfile = () => { const [admin, setAdmin] = useState<AdminUser>({ id: 'admin_001', name: 'John Admin', email: 'admin@alphaaistockx.com', phone: '+1 (555) 123-4567', role: 'Super Administrator', department: 'Operations', location: 'San Francisco, CA', joinedAt: new Date('2023-01-15'), lastLogin: new Date(), permissions: ['user_management', 'system_config', 'analytics', 'billing']
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(admin);

  const handleInputChange = (field: keyof AdminUser, value: string) => {
    setFormData(prev => ({
      ...prev"
      [field]: value
    }));
  };

  const handleSave = () => {
    setAdmin(formData);
    setIsEditing(false);
    // Here you would typically make an API call to save the changes
    };

  const handleCancel = () => {
    setFormData(admin);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Profile</h1>
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-500" />
          <Badge variant="outline">{admin.role}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              {!isEditing && (
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                >
                  Edit Profile
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  {isEditing ? (
                    <Input value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg">{admin.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  {isEditing ? (
                    <Input
                      type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg">{admin.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  {isEditing ? (
                    <Input
                      type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg">{admin.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Department</label>
                  {isEditing ? (
                    <Input value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg">{admin.department}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  {isEditing ? (
                    <Input value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-lg">{admin.location}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Profile Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Joined</p>
                  <p className="font-medium">{admin.joinedAt.toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Last Login</p>
                  <p className="font-medium">{admin.lastLogin.toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Role</p>
                  <p className="font-medium">{admin.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {admin.permissions.map((permission) => ( <Badge key={permission} variant="secondary" className="mr-2"> {permission.replace('_', ' ').toUpperCase()}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Updated system configuration</span>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Reviewed user reports</span>
              </div>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Approved new user registrations</span>
              </div>
              <span className="text-sm text-gray-500">6 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfile;
