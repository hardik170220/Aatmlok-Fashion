import mongoose, { Schema, type Document } from "mongoose"

export interface ICategory extends Document {
  name: string
  slug: string
  description?: string
  image?: string
  imagePublicId?: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
    },
    description: { type: String },
    image: { type: String },
    imagePublicId: { type: String },
  },
  { timestamps: true },
)

// Generate slug from name before saving
CategorySchema.pre("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }
  next()
})

// Clear existing model to prevent model overwrite issues during development
mongoose.models = mongoose.models || {}

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema)
