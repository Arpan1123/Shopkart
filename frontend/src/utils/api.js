const API_URL = "https://marvelous-quietude-production-6b0e.up.railway.app/api"

const getToken = () => localStorage.getItem('freshmartToken')

async function request(path, options = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

// ── Auth ──────────────────────────────────────────────────────────────────
export const registerUser = (body) =>
  request('/auth/register', { method: 'POST', body: JSON.stringify(body) })

export const loginUser = (body) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify(body) })

export const getMe = () => request('/auth/me')

// ── Products ──────────────────────────────────────────────────────────────
export const fetchProducts = (category) => {
  const query = category ? `?category=${category}` : ''
  return request(`/products${query}`)
}

export const searchProducts = (q) =>
  request(`/products/search?q=${encodeURIComponent(q)}`)

// ── Orders ────────────────────────────────────────────────────────────────
export const placeOrder = (body) =>
  request('/orders', { method: 'POST', body: JSON.stringify(body) })

export const getMyOrders = () => request('/orders')

// ── Offers ────────────────────────────────────────────────────────────────
export const fetchOffers = () => request('/offers')
