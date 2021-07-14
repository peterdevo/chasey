import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Please add image"],
  },
  price: {
    type: Number,
    required: [true, "Please add price"],
  },
  title: {
    type: String,
    required: [true, "Please add title"],
  },
  star: {
    type: String,
    required: [true, "Please add star"],
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, "Description cannot be more than 200 characters"],
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
