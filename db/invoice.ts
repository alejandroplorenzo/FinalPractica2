import mongoose from "npm:mongoose@7.6.3";
import { invoice } from "../types.ts";

const Schema = mongoose.Schema;

const productsSchema = new Schema(
    {
      name: { type: String, required: true, unique: true },
      stock: { type: Number, required: false, default: 0 },
      description: { type: String, required: false },
      price: {type: Number, required: true, unique: true},
    },
    { timestamps: true }
  );

const invoiceSchema = new Schema(
    {
      client: { type: String, required: true, unique: true },
      products: { type: [productsSchema], required: true},
      total: {type: Number, required: true}
    },
    { timestamps: true }
  );
  
  export type invoiceModelType = mongoose.Document & Omit<invoice, "id">;
  
  export default mongoose.model<invoiceModelType>("Invoice", invoiceSchema);