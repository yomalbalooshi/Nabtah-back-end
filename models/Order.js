const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OrderSchema = new Schema(
  {
    total: { type: Number, required: true },
    message: String,
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }]
  },
  { timestamps: true }
)
module.exports = mongoose.model('Order', OrderSchema)
