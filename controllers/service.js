const Service = require('../models/Service')

const index = async (req, res) => {
  const services = await Service.find({}).populate('vendor')
  res.send(services)
}

const show = async (req, res) => {
  const service = await Service.findById(req.params.id)
  console.log(service)
  res.send(service)
}

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    res.send(await service.deleteOne())
  } catch (error) {
    res.send(`error in deleting service: ${error}`)
  }
}

const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const service = await Service.create(req.body)
    res.send(service)
  } catch (err) {
    res.send(`error in creating service: ${err}`)
  }
}

const update = async (req, res) => {
  let serviceId = req.params.id
  const update = {
    name: req.body.name,
    description: req.body.description,
    available: req.body.available,
    price: req.body.price,
    frequency: req.body.frequency
  }
  try {
    const updatedService = await Service.findOneAndUpdate(
      { _id: serviceId },
      { $set: update },
      { new: true }
    )
    res.send(updatedService)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

module.exports = {
  index,
  show,
  create,
  deleteService,
  update
}
