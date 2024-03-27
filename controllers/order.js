const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const Customer = require('../models/Customer')

const create = async (req, res) => {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    let newOrderItems = []
    await Promise.all(
      req?.body?.orderItems?.map(async (item) => {
        const newOrderItem = await OrderItem.create(item)
        newOrderItems.push(newOrderItem)
      })
    )

    const order = {
      orderItems: newOrderItems?.map((item) => item._id),
      customer: req.body.customer
    }
    const newOrder = await Order.create(order)
    const customerId = newOrder.customer
    await Customer.findOneAndUpdate(
      { _id: customerId },
      { $set: { cart: [] }, $push: { orders: newOrder._id } }
    )

    res.send(newOrder)
  } catch (err) {
    console.log(err.message)

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
