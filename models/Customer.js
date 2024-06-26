const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const CustomerSchema = new Schema(
  {
    auth0_id: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    cart: [{ type: Schema.Types.ObjectId, ref: 'ShoppingCartItem' }],
    address: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Customer', CustomerSchema)
