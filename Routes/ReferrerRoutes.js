const express = require("express");
const router = express.Router();
const Referrer = require("../models/Referrer");

router.post("/api/referrer/", async (req, res) => {
  let { referrer } = req.body;

  try {
    await Referrer.create({
      referrerName: referrer,
    });
  } catch (error) {
    console.error(
      "there has been an error, while creating a referrer entry",
      error
    );
  }
});

module.exports = router;
