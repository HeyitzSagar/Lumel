const mongoose = require("mongoose");
const fs = require("fs");
const csvParser = require("fast-csv");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");

async function importCSV(filePath) {
  try {
    const orders = [];
    const productMap = new Map();
    const customerMap = new Map();
    const promises = []; // Store async tasks

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser.parse({ headers: true }))
        .on("data", (row) => {
          if (!row["Order ID"] || !row["Product ID"] || !row["Customer ID"]) return;

          promises.push(
            (async () => {
              try {
                // Fetch or Insert Product
                if (!productMap.has(row["Product ID"])) {
                  const product = await Product.findOneAndUpdate(
                    { productId: row["Product ID"] },
                    {
                      productId: row["Product ID"],
                      productName: row["Product Name"],
                      category: row["Category"],
                    },
                    { upsert: true, new: true }
                  );
                  productMap.set(row["Product ID"], product._id.toString());
                }

                // Fetch or Insert Customer
                if (!customerMap.has(row["Customer ID"])) {
                  const customer = await Customer.findOneAndUpdate(
                    { customerId: row["Customer ID"] },
                    {
                      customerId: row["Customer ID"],
                      customerName: row["Customer Name"],
                      customerEmail: row["Customer Email"],
                      customerAddress: row["Customer Address"],
                    },
                    { upsert: true, new: true }
                  );
                  customerMap.set(row["Customer ID"], customer._id.toString());
                }

                // Push Order
                orders.push({
                  orderId: row["Order ID"].trim(),
                  productId: new mongoose.Types.ObjectId(productMap.get(row["Product ID"])),
                  customerId: new mongoose.Types.ObjectId(customerMap.get(row["Customer ID"])),
                  region: row["Region"],
                  dateOfSale: new Date(row["Date of Sale"]),
                  quantitySold: parseInt(row["Quantity Sold"], 10),
                  unitPrice: parseFloat(row["Unit Price"]),
                  discount: parseFloat(row["Discount"]),
                  shippingCost: parseFloat(row["Shipping Cost"]),
                  paymentMethod: row["Payment Method"],
                });
              } catch (err) {
                console.error("Row Processing Error:", err);
              }
            })()
          );
        })
        .on("end", async () => {
          try {
            await Promise.all(promises); // Wait for all DB operations to complete
            if (orders.length > 0) {
              await Order.insertMany(orders, { ordered: false });
              console.log("CSV Imported Successfully!");
              resolve("CSV Imported Successfully!");
            } else {
              console.log("No valid orders found in CSV.");
              resolve("No valid orders found in CSV.");
            }
          } catch (err) {
            console.error("Order Insert Error:", err);
            reject(err);
          }
        })
        .on("error", (error) => reject(error));
    });
  } catch (error) {
    console.error("CSV Import Error:", error);
  }
}

module.exports = { importCSV };
