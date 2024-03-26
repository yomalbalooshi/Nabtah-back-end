const Order = require('../models/Order')
const Customer = require('../models/Customer')
const OwnedPlant = require('../models/OwnedPlant')
const ShoppingCartItem = require('../models/ShoppingCartItem')
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
    let customerDetails = await Customer.findOne({
      _id: req.params.id
    })
      .populate('cart')
      .populate({
        path: 'cart',
        populate: {
          path: 'itemId'
        }
      })
      .populate({
        path: 'orders',
        populate: { path: 'orderItems', populate: { path: 'itemId' } }
      })
    res.send(customerDetails)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}
const customerAuthentication = async (req, res) => {
  //THIS IS CALLED ON USER LOGIN
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
          'https://64.media.tumblr.com/735e658e2d279dba326a5658596c5745/tumblr_ps76c9pCSf1vxg6x3o10_1280.jpg'
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

const deleteCartItem = async (req, res) => {
  try {
    console.log(req.body)
    const customer = await Customer.findOne({ _id: req.params.id })
    customer.cart = customer.cart.filter(
      (cartItem) => cartItem.toString() !== req.body.cartItemId
    )
    await customer.save()

    res.send('Deleted')
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error in deleting cart item: ${error.message}` })
  }
}

const addToCart = async (req, res) => {
  try {
    const { id } = req.params
    const { quantity, itemId, itemModel } = req.body
    const newCartItem = await ShoppingCartItem.create({
      quantity,
      itemId,
      itemModel
    })
    const customer = await Customer.findById(id)
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    customer.cart.push(newCartItem)
    await customer.save()
    res
      .status(201)
      .json({ message: 'Shopping cart item created successfully', newCartItem })
  } catch (error) {
    console.error('Error creating shopping cart item:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
const findCartItem = async (req, res) => {
  const { id, itemId } = req.params
  try {
    let customerDetails = await Customer.findById(id)
      .populate('cart')
      .populate({
        path: 'cart',
        populate: {
          path: 'itemId'
        }
      })
    console.log(customerDetails)
    let cartitem = customerDetails.cart.find(
      (item) => item.itemId._id == itemId
    )
    console.log(cartitem)
    res.send(cartitem)
  } catch (error) {
    console.log(error)
  }
}
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params
    const { itemId, quantity } = req.body
    const cartItem = await ShoppingCartItem.findById(itemId)
    if (!cartItem) {
      return res.status(404).json({ error: 'Shopping cart item not found' })
    }
    cartItem.quantity = quantity
    await cartItem.save()

    const customer = await Customer.findById(id)

    res.status(200).json({ message: 'Shopping cart item updated successfully' })
  } catch (error) {
    console.error('Error updating shopping cart item:', error)
    res.status(500).json({ error: 'Internal server error' })
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
  addToCart,
  customerDetails,
  addOwnedPlant,
  deleteOwnedPlant,
  customerAuthentication,
  deleteCartItem,
  updateCartItem,
  findCartItem
}
