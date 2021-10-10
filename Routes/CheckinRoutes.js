const express = require("express");
const router = express.Router();

const CheckinsSummaryDaily = require("../models/CheckinsSummaryDaily");

router.get("/api/checkinsdaily/", (req, res) => {
  CheckinsSummaryDaily.find({})
    .then((visits) => {
      res.send(visits);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
