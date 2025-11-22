import mongoose, { Schema, Document } from "mongoose"

export interface IUser {
  username: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true, trim: true, unique: true, index: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

userSchema.index({ username: "text" })

export const User = mongoose.model<IUserDocument>("User", userSchema)