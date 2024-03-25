const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ShoppingCart = new Schema(
  {
    customer: { type: Schema.Types.ObjectId },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ShoppingCartItem'
      }
    ]
  },
  { timestamps: true }
)
module.exports = mongoose.model('ShoppingCart', ShoppingCart)
