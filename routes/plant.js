const router = require('express').Router()
const plantCtrl = require('../controllers/plant')

//get all plants
router.get('/', plantCtrl.index)

//get specific plant
router.get('/:id', plantCtrl.show)

//create a plant
router.post('/', plantCtrl.create)

//delete a plant
router.delete('/:id', plantCtrl.deletePlant)

//update a plant
router.put('/:id', plantCtrl.update)

module.exports = router