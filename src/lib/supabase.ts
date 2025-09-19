import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: number
          field1: string
          field2: string
          data: any
          role: number
          created_at: string
        }
        Insert: {
          id?: number
          field1: string
          field2: string
          data: any
          role?: number
          created_at?: string
        }
        Update: {
          id?: number
          field1?: string
          field2?: string
          data?: any
          role?: number
          created_at?: string
        }
      }
    }
  }
}