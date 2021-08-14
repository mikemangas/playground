const mongoose = require("mongoose");
const { Schema } = mongoose;

const playGroundSchema = new Schema({
  checkedIn: {
    type: [String],
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
      type: [Number],
      required: true,
    },
  },
});
const Playground = mongoose.model("Playground", playGroundSchema);
module.exports = Playground;
