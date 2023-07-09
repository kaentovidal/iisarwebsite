import express from 'express'
import morgan from 'morgan'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import indexRoutes from './routes/routes.js'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
//settings
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))
//app.set('case sensitive routing', true)

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// routes
app.use(indexRoutes)

// middleware for fronted templates
app.use("/views", express.static(join(__dirname, '/views')))
app.use("/node_modules", express.static(join(__dirname, "../node_modules")));


app.listen(app.get('port'));
console.log('Server on port', app.get('port'));







