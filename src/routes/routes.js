const { Router } = require("express")
const router =  Router()

const {
    getDate
} = require('../controllers/index.controller')

router.get('/users', getDate)


module.exports = router







