import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import { 
  Clipboard, 
  Clock, 
  CheckSquare, 
  AlertTriangle, 
  FileText, 
  BarChart3,
  Calendar,
  Bell,
  User,
  Settings,
  Activity
} from 'lucide-react'

const WorkerPage: React.FC = () => {
  // Worker-specific features
  const workerFeatures = [
    {
      title: 'Task Management',
      description: 'View and manage your assigned tasks',
      icon: Clipboard,
      color: 'bg-blue-500'
    },
    {
      title: 'Time Tracking',
      description: 'Track your working hours and productivity',
      icon: Clock,
      color: 'bg-green-500'
    },
    {
      title: 'Task Completion',
      description: 'Mark tasks as completed and update progress',
      icon: CheckSquare,
      color: 'bg-purple-500'
    },
    {
      title: 'Issue Reporting',
      description: 'Report issues and request assistance',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      title: 'Work Reports',
      description: 'Generate and submit work reports',
      icon: FileText,
      color: 'bg-yellow-500'
    },
    {
      title: 'Performance Analytics',
      description: 'View your performance metrics and statistics',
      icon: BarChart3,
      color: 'bg-indigo-500'
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
      title: 'Settings',
      description: 'Customize account settings and preferences',
      icon: Settings,
      color: 'bg-purple-500',
      link: '/user'
    },
    {
      title: 'Analytics',
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
    { label: 'Active Tasks', value: '12', icon: Clipboard, color: 'text-blue-600' },
    { label: 'Completed Today', value: '8', icon: CheckSquare, color: 'text-green-600' },
    { label: 'Hours Worked', value: '6.5', icon: Clock, color: 'text-purple-600' },
    { label: 'Pending Issues', value: '2', icon: AlertTriangle, color: 'text-red-600' }
  ]

  return (
    <Layout title="Worker Dashboard">
      <div className="space-y-8">
        {/* Worker Stats */}
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

        {/* Worker Features */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Worker Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workerFeatures.map((feature, index) => {
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

        {/* Today's Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Tasks</h2>
          <div className="space-y-4">
            {[
              { task: 'Complete project documentation', priority: 'High', status: 'In Progress' },
              { task: 'Review code changes', priority: 'Medium', status: 'Pending' },
              { task: 'Update client presentation', priority: 'High', status: 'Completed' },
              { task: 'Team meeting preparation', priority: 'Low', status: 'Pending' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <span className="text-gray-900 font-medium">{item.task}</span>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.priority === 'High' ? 'bg-red-100 text-red-800' :
                      item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.priority}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default WorkerPage