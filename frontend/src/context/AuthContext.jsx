import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser, getMe } from '../utils/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // On mount, restore session if token exists
  useEffect(() => {
    const token = localStorage.getItem('freshmartToken')
    if (token) {
      getMe()
        .then(setUser)
        .catch(() => localStorage.removeItem('freshmartToken'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    setError('')
    const data = await loginUser({ email, password })
    localStorage.setItem('freshmartToken', data.token)
    setUser(data)
    return data
  }

  const register = async (name, email, password) => {
    setError('')
    const data = await registerUser({ name, email, password })
    localStorage.setItem('freshmartToken', data.token)
    setUser(data)
    return data
  }

  const logout = () => {
    localStorage.removeItem('freshmartToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, setError, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
