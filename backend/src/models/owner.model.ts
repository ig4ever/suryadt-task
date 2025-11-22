import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOwner {
  name: string;
  isMaster: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOwnerDocument extends IOwner, Document {}

const ownerSchema = new Schema<IOwnerDocument>(
  {
    name: { type: String, required: true, trim: true, index: true },
    isMaster: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

ownerSchema.index({ name: "text" });

export const Owner = mongoose.model<IOwnerDocument>("Owner", ownerSchema);
