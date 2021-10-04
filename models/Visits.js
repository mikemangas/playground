const mongoose = require("mongoose");
const { Schema } = mongoose;

const visitsSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  counter: {
    type: Number,
    required: true,
  },
  pageName: {
    type: String,
    required: true,
  },
});

const Visits = mongoose.model("Visits", visitsSchema);
module.exports = Visits;
