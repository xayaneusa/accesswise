import React from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { useApp } from '../contexts/AppContext'
import { User, Calendar, Bell, Settings, BarChart3, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

const UserPage: React.FC = () => {
  const { user } = useAuth()
  const { tasks, events, notifications, getStats } = useApp()
  const stats = getStats()

  const userTasks = tasks.filter(t => t.assignedTo === user?.id || t.createdBy === user?.id)
  const userEvents = events.filter(e => e.attendees.includes(user?.id || '') || e.createdBy === user?.id)
  const userNotifications = notifications.filter(n => n.userId === user?.id && !n.read)

  const features = [
    {
      title: 'Profile Management',
      description: 'Update your personal information and preferences',
      icon: User,
      color: 'bg-blue-500',
      link: '/profile'
    },
    {
      title: 'Calendar',
      description: 'View and manage your schedule and appointments',
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
      title: 'Tasks',
      description: 'Manage your tasks and track progress',
      icon: CheckCircle,
      color: 'bg-purple-500',
      link: '/tasks'
    },
    {
      title: 'Analytics',
      description: 'View your activity statistics and reports',
      icon: BarChart3,
      color: 'bg-indigo-500',
      link: '/analytics'
    },
    {
      title: 'Documents',
      description: 'Access and manage your important documents',
      icon: FileText,
      color: 'bg-red-500',
      link: '/documents'
    },
    {
      title: 'Settings',
      description: 'Customize your account settings and preferences',
      icon: Settings,
      color: 'bg-gray-500',
      link: '/settings'
    }
  ]

  const recentTasks = userTasks.slice(0, 5)
  const upcomingEvents = userEvents
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  return (
    <Layout title="Dashboard">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">My Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{userTasks.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{userNotifications.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userTasks.filter(t => t.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
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

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
              <Link to="/tasks" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentTasks.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No tasks yet</p>
              ) : (
                recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <div className="mr-3">
                        {task.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : task.status === 'in-progress' ? (
                          <Clock className="w-5 h-5 text-blue-500" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      <div>
                        <span className={`text-gray-900 ${task.status === 'completed' ? 'line-through' : ''}`}>
                          {task.title}
                        </span>
                        <div className="text-xs text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
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
                ))
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
              <Link to="/calendar" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Calendar
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No upcoming events</p>
              ) : (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-900 font-medium">{event.title}</span>
                      <div className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserPage