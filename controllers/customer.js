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
  //if not found, creates the customer
  try {
    let customerDetails = await Customer.findOne({
      auth0_id: req.params.id
    })
      .populate('cart')
      .populate({
        path: 'cart',
        populate: {
          path: 'itemId'
        }
      })
    if (!customerDetails) {
      customerDetails = await Customer.create({
        auth0_id: req.params.id,
        email: req.body.email,
        name: req.body.name,
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReDL3VWF1LoQP7RzNJj-9QEk4YD_nJkSO7rQ&usqp=CAU'
      })
    }

    res.send(customerDetails)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const deleteOwnedPlant = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id })
    customer.ownedPlants = customer.ownedPlants.filter(
      (ownedPlant) => ownedPlant.toString() !== req.body.ownedPlantId
    )
    await customer.save()
    res.send('Deleted')
  } catch (error) {
    res.send(`error in deleting order: ${error}`)
  }
}

const addOwnedPlant = async (req, res) => {
  try {
    const ownedPlants = await OwnedPlant.find({})
    let ownedPlantExist = false

    ownedPlants.forEach(async (ownedPlant) => {
      if (ownedPlant.apiId === req.body.apiId) {
        ownedPlantExist = true
      }
    })
    let ownedPlant
    if (ownedPlantExist === false) {
      ownedPlant = await OwnedPlant.create(req.body)
    } else {
      ownedPlant = await OwnedPlant.findOne({ apiId: req.body.apiId })
    }

    const customer = await Customer.findOne({ _id: req.params.id })

    if (
      !customer.ownedPlants.some((plant) => plant._id.equals(ownedPlant._id))
    ) {
      customer.ownedPlants.push(ownedPlant)
      await customer.save()
    }
    res.send(ownedPlant)
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
