const Order = require('../models/order.model');

getTotalRevenue = async (req, res) => {
    const { from, to } = req.query;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    try {
        const result = await Order.aggregate([
            { $match: { dateOfSale: { $gte: fromDate, $lte: toDate } } },
            { $group: { _id: null, totalRevenue: { $sum: { $multiply: ["$quantitySold", "$unitPrice"] } } } },
          ]);
          res.json({ totalRevenue: result[0]?.totalRevenue || 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

getTotalRevenueByProduct = async(req, res) => {
    const { productId } = req.params;
    try {
        const result = await Order.aggregate([
            { $match: { productId } },
            { $group: { _id: null, totalRevenue: { $sum: { $multiply: ["$quantitySold", "$unitPrice"] } } } },
          ]);
          res.json({ totalRevenue: result[0]?.totalRevenue || 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

getTotalRevenueByCategory = async(req, res) => {
    const { categoryId } = req.params;
    try {
        const result = await Order.aggregate([
            { $match: { categoryId } },
            { $group: { _id: null, totalRevenue: { $sum: { $multiply: ["$quantitySold", "$unitPrice"] } } } },
          ]);
          res.json({ totalRevenue: result[0]?.totalRevenue || 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
getRevenueByRegion = async(req, res) => {
    const { region } = req.params;
    try {
        const result = await Order.aggregate([
            { $match: { region } },
            { $group: { _id: null, totalRevenue: { $sum: { $multiply: ["$quantitySold", "$unitPrice"] } } } },
          ]);
          res.json({ totalRevenue: result[0]?.totalRevenue || 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = { getTotalRevenue, getTotalRevenueByProduct, getTotalRevenueByCategory, getRevenueByRegion };