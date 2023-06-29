const express = require('express')
const app = express()
// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// routes
app.use(require('./routes/index.js'))

app.listen(3000)

console.log("Server on port 3000");







