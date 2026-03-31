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
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))
app.use(express.json())

// Routes
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

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/offers', offerRoutes)
app.use('/api/orders', orderRoutes)

// Error handler
app.use(errorHandler)

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
      console.log(`📡 API available at http://localhost:${PORT}/api`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message)
    console.log('⚠️  Starting server without database...')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (without DB)`)
    })
  })
