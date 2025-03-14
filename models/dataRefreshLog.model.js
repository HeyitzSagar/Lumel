const mongoose = require("mongoose");

const dataRefreshLogSchema = new mongoose.Schema({
    status: { type: String, enum: ["SUCCESS", "FAILURE"], required: true },
    message: { type: String },
    errorDetails: { type: String },
    executedAt: { type: Date, default: Date.now },
});

const DataRefreshLog = mongoose.model("DataRefreshLog", dataRefreshLogSchema);

module.exports = DataRefreshLog;
