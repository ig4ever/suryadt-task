import mongoose, { Schema, Document } from "mongoose";

export interface ICategory {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryDocument extends ICategory, Document {}

const categorySchema = new Schema<ICategoryDocument>(
  {
    name: { type: String, required: true, trim: true, index: true },
  },
  { timestamps: true }
);

categorySchema.index({ name: "text" });

export const Category = mongoose.model<ICategoryDocument>(
  "Category",
  categorySchema
);
