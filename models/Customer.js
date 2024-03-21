const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    cart: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    ownedPlants: [{ type: Schema.Types.ObjectId, ref: 'OwnedPlant' }],
    address: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.Model('Customer', CustomerSchema)
