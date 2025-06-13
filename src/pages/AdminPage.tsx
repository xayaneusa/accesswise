import React from 'react'
import Layout from '../components/Layout'
import { useApp } from '../contexts/AppContext'
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
  UserCheck,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react'

const AdminPage: React.FC = () => {
  const { getStats, systemLogs, allUsers, tasks, events } = useApp()
  const stats = getStats()

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
      title: 'System Logs',
      description: 'View and analyze system logs and audit trails',
      icon: FileText,
      color: 'bg-yellow-500',
      link: '/admin/logs'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View comprehensive system analytics and reports',
      icon: BarChart3,
      color: 'bg-indigo-500',
      link: '/analytics'
    },
    {
      title: 'System Settings',
      description: 'Configure system-wide settings and preferences',
      icon: Settings,
      color: 'bg-gray-500',
      link: '/settings'
    },
    {
      title: 'Security Center',
      description: 'Monitor security events and manage access controls',
      icon: Shield,
      color: 'bg-red-500',
      link: '/settings'
    },
    {
      title: 'Database Management',
      description: 'Manage database operations and backups',
      icon: Database,
      color: 'bg-green-500',
      link: '/settings'
    }
  ]

  // Links to main page features (from UserPage)
  const mainPageFeatures = [
    {
      title: 'Profile Management',
      description: 'Update personal information and preferences',
      icon: User,
      color: 'bg-blue-500',
      link: '/profile'
    },
    {
      title: 'Calendar',
      description: 'View and manage schedule and appointments',
      icon: Calendar,
      color: 'bg-green-500',
      link: '/calendar'
    },
    {
      title: 'Notifications',
      description: 'Stay updated with important alerts and messages',
      icon: Bell,
      color: 'bg-yellow-500',
      link: '/notifications'
    },
    {
      title: 'Tasks',
      description: 'Manage tasks and track progress',
      icon: CheckCircle,
      color: 'bg-purple-500',
      link: '/tasks'
    },
    {
      title: 'Analytics',
      description: 'View activity statistics and reports',
      icon: Activity,
      color: 'bg-indigo-500',
      link: '/analytics'
    },
    {
      title: 'Documents',
      description: 'Access and manage important documents',
      icon: FileText,
      color: 'bg-red-500',
      link: '/documents'
    }
  ]

  const adminStats = [
    { label: 'Total Users', value: stats.totalUsers.toString(), icon: Users, color: 'text-blue-600' },
    { label: 'Active Users', value: stats.activeUsers.toString(), icon: UserCheck, color: 'text-green-600' },
    { label: 'Total Tasks', value: stats.totalTasks.toString(), icon: CheckCircle, color: 'text-purple-600' },
    { label: 'System Logs', value: systemLogs.length.toString(), icon: FileText, color: 'text-yellow-600' }
  ]

  const recentLogs = systemLogs.slice(0, 5)
  const recentTasks = tasks.slice(0, 5)

  return (
    <Layout title="Admin Panel">
      <div className="space-y-8">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminStats.map((stat, index) => {
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

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent System Logs */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent System Activity</h2>
              <Link to="/admin/logs" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Logs
              </Link>
            </div>
            <div className="space-y-4">
              {recentLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <span className="text-gray-900 font-medium">{log.action}</span>
                    <div className="text-sm text-gray-600">{log.userName}</div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Tasks Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
              <Link to="/tasks" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Tasks
              </Link>
            </div>
            <div className="space-y-4">
              {recentTasks.map((task) => {
                const assignedUser = allUsers.find(u => u.id === task.assignedTo)
                return (
                  <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <div className="mr-3">
                        {task.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : task.status === 'in-progress' ? (
                          <Clock className="w-4 h-4 text-blue-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <div>
                        <span className="text-gray-900 font-medium">{task.title}</span>
                        <div className="text-sm text-gray-600">{assignedUser?.name}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminPage