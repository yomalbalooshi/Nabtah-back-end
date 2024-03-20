const { Schema } = require('mongoose')

const packageSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String},
    frequency: {type: String},
    plants: [{ type: Schema.Types.ObjectId, ref: "Plant" }],
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    produce: [{ type: Schema.Types.ObjectId, ref: "Produce" }],
    tools: [{ type: Schema.Types.ObjectId, ref: "Tool" }],
    availablity: { type: Boolean, required: true, default: true },
    vendorId: [{ type: Schema.Types.ObjectId, ref: "Vendor" }]
  },
  { timestamps: true }
)

module.exports = packageSchema
