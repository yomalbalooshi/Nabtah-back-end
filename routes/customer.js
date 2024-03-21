const router = require('express').Router()
const customerCtrl = require('../controllers/customer')

router.get('/orders', customerCtrl.orders)

router.get('/', customerCtrl.customerDetails)

router.post('/ownedplant', customerCtrl.addOwnedPlant)

router.delete('/ownedplant', customerCtrl.addOwnedPlant)

module.exports = router
