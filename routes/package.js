const router = require('express').Router()
const packageCtrl = require('../controllers/package')

//get all packages
router.get('/', packageCtrl.index)

//get specific package
router.get('/:id', packageCtrl.show)

//create a package
router.post('/', packageCtrl.create)

//delete a package
router.delete('/:id', packageCtrl.deletePackage)

//update a package
router.put('/:id', packageCtrl.update)

module.exports = router