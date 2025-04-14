import mongoose, { Schema, type Document } from "mongoose"

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  category: string
  image: string
  imagePublicId?: string
  stock: number
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    imagePublicId: { type: String },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
)

// Check if the model already exists to prevent overwriting during hot reloads
export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)

