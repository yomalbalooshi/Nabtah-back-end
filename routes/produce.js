const express = require('express')
const router = express.Router()
const produceCtrl = require('../controllers/produce')

router.get('/', produceCtrl.index)

router.get('/:id', produceCtrl.show)

router.post('/', produceCtrl.create)

router.delete('/:id', produceCtrl.delete)

router.put('/:id', produceCtrl.update)

module.exports = router
