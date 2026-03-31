import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      // We don't fetch the full user from DB here to save a query, 
      // but we attach the user ID to the request
      req.user = { id: decoded.id }
      
      next()
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}
