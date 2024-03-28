const Tool = require('../models/Tool')
const Plant = require('../models/Plant')
const Service = require('../models/Service')
const Produce = require('../models/Produce')
const Order = require('../models/Order')
const Package = require('../models/Package')
const Vendor = require('../models/Vendor')
const OrderItem = require('../models/OrderItem')
const index = async (req, res) => {
  const vendors = await Vendor.find({})
  res.send(vendors)
}

const tools = async (req, res) => {
  try {
    const tools = await Tool.find({ vendor: req.params.id }).populate('vendor')
    res.send(tools)
  } catch {
    res.send(`error: ${error}`)
  }
}

const plants = async (req, res) => {
  try {
    const plants = await Plant.find({ vendor: req.params.id }).populate(
      'vendor'
    )
    res.send(plants)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const service = async (req, res) => {
  try {
    const services = await Service.find({ vendor: req.params.id }).populate(
      'vendor'
    )
    res.send(services)
  } catch {
    res.send(`error: ${error}`)
  }
}

const produce = async (req, res) => {
  try {
    const produce = await Produce.find({ vendor: req.params.id }).populate(
      'vendor'
    )
    res.send(produce)
  } catch {
    res.send(`error: ${error}`)
  }
}

const package = async (req, res) => {
  try {
    const package = await Package.find({ vendorId: req.params.id })
      .populate('plants')
      .populate('services')
      .populate('produce')
      .populate('tools')
    res.send(package)
  } catch {
    res.send(`error: ${error}`)
  }
}

const customerOrders = async (req, res) => {
  try {
    let vendorId = req.params.id
    console.log(vendorId)

    let orders = await OrderItem.find().populate({
      path: 'itemId',
      populate: { path: 'vendor', match: { _id: vendorId } }
    })
    let filteredOrders = orders.filter((order) => order.itemId.vendor !== null)
    res.send(filteredOrders)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}
const vendorDetails = async (req, res) => {
  try {
    let vendorDetails = await Vendor.findById(req.params.id)

    res.send(vendorDetails)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const vendorAuthentication = async (req, res) => {
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
const update = async (req, res) => {
  let vendorId = req.params.id
  const update = {
    name: req.body.name,
    avatar: req.body.avatar,
    location: req.body.location
  }
  try {
    const updatedVendor = await Vendor.findOneAndUpdate(
      { _id: vendorId },
      { $set: update },
      { new: true }
    )
    res.send(updatedVendor)
  } catch (error) {
    console.log(`error:${error}`)
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
  vendorDetails,
  vendorAuthentication,
  update
}
