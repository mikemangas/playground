const express = require("express");
const router = express.Router();
const Visits = require("../models/Visits");

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
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

// router.post("/api/visits", async (req, res) => {
//   const counter = req.body;
//   await Visits.create(counter);
// });
