const express = require('express');

const router = express.Router();
const analyticsController = require('../controller/analyticsController');
const csvController = require('../controller/csvController')

router.get('/revenue', analyticsController.getTotalRevenue);
router.get('/revenue/:productId?', analyticsController.getTotalRevenueByProduct);
router.get('/revenue/:categoryId?', analyticsController.getTotalRevenueByCategory);
router.get('/revenue/:region?', analyticsController.getRevenueByRegion);
router.post('/refresh-data', csvController.triggerDataRefresh);

module.exports = router;