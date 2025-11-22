import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPet {
  masterId: Types.ObjectId;
  categoryId: Types.ObjectId;
  name: string;
  dob: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPetDocument extends IPet, Document {}

const petSchema = new Schema<IPetDocument>(
  {
    masterId: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
      index: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    name: { type: String, required: true, index: true },
    dob: { type: String, required: true },
  },
  { timestamps: true }
);

petSchema.index({ name: "text" });
petSchema.index({ masterId: 1, categoryId: 1 });

export const Pet = mongoose.model<IPetDocument>("Pet", petSchema);
