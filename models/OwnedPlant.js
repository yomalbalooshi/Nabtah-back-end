const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ownedPlantSchema = new Schema(
  {
    apiId: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    scientificName: String,
    family: String,
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
