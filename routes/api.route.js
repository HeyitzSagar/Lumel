const express = require('express');

const router = express.Router();
const analyticsController = require('../controller/analyticsController');
const csvController = require('../controller/csvController')

router.get('/revenue', analyticsController.getTotalRevenue);
router.post('/refresh-data', csvController.triggerDataRefresh);

module.exports = router;