import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'
import offerRoutes from './routes/offers.js'
import orderRoutes from './routes/orders.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080   // ✅ Railway uses 8080

// ✅ CORS — whitelist-based (secure)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,   // ✅ Set this in Railway env vars
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS: origin '${origin}' not allowed`))
    }
  },
  credentials: true,
}))

app.use(express.json())

// ✅ ROOT — health check (required by Railway)
app.get('/', (req, res) => {
  res.send('🚀 FreshMart Backend is LIVE')
})

// ✅ API index
app.get('/api', (req, res) => {
  res.json({
    message: 'FreshMart API is running 🚀',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      cart: '/api/cart',
      offers: '/api/offers',
      orders: '/api/orders',
    },
  })
})

// ✅ Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/offers', offerRoutes)
app.use('/api/orders', orderRoutes)

// ✅ Global error handler (must be last)
app.use(errorHandler)

// ✅ MongoDB connection → start server
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI

if (!MONGO_URI) {
  console.error('❌ No MongoDB URI found. Set MONGO_URI in Railway Variables.')
  process.exit(1)   // ✅ Crash fast — don't silently run without DB
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📡 API available on port ${PORT} at /api`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message)
    console.warn('⚠️  Starting server without database...')
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT} (no DB)`)
    })
  })
