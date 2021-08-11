const mongoose = require("mongoose");
const { Schema } = mongoose;

const playGroundSchema = new Schema({
  checkedIn: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
  },
  properties: {
    access: {
      type: String,
    },
    leisure: {
      type: String,
    },
    name: {
      type: String,
    },
    note: {
      type: String,
    },
    wheelchair: {
      type: String,
    },
    surface: {
      type: String,
    },
    max_age: {
      type: Number,
    },
    min_age: {
      type: Number,
    },
  },
  geometry: {
    type: {
      type: String,
    },
    coordinates: {
      type: Array,
    },
  },
  timestamps: true,
  versionKey: false,
});
const Playground = mongoose.model("Playground", playGroundSchema);
module.exports = Playground;
