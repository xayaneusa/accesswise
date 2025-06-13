import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import { 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  Database, 
  FileText,
  Calendar,
  Bell,
  User,
  Activity,
  Cog,
  UserCheck
} from 'lucide-react'

const AdminPage: React.FC = () => {
  // Admin-specific features
  const adminFeatures = [
    {
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: Users,
      color: 'bg-blue-500',
      link: '/admin/users'
    },
    {
      title: 'System Settings',
      description: 'Configure system-wide settings and preferences',
      icon: Settings,
      color: 'bg-gray-500',
      link: '/admin/settings'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View comprehensive system analytics and reports',
      icon: BarChart3,
      color: 'bg-indigo-500',
      link: '/admin/analytics'
    },
    {
      title: 'Security Center',
      description: 'Monitor security events and manage access controls',
      icon: Shield,
      color: 'bg-red-500',
      link: '/admin/security'
    },
    {
      title: 'Database Management',
      description: 'Manage database operations and backups',
      icon: Database,
      color: 'bg-green-500',
      link: '/admin/database'
    },
    {
      title: 'System Logs',
      description: 'View and analyze system logs and audit trails',
      icon: FileText,
      color: 'bg-yellow-500',
      link: '/admin/logs'
    }
  ]

  // Links to main page features (from UserPage)
  const mainPageFeatures = [
    {
      title: 'Profile Management',
      description: 'Update personal information and preferences',
      icon: User,
      color: 'bg-blue-500',
      link: '/user'
    },
    {
      title: 'Calendar',
      description: 'View and manage schedule and appointments',
      icon: Calendar,
      color: 'bg-green-500',
      link: '/user'
    },
    {
      title: 'Notifications',
      description: 'Stay updated with important alerts and messages',
      icon: Bell,
      color: 'bg-yellow-500',
      link: '/user'
    },
    {
      title: 'User Settings',
      description: 'Customize account settings and preferences',
      icon: Cog,
      color: 'bg-purple-500',
      link: '/user'
    },
    {
      title: 'Activity Reports',
      description: 'View activity statistics and reports',
      icon: Activity,
      color: 'bg-indigo-500',
      link: '/user'
    },
    {
      title: 'Documents',
      description: 'Access and manage important documents',
      icon: FileText,
      color: 'bg-red-500',
      link: '/user'
    }
  ]

  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-600' },
    { label: 'Active Sessions', value: '89', icon: UserCheck, color: 'text-green-600' },
    { label: 'System Alerts', value: '12', icon: Bell, color: 'text-yellow-600' },
    { label: 'Database Size', value: '2.4GB', icon: Database, color: 'text-purple-600' }
  ]

  return (
    <Layout title="Admin Panel">
      <div className="space-y-8">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Admin Features */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Admin Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    // For demo purposes, just show an alert
                    alert(`${feature.title} feature would be implemented here`)
                  }}
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
        </div>

        {/* Quick Access to Main Page Features */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Quick Access to User Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainPageFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow block"
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
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Admin Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Admin Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Created new user account for john.doe@example.com', time: '1 hour ago' },
              { action: 'Updated system security settings', time: '3 hours ago' },
              { action: 'Performed database backup', time: '6 hours ago' },
              { action: 'Reviewed and approved user permissions', time: '1 day ago' },
              { action: 'Updated system configuration', time: '2 days ago' }
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

export default AdminPage