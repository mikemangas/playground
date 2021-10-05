const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const Visits = require("../models/Visits");
const VisitsSummaryDaily = require("../models/VisitsSummaryDaily");

cron.schedule("1 * * * * *", async () => {
  const hallo = await Visits.find();
  const baba = hallo.map((elements) => {
    console.log(elements.counter);
    console.log(elements.pageName);
  });
  return baba;
});

module.exports = router;
