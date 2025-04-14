import mongoose, { Schema, type Document } from "mongoose"

interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
}

export interface IOrder extends Document {
  orderNumber?: string
  customer: CustomerInfo
  items: OrderItem[]
  totalAmount: number
  status: "Pending" | "Contacted" | "Confirmed" | "Delivered" | "Cancelled"
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// Define the schema without requiring orderNumber
const OrderSchema: Schema = new Schema(
  {
    orderNumber: { type: String }, // Removed required: true
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "Confirmed", "Delivered", "Cancelled"],
      default: "Pending",
    },
    notes: { type: String },
  },
  { timestamps: true },
)

// Generate a unique order number before saving
OrderSchema.pre("save", async function (next) {
  try {
    if (!this.orderNumber) {
      const date = new Date()
      const year = date.getFullYear().toString().slice(-2)
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const day = date.getDate().toString().padStart(2, "0")

      // Find the count of orders created today
      const count =
        (await mongoose.models.Order.countDocuments({
          createdAt: {
            $gte: new Date(date.setHours(0, 0, 0, 0)),
            $lt: new Date(date.setHours(23, 59, 59, 999)),
          },
        })) || 0

      // Format: AAT-YYMMDD-XXXX (where XXXX is a sequential number)
      this.orderNumber = `AAT-${year}${month}${day}-${(count + 1).toString().padStart(4, "0")}`
    }
    next()
  } catch (error:any) {
    console.error("Error generating order number:", error)
    // Continue even if order number generation fails
    next()
  }
})

// Clear existing model to prevent model overwrite issues
mongoose.models = {}

// Export the model
const Order = mongoose.model<IOrder>("Order", OrderSchema)
export default Order
