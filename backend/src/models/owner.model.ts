import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOwner {
  firstName: string;
  lastName: string;
  description: string;
  favorites: boolean;
  isMaster: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOwnerDocument extends IOwner, Document {}

const ownerSchema = new Schema<IOwnerDocument>(
  {
    firstName: { type: String, required: true, trim: true, index: true },
    lastName: { type: String, required: true, trim: true, index: true },
    description: { type: String, index: true },
    favorites: { type: Boolean, default: false },
    isMaster: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ownerSchema.index({ firstName: "text", lastName: "text" });
ownerSchema.index(
  { isMaster: 1 },
  { unique: true, partialFilterExpression: { isMaster: true } }
);

export const Owner = mongoose.model<IOwnerDocument>("Owner", ownerSchema);
