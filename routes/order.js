const express = require('express')
const router = express.Router()
const orderCtrl = require('../controllers/order')

router.post('/', orderCtrl.create)

module.exports = router
