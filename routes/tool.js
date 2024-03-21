const express = require('express')
const router = express.Router()
const toolCtrl = require('../controllers/tools')

router.get('/', toolCtrl.index)

router.get('/:id', toolCtrl.show)

router.post('/', toolCtrl.create)

router.delete('/:id', toolCtrl.delete)

router.put('/:id', toolCtrl.update)

module.exports = router
