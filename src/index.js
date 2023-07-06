const express = require('express')
const path = require('path')
const app = express()
//settings
app.set('port', 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
//app.set('case sensitive routing', true)

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// routes
//app.use(require('./routes/routes.js'))

app.get('/', (req, res) => {
    res.render(__dirname + '/views/main.ejs')
})


app.get("/login", (req, res) => {
  res.render(__dirname + "/views/login.ejs");
});

app.get("/register", (req, res) => {
  res.render(__dirname + "/views/register.ejs");
});

// middleware for fronted templates
app.use("/views", express.static(path.join(__dirname, '/views')))

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));







