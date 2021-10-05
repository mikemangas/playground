const mongoose = require("mongoose");
const { Schema } = mongoose;

const visitsSummaryMonthlySchema = new Schema({
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

const VisitsSummaryMonthly = mongoose.model(
  "VisitsSummaryMonthly",
  visitsSummaryMonthlySchema
);

module.exports = VisitsSummaryMonthly;
