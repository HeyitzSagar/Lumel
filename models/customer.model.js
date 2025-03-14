const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
    customerId: { type: String, unique: true, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerAddress: { type: String, required: true },
  });
  
  module.exports = mongoose.model("Customer", CustomerSchema);
  