import express from 'express'
import Order from '../models/Order.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// @desc    Create new order
// @route   POST /api/orders
router.post('/', protect, async (req, res, next) => {
  try {
    const { items, shippingAddress, subtotal, deliveryFee, total, promoCode } = req.body

    if (!items || items.length === 0) {
      res.status(400)
      throw new Error('No order items')
    }

    const order = new Order({
      user: req.user.id,
      items,
      shippingAddress,
      subtotal,
      deliveryFee,
      total,
      promoCode,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  } catch (error) {
    next(error)
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders
router.get('/', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

export default router
