import mongoose, { Schema, Document, Types } from "mongoose"

export interface IPet {
  name: string
  owner: Types.ObjectId
  category: Types.ObjectId
  age?: number
  breed?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IPetDocument extends IPet, Document {}

const petSchema = new Schema<IPetDocument>({
  name: { type: String, required: true, trim: true, index: true },
  owner: { type: Schema.Types.ObjectId, ref: "Owner", required: true, index: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
  age: { type: Number },
  breed: { type: String },
  isActive: { type: Boolean, default: true, index: true },
}, { timestamps: true })

petSchema.index({ name: "text", breed: "text" })

export const Pet = mongoose.model<IPetDocument>("Pet", petSchema)