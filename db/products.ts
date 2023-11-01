import mongoose from "npm:mongoose@7.6.3";
import { products } from "../types.ts";

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
  
  export type productsModelType = mongoose.Document & Omit<products, "id">;
  
  export default mongoose.model<productsModelType>("Products", productsSchema);