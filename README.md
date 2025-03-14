# Data Processing and Automation Project

## Overview
This project automates data processing by **parsing CSV files**, **storing data in MongoDB**, and **tracking data refresh logs**. Additionally, it includes a **cron job** that triggers daily data refresh tasks.

## Features
- **CSV Data Parsing:** Reads and processes structured data from a CSV file.
- **Automated Cron Jobs:** Runs a daily task to update data automatically.
- **MongoDB Integration:** Stores parsed data and logs refresh operations.
- **Logging System:** Maintains logs of data refresh tasks for tracking success and failures.

## Technologies Used
- **Node.js** (Backend)
- **Express.js** (API framework)
- **MongoDB** (Database for storing data and logs)
- **Mongoose** (MongoDB ODM)
- **node-cron** (Task scheduling for automation)
- **csv-parser** (CSV file processing)
- **dotenv** (Environment variable management)

## Project Structure
```
├── cron
│   ├── cron.js                 # Defines the scheduled cron job
├── db
│   ├── db.js                   # Database connection setup
├── logs
│   ├── dataRefreshLog.model.js  # Model for logging data refresh tasks
├── routes
│   ├── api.route.js             # API routes
├── services
│   ├── csvService.js            # Handles CSV parsing and database insertion
│   ├── dataRefresh.service.js   # Manages data refresh logic
├── index.js                     # Main entry point for the app
├── .env                         # Environment variables
├── sales_data.csv               # Sample CSV data file
└── README.md                    # Project documentation
```

## Installation and Setup
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Setup environment variables**:
   Create a `.env` file in the root directory and add:
   ```ini
   PORT=3000
   MONGO_URI=mongodb+srv://your-db-url
   ```

4. **Start the application**:
   ```sh
   npm start
   ```

5. **Run the cron job manually (for testing)**:
   ```sh
   node cron/cron.js
   ```

## API Endpoints
| Method | Endpoint                | Description                         |
|--------|-------------------------|-------------------------------------|
| GET    | `/api/v1/logs/data-refresh` | Fetches data refresh logs          |
| GET    | `/api/v1/revenue/:categoryId?` | Retrieves revenue by category     |

## Logging System
- **Success logs** are stored in MongoDB with a `SUCCESS` status.
- **Failure logs** include error details for debugging.
- Logs can be retrieved via an API endpoint.

## Future Enhancements
- Implement a front-end dashboard to visualize logs and data.
- Add email notifications for cron job failures.
- Extend support for multiple file formats (JSON, XML, etc.).

---

### 📌 **Author**: [Your Name]  
### 📅 **Last Updated**: March 2025
![triggerdata](https://github.com/user-attachments/assets/b7b1ee15-f81a-45f7-8129-1c0d0206494c)
![get-revenue](https://github.com/user-attachments/assets/8188c729-8875-4490-a0a5-22a992e06c89)
