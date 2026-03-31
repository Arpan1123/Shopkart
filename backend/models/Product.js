import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  currentPrice: { type: String, required: true },
  originalPrice: { type: String },
  discount: { type: String },
  category: { type: String, required: true },
  badge: { type: String },
  inStock: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
