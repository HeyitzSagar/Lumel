const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    region: { type: String, required: true },
    dateOfSale: { type: Date, required: true },
    quantitySold: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    paymentMethod: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
