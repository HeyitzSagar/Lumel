const fs = require("fs");
const csvParser = require("fast-csv");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");

async function importCSV(filePath) {
  try {
    const orders = [];
    const products = new Map();
    const customers = new Map();

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser.parse({ headers: true }))
        .on("data", async (row) => {
          if (!row["Order ID"] || !row["Product ID"] || !row["Customer ID"]) return;

          if (!products.has(row["Product ID"])) {
            products.set(row["Product ID"], {
              productId: row["Product ID"],
              productName: row["Product Name"],
              category: row["Category"],
            });
          }

          if (!customers.has(row["Customer ID"])) {
            customers.set(row["Customer ID"], {
              customerId: row["Customer ID"],
              customerName: row["Customer Name"],
              customerEmail: row["Customer Email"],
              customerAddress: row["Customer Address"],
            });
          }

          orders.push({
            orderId: row["Order ID"],
            productId: row["Product ID"],
            customerId: row["Customer ID"],
            region: row["Region"],
            dateOfSale: new Date(row["Date of Sale"]),
            quantitySold: parseInt(row["Quantity Sold"], 10),
            unitPrice: parseFloat(row["Unit Price"]),
            discount: parseFloat(row["Discount"]),
            shippingCost: parseFloat(row["Shipping Cost"]),
            paymentMethod: row["Payment Method"],
          });
        })
        .on("end", async () => {
          await Product.insertMany([...products.values()], { ordered: false }).catch(() => {});
          await Customer.insertMany([...customers.values()], { ordered: false }).catch(() => {});
          await Order.insertMany(orders, { ordered: false }).catch(() => {});
          resolve("CSV Imported Successfully!");
        })
        .on("error", (error) => reject(error));
    });
  } catch (error) {
    console.error("CSV Import Error:", error);
  }
}

module.exports = { importCSV };
