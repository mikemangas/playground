const Playground = require("../models/Playground");
const User = require("../models/User");
const express = require("express");
const router = express.Router();
const Checkins = require("../models/Checkins");

router.get("/api/playground/:longitude/:latitude", async (req, res) => {
  const { latitude } = req.params;
  const { longitude } = req.params;

  try {
    const playgrounds = await Playground.find({
      geometry: {
        $nearSphere: {
          $geometry: {
            type: "Polygon",
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: 3000,
        },
      },
    }).lean();
    const playgroundsWithCountPromises = playgrounds.map(async (playground) => {
      const userCount = await User.find({
        checkedInPlayground: playground._id,
      }).countDocuments();
      return { ...playground, userCount };
    });
    const playgroundsWithCount = await Promise.all(
      playgroundsWithCountPromises
    );
    res.send(playgroundsWithCount);
  } catch (error) {
    res.status(500);
    console.log("playground id 1" + playgroundId);
    console.error(error + "playground error 2 " + playground._id);
  }
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

    res.status(200).send({
      status: "CHECKED-IN",
      playgroundId: playgroundId,
    });
    try {
      await Checkins.create({ playgroundId: playgroundId });
    } catch {
      console.error("error");
      res.status(500);
    }
  } else {
    if (user.checkedInPlayground === playgroundId) {
      await User.findOneAndDelete({
        userId,
      });
      res.status(200).send({
        status: "CHECKED-OUT",
      });
    }
  }
});

router.get("/api/playgroundshare/:longitude/:latitude", (req, res) => {
  const { latitude } = req.params;
  const { longitude } = req.params;

  try {
    res.send({ longitude, latitude });
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
