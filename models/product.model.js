const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productId: { type: String, unique: true, required: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
  });
  
  module.exports = mongoose.model("Product", ProductSchema);
  