const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OrderSchema = new Schema(
  {
    total: { type: Number, required: true },
    message: String,
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
    vendor: { type: Schema.Types.ObjectId },
    customer: { type: Schema.Types.ObjectId },
    deliveryDate: { type: Date, required: true },
    delivered: { type: Boolean, required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Order', OrderSchema)
