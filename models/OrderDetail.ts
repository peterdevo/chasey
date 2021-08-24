import mongoose, { Document } from "mongoose";
import { number } from "yup/lib/locale";

const OrderSchema = new mongoose.Schema(
  {
    personalInfo: {
      name: { type: String, require: true },
      email: { type: String, require: true },
      phone: { type: String, require: true },
      address: {
        city: { type: String, require: true },
        street: { type: String, require: true },
        zipCode: { type: String, require: true },
      },
      userId: { type: String },
    },
    products: [
      {
        productId: {
          type: String,
          require: true,
        },
        image: {
          type: String,
          require: true,
        },
        title: {
          type: String,
          require: true,
        },
        price: {
          type: Number,
          require: true,
        },
        amount: {
          type: Number,
          require: true,
        },
      },
    ],

    totalPaid: { type: number, require: true },
  },
  { timestamps: true }
);
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
