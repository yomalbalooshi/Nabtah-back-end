const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OrderSchema = new Schema(
  {
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
    vendor: { type: Schema.Types.ObjectId },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Order', OrderSchema)
