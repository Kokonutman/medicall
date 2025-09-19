import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { UserType } from '../pages/AuthPage'

export interface AuthUser {
  id: number
  field1: string
  field2: string
  data: any
  role: number
  userType: UserType
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Map UserType to role index (matching the selector order)
  const getUserTypeRole = (userType: UserType): number => {
    const roleMapping = {
      'Patient': 0,
      'Doctor': 1,
      'Hospital': 2,
      'Insurance': 3
    }
    return roleMapping[userType]
  }

  const authenticate = async (
    field1: string, 
    field2: string, 
    userType: UserType
  ): Promise<AuthUser | null> => {
    setLoading(true)
    setError(null)

    try {
      const role = getUserTypeRole(userType)

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('field1', field1)
        .eq('field2', field2)
        .eq('role', role)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Invalid credentials. Please check your information and try again.')
        } else {
          setError('Authentication failed. Please try again.')
        }
        return null
      }

      if (data) {
        const authUser: AuthUser = {
          id: data.id,
          field1: data.field1,
          field2: data.field2,
          data: data.data,
          role: data.role,
          userType
        }
        return authUser
      }

      return null
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    authenticate,
    loading,
    error
  }
}