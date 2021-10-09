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

router.get("/api/visit-stats", (req, res) => {
  // const counter = req.body;
  Visits.find()
    .then((visits) => {
      res.send(visits);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
