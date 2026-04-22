import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, register, setError } = useAuth()
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setLocalError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    setLoading(true)
    try {
      if (isRegister) {
        await register(form.name, form.email, form.password)
      } else {
        await login(form.email, form.password)
      }
      navigate('/')
    } catch (err) {
      setLocalError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="glass" style={{ width: '100%', maxWidth: 440, padding: '40px 36px', borderRadius: 20 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <i className="fas fa-leaf" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: 12, display: 'block' }}></i>
          <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>{isRegister ? 'Create Account' : 'Welcome Back'}</h1>
          <p style={{ color: 'var(--gray)', fontSize: '0.95rem' }}>
            {isRegister ? 'Join FreshMart today' : 'Sign in to your FreshMart account'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: 'rgba(229,57,53,0.1)', border: '1px solid rgba(229,57,53,0.3)', color: '#e53935', padding: '10px 14px', borderRadius: 10, marginBottom: 20, fontSize: '0.9rem' }}>
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Full Name</label>
              <input
                type="text" name="name" className="form-input"
                placeholder="Your full name"
                value={form.name} onChange={handleChange} required
              />
            </div>
          )}
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Email Address</label>
            <input
              type="email" name="email" className="form-input"
              placeholder="you@example.com"
              value={form.email} onChange={handleChange} required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 24 }}>
            <label className="form-label">Password</label>
            <input
              type="password" name="password" className="form-input"
              placeholder="••••••••"
              value={form.password} onChange={handleChange} required minLength={6}
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? <><i className="fas fa-spinner fa-spin"></i> Please wait...</> : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Toggle */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.9rem', color: 'var(--gray)' }}>
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => { setIsRegister(!isRegister); setLocalError('') }}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
          >
            {isRegister ? 'Sign In' : 'Register'}
          </button>
        </p>

        <p style={{ textAlign: 'center', marginTop: 10 }}>
          <Link to="/" style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  )
}
