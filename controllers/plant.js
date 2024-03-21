const Plant = require('../models/Plant')

const index = async (req, res) => {
  const plants = await Plant.find({})
  res.send(plants)
}

const show = async (req, res) => {
  const plant = await Plant.findById(req.params.id)
  res.send(plant)
}

const deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id)
    res.send(await plant.deleteOne())
  } catch (error) {
    res.send(`error in deleting plant: ${error}`)
  }
}

const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const plant = await Plant.create(req.body)
    res.send(plant)
  } catch (err) {
    res.send(`error in creating plant: ${err}`)
  }
}

const update = async (req, res) => {
  let plantId = req.params.id
  const update = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    scientificName: req.body.scientificName,
    family: req.body.family,
    origin: req.body.origin,
    dimensions: req.body.dimensions,
    cycle: req.body.cycle,
    watering: req.body.watering,
    sunlight: req.body.sunlight,
    pruningMonth: req.body.pruningMonth,
    pruningCount: req.body.pruningCount,
    description: req.body.description,
    image: req.body.image
  }
  try {
    const updatedPlant = await Plant.findOneAndUpdate(
      { _id: plantId },
      { $set: update },
      { new: true }
    )
    res.send(updatedPlant)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

module.exports = {
  index,
  show,
  create,
  deletePlant,
  update
}
