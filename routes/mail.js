const express = require('express')
const router = express.Router()
const sendMailCtrl = require('../controllers/sendMail')
router.post('/', sendMailCtrl.create)
module.exports = router
