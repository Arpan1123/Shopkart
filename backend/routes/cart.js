import express from 'express'
const router = express.Router()

// Cart routes mock for file separation
// In a full DB implementation, cart state might live in DB (linked to user)
// but for Shopkart, since front-end relies heavily on localStorage, this API
// gives a place to sync local cart to server if needed.

router.get('/', (req, res) => {
  res.json({ message: 'Cart API initialized' })
})

export default router
