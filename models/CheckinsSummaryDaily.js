const mongoose = require("mongoose");
const { Schema } = mongoose;

const checkinsSummaryDailySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  counter: {
    type: Number,
    required: true,
  },
});

const CheckinsSummaryDaily = mongoose.model(
  "CheckinsSummaryDaily",
  checkinsSummaryDailySchema
);

module.exports = CheckinsSummaryDaily;
