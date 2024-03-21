const express = require('express')
const router = express.Router()
const orderItemCtrl = require('../controllers/orderItem')

router.post('/', orderItemCtrl.create)

router.delete('/:id', orderItemCtrl.delete)

router.put('/:id', orderItemCtrl.update)

module.exports = router
