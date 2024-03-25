const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ShoppingCartItem = new Schema(
  {
    quantity: { type: Number, required: true },
    itemId: { type: Schema.Types.ObjectId, refPath: 'itemModel' },
    itemModel: {
      type: String,
      required: true,
      enum: ['Plant', 'Produce', 'Service', 'Tool', 'Package']
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model('ShoppingCartItem', ShoppingCartItem)
