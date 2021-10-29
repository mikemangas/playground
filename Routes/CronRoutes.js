const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const Visits = require("../models/Visits");
const VisitsSummaryDaily = require("../models/VisitsSummaryDaily");
const VisitsSummaryMonthly = require("../models/VisitsSummaryMonthly");
const Checkins = require("../models/Checkins");
const CheckinsSummaryDaily = require("../models/CheckinsSummaryDaily");
const CheckinsSummaryMonthly = require("../models/CheckinsSummaryMonthly");

//schedule daily visits and checkins
cron.schedule(
  "59 59 23 * * *",
  async () => {
    const currentVisits = await Visits.find();
    currentVisits.forEach((singleValues) => {
      VisitsSummaryDaily.create({
        counter: singleValues.counter,
        pageName: singleValues.pageName,
      });
    });

    const currentCheckins = await Checkins.find();
    CheckinsSummaryDaily.create({
      counter: currentCheckins.length,
    });
  },
  { timezone: "GMT0" }
);

//schedule  monthly visits
cron.schedule(
  "3 0 3 1 1-12 *",
  async () => {
    const currentVisits = await Visits.find();
    currentVisits.forEach((singleValues) => {
      VisitsSummaryMonthly.create({
        counter: singleValues.counter,
        pageName: singleValues.pageName,
      });
    });
    const currentCheckins = await Checkins.find();
    CheckinsSummaryMonthly.create({
      counter: currentCheckins.length,
    });
  },
  { timezone: "GMT0" }
);

module.exports = router;
