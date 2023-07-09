import express from 'express'
import morgan from 'morgan'
import session from 'express-session'//for the login session
import flash from 'express-flash'//for show message from sessions
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import passport from 'passport'
import indexRoutes from './routes/routes.js'
import { initialize } from './passport/auth.js'

initialize(passport)
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
//middlewares session login
app.use(flash())
app.use(session({
    secret: 'secret',
    
    resave: false,
    saveUninitialized: false
}
))
app.use(passport.initialize())
app.use(passport.session())
// routes
app.use(indexRoutes)

// middleware for fronted templates
app.use("/views", express.static(join(__dirname, '/views')))
app.use("/node_modules", express.static(join(__dirname, "../node_modules")));


app.listen(app.get('port'));
console.log('Server on port', app.get('port'));







