const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const Customer = require('../models/Customer')

const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const newOrder = await Order.create(req.body)
    const customerId = newOrder.customer
    await OrderItem.deleteMany({ customer: customerId })
    await Customer.findOneAndUpdate(
      { _id: customerId },
      { $set: { cart: [] }, $push: { orders: newOrder._id } }
    )

    res.send(newOrder)
    res.send(newOrder)
  } catch (err) {
    res.send(`error in creating tool: ${err}`)
  }
}

const update = async (req, res) => {
  let orderId = req.params.id
  const update = {
    delivered: req.body.delivered
  }
  try {
    const updatedOrder = await OrderItem.findOneAndUpdate(
      { _id: orderId },
      { $set: update },
      { new: true }
    )
    res.send(updatedOrder)
  } catch (error) {
    console.log(`error:${error}`)
  }
}

module.exports = {
  create,
  update
}
