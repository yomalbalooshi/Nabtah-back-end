const router = require('express').Router()
const customerCtrl = require('../controllers/customer')

router.get('/:id/orders', customerCtrl.orders)
// router.get('/:id/cart', customerCtrl.getCart)
router.get('/:id', customerCtrl.customerDetails)
router.post('/:id/ownedplant', customerCtrl.addOwnedPlant)
router.post('/:id/cart', customerCtrl.addToCart)

router.post('/:id', customerCtrl.customerAuthentication)
router.delete('/:id/ownedplant', customerCtrl.deleteOwnedPlant)
router.delete('/:id/cart', customerCtrl.deleteCartItem)
router.put('/:id/cart', customerCtrl.updateCartItem)

module.exports = router
