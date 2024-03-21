const router = require('express').Router()
const serviceCtrl = require('../controllers/service')

//get all services
router.get('/', serviceCtrl.index)

//get specific service
router.get('/:id', serviceCtrl.show)

//create a service
router.post('/', serviceCtrl.create)

//delete a service
router.delete('/:id', serviceCtrl.delete)

//update a service
router.put('/:id', serviceCtrl.update)

module.exports = router
