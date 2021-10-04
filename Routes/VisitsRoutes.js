const express = require("express");
const router = express.Router();
const Visits = require("../models/Visits");

router.post("/api/visits", async (req, res) => {
  const counter = req.body;
  await Visits.create(counter);
});

router.patch("/api/visits/:id", async (req, res) => {
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
    console.log(id);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
