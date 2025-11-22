import mongoose, { Schema, Document } from "mongoose"

export interface ICategory {
  name: string
  description?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ICategoryDocument extends ICategory, Document {}

const categorySchema = new Schema<ICategoryDocument>({
  name: { type: String, required: true, trim: true, index: true },
  description: { type: String },
  isActive: { type: Boolean, default: true, index: true },
}, { timestamps: true })

categorySchema.index({ name: "text", description: "text" })

export const Category = mongoose.model<ICategoryDocument>("Category", categorySchema)