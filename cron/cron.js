const cron = require("node-cron");
const { triggerDataRefresh } = require("../services/dataRefresh.service");

function startCronJobs() {
  console.log("[CRON] Initializing Data Refresh Job...");

  // Schedule the cron job to run every day at midnight (00:00 UTC)
  cron.schedule("0 0 * * *", async () => {
    console.log("[CRON] Running Trigger Data Refresh...");
    try {
      await triggerDataRefresh();
      console.log("[CRON] Data Refresh Completed Successfully.");
    } catch (error) {
      console.error("[CRON] Error Running Data Refresh:", error);
    }
  });

  console.log("[CRON] Scheduled successfully to run at Midnight (00:00 UTC).");
}

// Export the function to start cron jobs
module.exports = { startCronJobs };
