const Order = require('../models/Order')
const Customer = require('../models/Customer')
const OwnedPlant = require('../models/OwnedPlant')

const orders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.id })
    res.send(orders)
  } catch {
    res.send(`error: ${error}`)
  }
}
const customerDetails = async (req, res) => {
  try {
    // let customerDetails = await Customer.findOne({
    //   auth0_id: req.params.id
    // }).populate('cart')

    // console.log(customerDetails.cart[0].type.toString())

    // customerDetails.populate({
    //   path: 'cart.itemId',
    //   model: customerDetails.cart[0].type.toString()
    // })
    let customerDetails = await Customer.findOne({
      auth0_id: req.params.id
    })
      .populate('cart')
      .populate({
        path: 'cart',
        populate: {
          path: 'itemId',
          model: this.type
        }
        // model: "Plant",
      })

    // customerDetails.cart.forEach((item) => {
    //   console.log(typeof item.type)
    //   customerDetails.populate({
    //     // path: 'cart',

    //     populate: { path: 'itemId', model: item.type.toString() }
    //   })
    // })

    res.send(customerDetails)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const deleteOwnedPlant = async (req, res) => {
  try {
    const customer = await Customer.find({ auth0_id: req.params.id })
    customer.ownedPlants = customer.ownedPlants.filter(
      (ownedPlant) => ownedPlant.toString() !== req.body.ownedPlantId
    )
    await customer.save()
  } catch (error) {
    res.send(`error in deleting order: ${error}`)
  }
}

const addOwnedPlant = async (req, res) => {
  try {
    const ownedPlant = await OwnedPlant.findById(req.body.ownedPlantId)
    const customer = await Customer.find({ auth0_id: req.params.id })
    if (
      !customer.ownedPlants.some((plant) => plant._id.equals(ownedPlant._id))
    ) {
      customer.ownedPlants.push(ownedPlant)
      await customer.save()
    }
  } catch (error) {
    res.send(`error in deleting order: ${error}`)
  }
}

module.exports = {
  orders,
  customerDetails,
  addOwnedPlant,
  deleteOwnedPlant
}
