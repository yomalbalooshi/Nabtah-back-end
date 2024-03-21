const { Schema } = require('mongoose')

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    cart: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    address: { type: String }
  },
  { timestamps: true }
)

module.exports = customerSchema
