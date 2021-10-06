const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const Visits = require("../models/Visits");
const VisitsSummaryDaily = require("../models/VisitsSummaryDaily");
const VisitsSummaryMonthly = require("../models/VisitsSummaryMonthly");
const Checkins = require("../models/Checkins");
const CheckinsSummaryDaily = require("../models/CheckinsSummaryDaily");
const CheckinsSummaryMonthly = require("../models/CheckinsSummaryMonthly");

cron.schedule("59 59 20 * * *", async () => {
  const currentVisits = await Visits.find();
  const allVisits = currentVisits.map((singleValues) => {
    VisitsSummaryDaily.create({
      counter: singleValues.counter,
      pageName: singleValues.pageName,
    });
  });
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

cron.schedule("59 59 20 * * *", async () => {
  const currentCheckins = await Checkins.find();
  const allCheckins = CheckinsSummaryDaily.create({
    counter: currentCheckins.length,
  });
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
