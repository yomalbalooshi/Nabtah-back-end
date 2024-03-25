const Tool = require('../models/Tool')
const Plant = require('../models/Plant')
const Service = require('../models/Service')
const Produce = require('../models/Produce')
const Order = require('../models/Order')
const Package = require('../models/Package')
const Vendor = require('../models/Vendor')

const index = async (req, res) => {
  const vendors = await Vendor.find({})
  res.send(vendors)
}

const tools = async (req, res) => {
  try {
    const tools = await Tool.find({ vendor: req.params.id })
    res.send(tools)
  } catch {
    res.send(`error: ${error}`)
  }
}

const plants = async (req, res) => {
  try {
    const plants = await Plant.find({ vendor: req.params.id })
    res.send(plants)
  } catch {
    res.send(`error: ${error}`)
  }
}

const service = async (req, res) => {
  try {
    const services = await Service.find({ vendor: req.params.id })
    res.send(services)
  } catch {
    res.send(`error: ${error}`)
  }
}

const produce = async (req, res) => {
  try {
    const produce = await Produce.find({ vendor: req.params.id })
    res.send(produce)
  } catch {
    res.send(`error: ${error}`)
  }
}

const package = async (req, res) => {
  try {
    const package = await Package.find({ vendorId: req.params.id })
    res.send(package)
  } catch {
    res.send(`error: ${error}`)
  }
}

const customerOrders = async (req, res) => {
  try {
    const order = await Order.find({ vendor: req.params.id })
    res.send(order)
  } catch {
    res.send(`error: ${error}`)
  }
}

const vendorDetails = async (req, res) => {
  //if not found, creates the vendor.
  // This is only accessed if vendor's own account, not for users to view vendor account
  try {
    let vendorDetails = await Vendor.findOne({
      auth0_id: req.params.id
    })
    if (!vendorDetails) {
      if (req.body.name) {
        name = req.body.name
      } else if (req.body.username) {
        name = req.body.username
      }
      vendorDetails = await Vendor.create({
        auth0_id: req.params.id,
        email: req.body.email,
        name: req.body.name,
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg'
      })
    }

    res.send(vendorDetails)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

module.exports = {
  index,
  tools,
  plants,
  service,
  produce,
  customerOrders,
  package,
  vendorDetails
}
