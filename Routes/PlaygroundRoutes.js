const Playground = require("../models/Playground");
const User = require("../models/User");
const express = require("express");
const router = express.Router();

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
          $maxDistance: 2000,
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
    console.log(playgroundsWithCount);
    res.send(playgroundsWithCount);
  } catch (error) {
    console.error(error);
    res.status(500);
    //send error
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

module.exports = router;
