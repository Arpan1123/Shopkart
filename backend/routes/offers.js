import express from 'express'
const router = express.Router()

// Offers routes mock. Data can be sourced from DB the same way as Products
router.get('/', (req, res) => {
  res.json({ message: 'Offers API initialized' })
})

export default router
