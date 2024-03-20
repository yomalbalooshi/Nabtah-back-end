const { Schema } = require('mongoose')

const plantSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, required: true, default: true },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
    scientificName: { type: String },
    family: { type: String },
    origin: { type: String },
    dimensions: {min: Number, max: Number, unit: String},
    cycle: { type: String },
    watering: { type: String },
    sunlight: [String],
    pruningMonth: [String],
    pruningCount: {amount: Number, interval: String},
    description: {tyoe: String},
    defaultImage: {type: String}
  },
  { timestamps: true }
)

module.exports = plantSchema
