const mongoose = require("mongoose");
const { Schema } = mongoose;

const checkinsSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  playgroundId: {
    type: String,
    required: true,
  },
});

const Checkins = mongoose.model("Checkins", checkinsSchema);
module.exports = Checkins;
