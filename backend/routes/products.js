import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

// @desc    Get all products
// @route   GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const { category, badge } = req.query
    const filter = {}
    
    if (category) filter.category = category
    if (badge) filter.badge = badge

    const products = await Product.find(filter)
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// @desc    Search products
// @route   GET /api/products/search
router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query
    if (!q) return res.json([])

    const regex = new RegExp(q, 'i')
    const products = await Product.find({
      $or: [
        { title: regex },
        { description: regex },
        { category: regex }
      ]
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// @desc    Get single product details
// @route   GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    next(error)
  }
})

export default router
