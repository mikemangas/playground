const express = require("express");
const router = express.Router();
const VisitsSummaryDaily = require("../models/VisitsSummaryDaily");
const Visits = require("../models/Visits");
const CheckinsSummaryDaily = require("../models/CheckinsSummaryDaily");

router.get("/api/visits/:id", async (req, res) => {
  const counter = req.body;
  const id = req.params.id;

  try {
    await Visits.findOneAndUpdate(
      { _id: id },

      {
        $inc: { counter: +1 },
      },
      { new: true }
    );

    res.status(200).send(counter);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/visitsdaily/overall", (req, res) => {
  VisitsSummaryDaily.find({ pageName: "spielplatzchecken.de" })
    .then((visits) => {
      res.send(visits);
    })
    .catch((error) => console.error(error));
});

router.get("/api/visitsdaily/home", (req, res) => {
  VisitsSummaryDaily.find({ pageName: "spielplatzchecken.de/home" })
    .then((visits) => {
      res.send(visits);
    })
    .catch((error) => console.error(error));
});

router.get("/api/visitsdaily/map", (req, res) => {
  VisitsSummaryDaily.find({ pageName: "spielplatzchecken.de/map" })
    .then((visits) => {
      res.send(visits);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
