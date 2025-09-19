import React, { createContext, useContext, useState, useEffect } from 'react'
import { AuthUser } from '../hooks/useAuth'

interface AuthContextType {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('authUser')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('authUser')
      }
    }
  }, [])

  const handleSetUser = (newUser: AuthUser | null) => {
    setUser(newUser)
    if (newUser) {
      localStorage.setItem('authUser', JSON.stringify(newUser))
      // Keep the old userType for backward compatibility
      localStorage.setItem('userType', newUser.userType)
    } else {
      localStorage.removeItem('authUser')
      localStorage.removeItem('userType')
    }
  }

  const logout = () => {
    handleSetUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}