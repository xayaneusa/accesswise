import React, { createContext, useContext, useState, useEffect } from 'react'

// Types
export interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in-progress' | 'completed'
  assignedTo: string
  createdBy: string
  createdAt: Date
  dueDate: Date
  completedAt?: Date
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
  userId: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  duration: number // in minutes
  attendees: string[]
  createdBy: string
}

export interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadedBy: string
  uploadedAt: Date
  content?: string
}

export interface SystemLog {
  id: string
  action: string
  userId: string
  userName: string
  timestamp: Date
  details: string
}

export interface AppUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'worker' | 'user'
  avatar?: string
  lastLogin?: Date
  isActive: boolean
  settings: {
    notifications: boolean
    theme: 'light' | 'dark'
    language: string
  }
}

interface AppContextType {
  // Data
  tasks: Task[]
  notifications: Notification[]
  events: Event[]
  documents: Document[]
  systemLogs: SystemLog[]
  allUsers: AppUser[]
  
  // Task Management
  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  
  // Notification Management
  createNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void
  markNotificationRead: (id: string) => void
  clearAllNotifications: (userId: string) => void
  
  // Event Management
  createEvent: (event: Omit<Event, 'id'>) => void
  updateEvent: (id: string, updates: Partial<Event>) => void
  deleteEvent: (id: string) => void
  
  // Document Management
  uploadDocument: (document: Omit<Document, 'id' | 'uploadedAt'>) => void
  deleteDocument: (id: string) => void
  
  // User Management (Admin only)
  createUser: (user: Omit<AppUser, 'id' | 'lastLogin'>) => void
  updateUser: (id: string, updates: Partial<AppUser>) => void
  deleteUser: (id: string) => void
  
  // System Logs
  addSystemLog: (action: string, userId: string, userName: string, details: string) => void
  
  // Real-time stats
  getStats: () => {
    totalTasks: number
    completedTasks: number
    pendingTasks: number
    totalUsers: number
    activeUsers: number
    totalNotifications: number
    unreadNotifications: number
    upcomingEvents: number
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Mock data generator
const generateMockData = () => {
  const users: AppUser[] = [
    {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      isActive: true,
      lastLogin: new Date(),
      settings: { notifications: true, theme: 'light', language: 'en' }
    },
    {
      id: '2',
      email: 'worker@example.com',
      name: 'Worker User',
      role: 'worker',
      isActive: true,
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      settings: { notifications: true, theme: 'light', language: 'en' }
    },
    {
      id: '3',
      email: 'user@example.com',
      name: 'Regular User',
      role: 'user',
      isActive: true,
      lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
      settings: { notifications: true, theme: 'light', language: 'en' }
    },
    {
      id: '4',
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'user',
      isActive: false,
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
      settings: { notifications: false, theme: 'dark', language: 'en' }
    }
  ]

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the new authentication system',
      priority: 'high',
      status: 'in-progress',
      assignedTo: '2',
      createdBy: '1',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Review code changes',
      description: 'Review the latest pull request for security improvements',
      priority: 'medium',
      status: 'pending',
      assignedTo: '1',
      createdBy: '2',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Update client presentation',
      description: 'Prepare slides for the quarterly business review',
      priority: 'high',
      status: 'completed',
      assignedTo: '3',
      createdBy: '1',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ]

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Task Assigned',
      message: 'You have been assigned a new high-priority task',
      type: 'info',
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      userId: '2'
    },
    {
      id: '2',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight at 2 AM',
      type: 'warning',
      read: false,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      userId: '1'
    },
    {
      id: '3',
      title: 'Task Completed',
      message: 'Your task "Update client presentation" has been completed',
      type: 'success',
      read: true,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      userId: '3'
    }
  ]

  const events: Event[] = [
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly team sync and project updates',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      duration: 60,
      attendees: ['1', '2', '3'],
      createdBy: '1'
    },
    {
      id: '2',
      title: 'Client Presentation',
      description: 'Quarterly business review with key stakeholders',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      duration: 120,
      attendees: ['1', '3'],
      createdBy: '1'
    }
  ]

  const documents: Document[] = [
    {
      id: '1',
      name: 'Project Requirements.pdf',
      type: 'application/pdf',
      size: 2048576,
      uploadedBy: '1',
      uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'System Architecture.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: 1024768,
      uploadedBy: '2',
      uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ]

  const systemLogs: SystemLog[] = [
    {
      id: '1',
      action: 'User Login',
      userId: '1',
      userName: 'Admin User',
      timestamp: new Date(),
      details: 'Successful login from IP 192.168.1.100'
    },
    {
      id: '2',
      action: 'Task Created',
      userId: '1',
      userName: 'Admin User',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      details: 'Created task: Complete project documentation'
    },
    {
      id: '3',
      action: 'User Updated',
      userId: '1',
      userName: 'Admin User',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      details: 'Updated user profile for john.doe@example.com'
    }
  ]

  return { users, tasks, notifications, events, documents, systemLogs }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<AppUser[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([])

  useEffect(() => {
    const mockData = generateMockData()
    setAllUsers(mockData.users)
    setTasks(mockData.tasks)
    setNotifications(mockData.notifications)
    setEvents(mockData.events)
    setDocuments(mockData.documents)
    setSystemLogs(mockData.systemLogs)
  }, [])

  // Task Management
  const createTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    setTasks(prev => [...prev, newTask])
    addSystemLog('Task Created', task.createdBy, 'User', `Created task: ${task.title}`)
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ))
    if (updates.status === 'completed') {
      addSystemLog('Task Completed', updates.assignedTo || '', 'User', `Completed task: ${id}`)
    }
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
    addSystemLog('Task Deleted', '', 'User', `Deleted task: ${id}`)
  }

  // Notification Management
  const createNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    setNotifications(prev => [...prev, newNotification])
  }

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const clearAllNotifications = (userId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.userId === userId ? { ...notif, read: true } : notif
    ))
  }

  // Event Management
  const createEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString()
    }
    setEvents(prev => [...prev, newEvent])
    addSystemLog('Event Created', event.createdBy, 'User', `Created event: ${event.title}`)
  }

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ))
  }

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id))
    addSystemLog('Event Deleted', '', 'User', `Deleted event: ${id}`)
  }

  // Document Management
  const uploadDocument = (document: Omit<Document, 'id' | 'uploadedAt'>) => {
    const newDocument: Document = {
      ...document,
      id: Date.now().toString(),
      uploadedAt: new Date()
    }
    setDocuments(prev => [...prev, newDocument])
    addSystemLog('Document Uploaded', document.uploadedBy, 'User', `Uploaded: ${document.name}`)
  }

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
    addSystemLog('Document Deleted', '', 'User', `Deleted document: ${id}`)
  }

  // User Management
  const createUser = (user: Omit<AppUser, 'id' | 'lastLogin'>) => {
    const newUser: AppUser = {
      ...user,
      id: Date.now().toString()
    }
    setAllUsers(prev => [...prev, newUser])
    addSystemLog('User Created', '', 'Admin', `Created user: ${user.email}`)
  }

  const updateUser = (id: string, updates: Partial<AppUser>) => {
    setAllUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updates } : user
    ))
    addSystemLog('User Updated', id, 'Admin', `Updated user: ${id}`)
  }

  const deleteUser = (id: string) => {
    setAllUsers(prev => prev.filter(user => user.id !== id))
    addSystemLog('User Deleted', '', 'Admin', `Deleted user: ${id}`)
  }

  // System Logs
  const addSystemLog = (action: string, userId: string, userName: string, details: string) => {
    const newLog: SystemLog = {
      id: Date.now().toString(),
      action,
      userId,
      userName,
      timestamp: new Date(),
      details
    }
    setSystemLogs(prev => [newLog, ...prev.slice(0, 99)]) // Keep only last 100 logs
  }

  // Real-time stats
  const getStats = () => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.status === 'completed').length
    const pendingTasks = tasks.filter(task => task.status === 'pending').length
    const totalUsers = allUsers.length
    const activeUsers = allUsers.filter(user => user.isActive).length
    const totalNotifications = notifications.length
    const unreadNotifications = notifications.filter(notif => !notif.read).length
    const upcomingEvents = events.filter(event => event.date > new Date()).length

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      totalUsers,
      activeUsers,
      totalNotifications,
      unreadNotifications,
      upcomingEvents
    }
  }

  const value = {
    tasks,
    notifications,
    events,
    documents,
    systemLogs,
    allUsers,
    createTask,
    updateTask,
    deleteTask,
    createNotification,
    markNotificationRead,
    clearAllNotifications,
    createEvent,
    updateEvent,
    deleteEvent,
    uploadDocument,
    deleteDocument,
    createUser,
    updateUser,
    deleteUser,
    addSystemLog,
    getStats
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}