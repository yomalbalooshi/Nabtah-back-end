const express = require('express')
const router = express.Router()
const vendorCtrl = require('../controllers/vendor')

router.get('/tool', vendorCtrl.tools)

router.get('/plant', vendorCtrl.plants)

router.get('/service', vendorCtrl.service)

router.get('/produce', vendorCtrl.produce)

router.get('/customerorders', vendorCtrl.customerOrders)

module.exports = router
