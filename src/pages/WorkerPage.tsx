import React from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { useApp } from '../contexts/AppContext'
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
  const { user } = useAuth()
  const { tasks, events, notifications, getStats } = useApp()
  const stats = getStats()

  const userTasks = tasks.filter(t => t.assignedTo === user?.id || t.createdBy === user?.id)
  const userEvents = events.filter(e => e.attendees.includes(user?.id || '') || e.createdBy === user?.id)
  const userNotifications = notifications.filter(n => n.userId === user?.id && !n.read)

  // Worker-specific features
  const workerFeatures = [
    {
      title: 'Task Management',
      description: 'View and manage your assigned tasks',
      icon: Clipboard,
      color: 'bg-blue-500',
      link: '/tasks'
    },
    {
      title: 'Time Tracking',
      description: 'Track your working hours and productivity',
      icon: Clock,
      color: 'bg-green-500',
      link: '/analytics'
    },
    {
      title: 'Task Completion',
      description: 'Mark tasks as completed and update progress',
      icon: CheckSquare,
      color: 'bg-purple-500',
      link: '/tasks'
    },
    {
      title: 'Issue Reporting',
      description: 'Report issues and request assistance',
      icon: AlertTriangle,
      color: 'bg-red-500',
      link: '/notifications'
    },
    {
      title: 'Work Reports',
      description: 'Generate and submit work reports',
      icon: FileText,
      color: 'bg-yellow-500',
      link: '/documents'
    },
    {
      title: 'Performance Analytics',
      description: 'View your performance metrics and statistics',
      icon: BarChart3,
      color: 'bg-indigo-500',
      link: '/analytics'
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
      link: '/notifications',
      badge: userNotifications.length
    },
    {
      title: 'Settings',
      description: 'Customize account settings and preferences',
      icon: Settings,
      color: 'bg-purple-500',
      link: '/settings'
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

  const workerStats = [
    { label: 'Active Tasks', value: userTasks.filter(t => t.status !== 'completed').length.toString(), icon: Clipboard, color: 'text-blue-600' },
    { label: 'Completed Today', value: userTasks.filter(t => t.status === 'completed' && t.completedAt && new Date(t.completedAt).toDateString() === new Date().toDateString()).length.toString(), icon: CheckSquare, color: 'text-green-600' },
    { label: 'My Events', value: userEvents.length.toString(), icon: Calendar, color: 'text-purple-600' },
    { label: 'Notifications', value: userNotifications.length.toString(), icon: Bell, color: 'text-red-600' }
  ]

  const todaysTasks = userTasks.filter(task => {
    const dueDate = new Date(task.dueDate)
    const today = new Date()
    return dueDate.toDateString() === today.toDateString() || task.status === 'in-progress'
  }).slice(0, 4)

  return (
    <Layout title="Worker Dashboard">
      <div className="space-y-8">
        {/* Worker Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workerStats.map((stat, index) => {
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
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow block relative"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg ${feature.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    {feature.badge && feature.badge > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Priority Tasks</h2>
            <Link to="/tasks" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All Tasks
            </Link>
          </div>
          <div className="space-y-4">
            {todaysTasks.length === 0 ? (
              <p className="text-gray-600 text-center py-4">No tasks for today</p>
            ) : (
              todaysTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="mr-3">
                        {task.status === 'completed' ? (
                          <CheckSquare className="w-5 h-5 text-green-500" />
                        ) : task.status === 'in-progress' ? (
                          <Clock className="w-5 h-5 text-blue-500" />
                        ) : (
                          <Clipboard className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <span className={`text-gray-900 font-medium ${task.status === 'completed' ? 'line-through' : ''}`}>
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center mt-1 ml-8 space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default WorkerPage