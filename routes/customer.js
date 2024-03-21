const router = require('express').Router()
const customerCtrl = require('../controllers/customer')

router.get('/orders', customerCtrl.orders)

router.get('/ownedplants', customerCtrl.ownedPlants)

module.exports = router
