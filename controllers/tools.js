const Tool = require('../models/Tool')
const Vendor = require('../models/Vendor')

const index = async (req, res) => {
  const tools = await Tool.find({})
  res.send(tools)
}

const show = async (req, res) => {
  const tool = await Tool.findById(req.params.id)
  res.send(tool)
}

const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const newTool = await Tool.create(req.body)
    res.send(newTool)
  } catch (err) {
    res.send(`error in creating tool: ${err}`)
  }
}

const deleteTool = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id)
    res.send(await tool.deleteOne())
  } catch (error) {
    res.send(`error in deleting tool: ${error}`)
  }
}

const update = async (req, res) => {
  let toolId = req.params.id
  const update = {
    name: req.body.name,
    description: req.body.description,
    available: req.body.available,
    price: req.body.price
  }
  try {
    const updatedTools = await Tool.findOneAndUpdate(
      { _id: toolId },
      { $set: update },
      { new: true }
    )
    res.send(updatedTools)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

module.exports = {
  index,
  show,
  create,
  deleteTool,
  update
}
