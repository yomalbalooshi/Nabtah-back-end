const express = require('express')
const router = express.Router()
const orderCtrl = require('../controllers/order')

router.post('/', orderCtrl.create)

router.put('/:id', orderCtrl.update)

module.exports = router
