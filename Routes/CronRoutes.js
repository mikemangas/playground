const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const Visits = require("../models/Visits");
const VisitsSummaryDaily = require("../models/VisitsSummaryDaily");
const VisitsSummaryMonthly = require("../models/VisitsSummaryMonthly");
const Checkins = require("../models/Checkins");
const CheckinsSummaryDaily = require("../models/CheckinsSummaryDaily");
const CheckinsSummaryMonthly = require("../models/CheckinsSummaryMonthly");

cron.schedule("43 44 22 * * *", async () => {
  const currentVisits = await Visits.find();
  const allVisits = currentVisits.map((singleValues) => {
    VisitsSummaryDaily.create({
      counter: singleValues.counter,
      pageName: singleValues.pageName,
    });
  });
  console.log("visitsdaily created at 22:44:43");
  return allVisits;
});

cron.schedule("0 0 3 1 1-12 *", async () => {
  const currentVisits = await Visits.find();
  const allVisits = currentVisits.map((singleValues) => {
    VisitsSummaryMonthly.create({
      counter: singleValues.counter,
      pageName: singleValues.pageName,
    });
  });
  return allVisits;
});

cron.schedule("45 46 21 * * *", async () => {
  const currentCheckins = await Checkins.find();
  const allCheckins = CheckinsSummaryDaily.create({
    counter: currentCheckins.length,
  });
  console.log("checkinsdaily created at 21:46:45");
  return allCheckins;
});

cron.schedule("0 0 3 1 1-12 *", async () => {
  const currentCheckins = await Checkins.find();
  const allCheckins = CheckinsSummaryMonthly.create({
    counter: currentCheckins.length,
  });
  return allCheckins;
});

module.exports = router;
