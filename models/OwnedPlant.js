const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ownedPlantSchema = new Schema(
  {
    apiId: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, required: true, default: true },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
    scientificName: String,
    family: String,
    origin: String,
    dimensions: { min: Number, max: Number, unit: String },
    cycle: String,
    watering: String,
    sunlight: [String],
    pruningMonth: [String],
    pruningCount: { amount: Number, interval: String },
    description: String,
    image: String
  },
  { timestamps: true }
)

module.exports = mongoose.model('OwnedPlant', ownedPlantSchema)
