const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const mongoose = require('mongoose')
const cors = require('cors')
const indexRoute = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/', indexRoute)

mongoose.connect('mongodb+srv://AdityaRespati:office2office2@mini-overflow-l1mdr.gcp.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})

app.listen(port, () => {
  console.log('listening on port', port)
})
