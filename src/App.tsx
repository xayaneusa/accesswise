import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import WorkerPage from './pages/WorkerPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Default route redirects to user page */}
          <Route path="/" element={<Navigate to="/user" replace />} />
          
          <Route path="/login" element={<LoginPage />} />
          
          <Route 
            path="/user" 
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/worker" 
            element={
              <ProtectedRoute requiredRole="worker">
                <WorkerPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/user" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App