const { importCSV } = require("./csvService");
const path = require("path");
const DataRefreshLog = require("../models/dataRefreshLog.model");

async function triggerDataRefresh() {
  try {
    const filePath = path.join(__dirname, "../sales_data.csv");
    console.log("Checking file path:", filePath);

    console.log("Starting Data Refresh...");
    
    await importCSV(filePath); // Pass the correct file path
    
    console.log("Data Refresh Completed.");

    // Log success in MongoDB
    await DataRefreshLog.create({
      status: "SUCCESS",
      message: "Data refresh completed successfully.",
    });

  } catch (error) {
    console.error("Data Refresh Failed:", error);

    // Log failure in MongoDB
    await DataRefreshLog.create({
      status: "FAILURE",
      message: "Data refresh failed.",
      errorDetails: error.message,
    });
  }
}

module.exports = { triggerDataRefresh };
