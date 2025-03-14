const {importCSV} = require('../services/csvService');
const path = require("path");
triggerDataRefresh = async(req, res) => {
    try {
        const filePath = path.join(__dirname, "../sales_data.csv");
        console.log("CHeck file path: " + filePath);
        // return '';
        await importCSV(filePath);
        res.status(200).send("Data refreshed successfully");
    } catch (error) {
        res.status(500).json({ error: error});
    }
}

module.exports = {
    triggerDataRefresh
};