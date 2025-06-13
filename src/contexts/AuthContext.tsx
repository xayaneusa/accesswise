import React, { createContext, useContext, useState, useEffect } from 'react'

export type UserRole = 'admin' | 'worker' | 'user'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock users for demonstration
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@example.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin'
    }
  },
  'worker@example.com': {
    password: 'worker123',
    user: {
      id: '2',
      email: 'worker@example.com',
      name: 'Worker User',
      role: 'worker'
    }
  },
  'user@example.com': {
    password: 'user123',
    user: {
      id: '3',
      email: 'user@example.com',
      name: 'Regular User',
      role: 'user'
    }
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const mockUser = mockUsers[email]
    
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user)
      localStorage.setItem('user', JSON.stringify(mockUser.user))
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}