import React from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { User, Calendar, Bell, Settings, BarChart3, FileText, Users } from 'lucide-react'

const UserPage: React.FC = () => {
  const { user } = useAuth()

  const features = [
    {
      title: 'Profile Management',
      description: 'Update your personal information and preferences',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      title: 'Calendar',
      description: 'View and manage your schedule and appointments',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: 'Notifications',
      description: 'Stay updated with important alerts and messages',
      icon: Bell,
      color: 'bg-yellow-500'
    },
    {
      title: 'Settings',
      description: 'Customize your account settings and preferences',
      icon: Settings,
      color: 'bg-purple-500'
    },
    {
      title: 'Analytics',
      description: 'View your activity statistics and reports',
      icon: BarChart3,
      color: 'bg-indigo-500'
    },
    {
      title: 'Documents',
      description: 'Access and manage your important documents',
      icon: FileText,
      color: 'bg-red-500'
    }
  ]

  return (
    <Layout title="User Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's your personalized dashboard with quick access to all your features.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Notifications</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${feature.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Updated profile information', time: '2 hours ago' },
              { action: 'Completed task: Review documents', time: '4 hours ago' },
              { action: 'Joined team meeting', time: '1 day ago' },
              { action: 'Updated notification settings', time: '2 days ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-900">{activity.action}</span>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserPage