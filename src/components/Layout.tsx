import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useApp } from '../contexts/AppContext'
import { LogOut, User, Settings, Home, Bell, Calendar, FileText, BarChart3, Users, Shield } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
  title: string
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth()
  const { notifications, getStats } = useApp()
  const location = useLocation()
  const stats = getStats()

  const handleLogout = () => {
    logout()
  }

  const getNavLinks = () => {
    if (!user) return []

    const baseLinks = [
      { to: '/user', label: 'Dashboard', icon: Home },
      { to: '/profile', label: 'Profile', icon: User },
      { to: '/calendar', label: 'Calendar', icon: Calendar },
      { to: '/notifications', label: 'Notifications', icon: Bell, badge: stats.unreadNotifications },
      { to: '/tasks', label: 'Tasks', icon: FileText },
      { to: '/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/documents', label: 'Documents', icon: FileText },
      { to: '/settings', label: 'Settings', icon: Settings }
    ]

    if (user.role === 'admin') {
      return [
        ...baseLinks,
        { to: '/admin', label: 'Admin Panel', icon: Shield },
        { to: '/admin/users', label: 'User Management', icon: Users }
      ]
    } else if (user.role === 'worker') {
      return [
        ...baseLinks,
        { to: '/worker', label: 'Worker Panel', icon: Settings }
      ]
    }

    return baseLinks
  }

  const userNotifications = notifications.filter(n => n.userId === user?.id && !n.read)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              
              {/* Navigation Links */}
              <div className="hidden lg:flex space-x-4">
                {getNavLinks().slice(0, 6).map((link) => {
                  const Icon = link.icon
                  const isActive = location.pathname === link.to
                  
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {link.label}
                      {link.badge && link.badge > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  {stats.totalTasks} tasks
                </span>
                <span className="flex items-center">
                  <Bell className="w-4 h-4 mr-1" />
                  {userNotifications.length} new
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">{user?.name}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                  {user?.role}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex space-x-2 py-2 overflow-x-auto">
            {getNavLinks().map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.to
              
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors relative ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {link.label}
                  {link.badge && link.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {link.badge > 9 ? '9+' : link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

export default Layout