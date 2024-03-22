const express = require('express')
const router = express.Router()
const vendorCtrl = require('../controllers/vendor')

router.get('/:id/tool', vendorCtrl.tools)

router.get('/:id/plant', vendorCtrl.plants)

router.get('/:id/service', vendorCtrl.service)

router.get('/:id/produce', vendorCtrl.produce)

router.get('/:id/package', vendorCtrl.package)

router.get('/:id/customerorders', vendorCtrl.customerOrders)

module.exports = router
