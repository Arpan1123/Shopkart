import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'
import User from './models/User.js'
import Order from './models/Order.js'
import bcrypt from 'bcryptjs'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB for seeding'))
  .catch(err => {
    console.error('❌ DB Connection failed:', err.message)
    process.exit(1)
  })

const seedProducts = [
  // Fruits
  { title: 'Kashmir Apples (1kg)', description: 'Premium quality Kashmir apples', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80', currentPrice: '180', originalPrice: '220', discount: '18% off', category: 'fruits', badge: 'Organic' },
  { title: 'Robusta Banana (1 dozen)', description: 'Fresh farm bananas', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&q=80', currentPrice: '45', originalPrice: '55', discount: '18% off', category: 'fruits' },
  { title: 'Alphonso Mango (1kg)', description: 'King of fruits', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80', currentPrice: '350', originalPrice: '450', discount: '22% off', category: 'fruits', badge: 'Seasonal' },
  
  // Vegetables
  { title: 'Fresh Tomatoes (1kg)', description: 'Farm-fresh red tomatoes', image: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=500&q=80', currentPrice: '40', originalPrice: '50', discount: '20% off', category: 'vegetables', badge: 'Local' },
  { title: 'Fresh Potatoes (1kg)', description: 'Clean and sorted potatoes', image: 'https://images.unsplash.com/photo-1518977676601-b53f82bere0?w=500&q=80', currentPrice: '30', originalPrice: '35', discount: '14% off', category: 'vegetables' },
  { title: 'Fresh Broccoli (500g)', description: 'Nutrient-rich broccoli', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=500&q=80', currentPrice: '60', originalPrice: '75', discount: '20% off', category: 'vegetables' },
  
  // Meat
  { title: 'Chicken Breast (500g)', description: 'Boneless, skinless chicken breast', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&q=80', currentPrice: '180', originalPrice: '220', discount: '18% off', category: 'meat' },
  { title: 'Mutton Curry Cut (500g)', description: 'Fresh goat meat cut for curry', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&q=80', currentPrice: '450', originalPrice: '520', discount: '13% off', category: 'meat' },
  
  // Dairy
  { title: 'Toned Milk (1L)', description: 'Fresh pasteurized toned milk', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80', currentPrice: '28', category: 'dairy' },
  { title: 'Farm Eggs (6 pcs)', description: 'Free-range farm fresh eggs', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&q=80', currentPrice: '45', originalPrice: '55', discount: '18% off', category: 'dairy' },
]

const importData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()
    await Order.deleteMany()

    console.log('🗑️  Collections cleared')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('password123', salt)
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@freshmart.in',
      password: hashedPassword,
      phone: '1234567890'
    })
    
    console.log('👤 Admin user created (admin@freshmart.in / password123)')

    await Product.insertMany(seedProducts)
    
    console.log('🍎 Products seeded successfully')
    
    process.exit()
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

importData()
