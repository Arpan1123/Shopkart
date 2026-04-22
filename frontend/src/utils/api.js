const BASE_URL = import.meta.env.VITE_API_URL || 'http://marvelous-quietude-production-6b0e.up.railway.app'

const getToken = () => localStorage.getItem('freshmartToken')

async function request(path, options = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

// ── Auth ──────────────────────────────────────────────────────────────────
export const registerUser = (body) =>
  request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) })

export const loginUser = (body) =>
  request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) })

export const getMe = () => request('/api/auth/me')

// ── Products ──────────────────────────────────────────────────────────────
export const fetchProducts = (category) => {
  const query = category ? `?category=${category}` : ''
  return request(`/api/products${query}`)
}

export const searchProducts = (q) =>
  request(`/api/products/search?q=${encodeURIComponent(q)}`)

// ── Orders ────────────────────────────────────────────────────────────────
export const placeOrder = (body) =>
  request('/api/orders', { method: 'POST', body: JSON.stringify(body) })

export const getMyOrders = () => request('/api/orders')

// ── Offers ────────────────────────────────────────────────────────────────
export const fetchOffers = () => request('/api/offers')
