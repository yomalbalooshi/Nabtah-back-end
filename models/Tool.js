const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ToolSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, required: true },
    price: { type: Number, required: true },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor' }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Tool', ToolSchema)
