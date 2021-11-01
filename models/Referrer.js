const mongoose = require("mongoose");
const { Schema } = mongoose;

const referrerSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  referrerName: {
    type: String,
    required: true,
  },
});

const Referrer = mongoose.model("Referrer", referrerSchema);
module.exports = Referrer;
