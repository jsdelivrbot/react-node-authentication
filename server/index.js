const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const router = require('./router')

// Use native promises
mongoose.Promise = global.Promise

// DB Setup
mongoose.connect('mongodb://localhost/rrauth', {
  useMongoClient: true
})

// App Setup
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// Server Setup
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log('server listening on', PORT)
})
