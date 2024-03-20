const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const PlantSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
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

module.exports = mongoose.model('Plant', PlantSchema)
