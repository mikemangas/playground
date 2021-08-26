const Playground = require("../models/Playground");
const User = require("../models/User");
const express = require("express");
const router = express.Router();

router.get("/api/playground", (req, res) => {
  Playground.find({})
    .then((playground) => {
      res.status(200).json(playground);
    })
    .catch(() => {
      res.status(500).json({
        error:
          "something went wrong when calling the playgrounds. please try again",
      });
    });
});

router.patch("/api/playground/:playgroundId", async (req, res) => {
  const { playgroundId } = req.params;
  const { userId } = req.body;

  const user = await User.findOne({ userId });

  if (!user) {
    await User.create({
      userId,
      checkedInPlayground: playgroundId,
    });
    await Playground.findByIdAndUpdate(
      playgroundId,
      {
        $inc: {
          userCounter: 1,
        },
      },
      { new: true }
    );

    res.status(200).send({
      status: "CHECKED-IN",
      playgroundId: playgroundId,
    });
  } else {
    if (user.checkedInPlayground === playgroundId) {
      await User.findOneAndDelete({
        userId,
      });
      await Playground.findByIdAndUpdate(
        playgroundId,
        {
          $inc: {
            userCounter: -1,
          },
        },
        { new: true }
      );

      res.status(200).send({
        status: "CHECKED-OUT",
      });
    }
  }
});

module.exports = router;
