const Package = require('../models/Package')

const index = async (req, res) => {
  const packages = await Package.find({})
  res.send(packages)
}

const show = async (req, res) => {
  const package = await Package.findById(req.params.id)
  res.send(package)
}

const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const newPackage = await Package.create(req.body)
    res.send(newPackage)
  } catch (err) {
    res.send(`error in creating package: ${err}`)
  }
}

const deletePackage = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id)
    res.send(await package.deleteOne())
  } catch (error) {
    res.send(`error in deleting package: ${error}`)
  }
}

const update = async (req, res) => {
  let packageId = req.params.id
  const update = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    frequency: req.body.frequency,
    plants: req.body.plants,
    services: req.body.services,
    produce: req.body.produce,
    tools: req.body.tools,
    availablity: req.body.availablity
  }
  try {
    const updatedPackage = await Package.findOneAndUpdate(
      { _id: packageId },
      { $set: update },
      { new: true }
    )
    res.send(updatedPackage)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

module.exports = {
  index,
  show,
  create,
  deletePackage,
  update
}
