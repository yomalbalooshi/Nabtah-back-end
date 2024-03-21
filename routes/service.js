const express = require('express')
const router = express.Router()
const serviceCtrl = require('../controllers/service')

router.get('/', serviceCtrl.index)

router.get('/:id', serviceCtrl.show)

router.post('/', serviceCtrl.create)

router.delete('/:id', serviceCtrl.delete)

router.put('/:id', serviceCtrl.update)

module.exports = router
