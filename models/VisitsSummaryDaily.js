const mongoose = require("mongoose");
const { Schema } = mongoose;

const visitsSummaryDailySchema = new Schema({
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

const VisitsSummaryDaily = mongoose.model(
  "VisitsSummaryDaily",
  visitsSummaryDailySchema
);

module.exports = VisitsSummaryDaily;
