const Order = require('../models/Order')

const create = async (req, res) => {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const newOrder = await Order.create(req.body)
    res.send(newOrder)
  } catch (err) {
    res.send(`error in creating tool: ${err}`)
  }
}

module.exports = {
  create
}
