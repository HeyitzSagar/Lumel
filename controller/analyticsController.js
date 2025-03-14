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

module.exports = { getTotalRevenue };