const express = require('express')
const router = express.Router()
const vendorCtrl = require('../controllers/vendor')

//get all vendors
router.get('/', vendorCtrl.index)

router.get('/:id/tool', vendorCtrl.tools)

router.get('/:id/plant', vendorCtrl.plants)

router.get('/:id/service', vendorCtrl.service)

router.get('/:id/produce', vendorCtrl.produce)

router.get('/:id/package', vendorCtrl.package)

router.get('/:id/customerorders', vendorCtrl.customerOrders)

router.get('/:id', vendorCtrl.vendorDetails)
router.post('/:id', vendorCtrl.vendorAuthentication)

router.put('/:id', vendorCtrl.update)

module.exports = router
