const router = require('express').Router()
const customerCtrl = require('../controllers/customer')

router.get('/:id/orders', customerCtrl.orders)

router.get('/:id', customerCtrl.customerDetails)

router.post('/:id/ownedplant', customerCtrl.addOwnedPlant)

router.delete('/:id/ownedplant', customerCtrl.deleteOwnedPlant)

module.exports = router
