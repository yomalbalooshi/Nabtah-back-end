const OrderItem = require('../models/OrderItem')
const Customer = require('../models/Customer')

const index = async (req, res) => {
  const orderItems = await OrderItem.find({}).populate('itemId')
  res.send(orderItems)
}

const show = async (req, res) => {
  const order = await OrderItem.findById(req.params.id)
  res.send(order)
}

const deleteOrderItem = async (req, res) => {
  try {
    const order = await OrderItem.findById(req.params.id).populate('customer')

    const customer = await Customer.findOne({
      auth0_id: order.customer.auth0_id
    })
    console.log(customer)
    customer.cart = customer.cart.filter(
      (item) => item._id.toString() !== req.params.id
    )
    await customer.save()
    res.send(await order.deleteOne())
  } catch (error) {
    res.send(`error in deleting order: ${error}`)
  }
}

const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const order = await (await OrderItem.create(req.body)).populate('customer')
    const customer = await Customer.findById(req.body.customer)
    customer.cart.push(order)
    await customer.save()
    res.send(order)
  } catch (err) {
    res.send(`error in creating order: ${err}`)
  }
}

const update = async (req, res) => {
  let orderItemId = req.params.id
  const update = {
    quantity: req.body.quantity,
    message: req.body.quantity
  }
  try {
    const updatedOrderItem = await OrderItem.findOneAndUpdate(
      { _id: orderItemId },
      { $set: update },
      { new: true }
    )
    res.send(updatedOrderItem)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

module.exports = {
  index,
  show,
  create,
  deleteOrderItem,
  update
}
