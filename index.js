const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = require('./db/db')
const app = express()
const port = process.env.PORT

connectDB();
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))