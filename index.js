const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = require('./db/db')
const router = require('./routes/api.route')
const app = express()
const port = process.env.PORT
const cronJobs = require('./cron/cron')

connectDB();

cronJobs.startCronJobs();
app.use(express.json());

app.use('/api/v1', router);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))