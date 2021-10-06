const mongoose = require("mongoose");
const { Schema } = mongoose;

const checkinsSummaryMonthlySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  counter: {
    type: Number,
    required: true,
  },
});

const CheckinsSummaryMonthly = mongoose.model(
  "CheckinsSummaryMonthly",
  checkinsSummaryMonthlySchema
);

module.exports = CheckinsSummaryMonthly;
