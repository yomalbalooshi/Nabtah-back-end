const Produce = require('../models/Produce')

const index = async (req, res) => {
  const produces = await Produce.find({})
  res.send(produces)
}

const show = async (req, res) => {
  const produce = await Produce.findById(req.params.id)
  res.send(produce)
}

const deleteProduce = async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id)
    res.send(await produce.deleteOne())
  } catch (error) {
    res.send(`error in deleting produce: ${error}`)
  }
}

const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const produce = await Produce.create(req.body)
    res.send(produce)
  } catch (err) {
    res.send(`error in creating produce: ${err}`)
  }
}

const update = async (req, res) => {
  let produceId = req.params.id
  const update = {
    name: req.body.name,
    description: req.body.description,
    available: req.body.available,
    price: req.body.price,
    quantity: req.body.quantity,
    frequency: req.body.frequency
  }
  try {
    const updatedProduce = await Produce.findOneAndUpdate(
      { _id: produceId },
      { $set: update },
      { new: true }
    )
    res.send(updatedProduce)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

module.exports = {
  index,
  show,
  create,
  deleteProduce,
  update
}
