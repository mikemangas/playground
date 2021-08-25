const Playground = require("../models/Playground");
const express = require("express");
const router = express.Router();

//find playground by Id
router.get("/api/playground/:id", (req, res) => {
  const id = req.params.id;
  Playground.findById(id)
    .then((playground) => {
      res.status(200).json(playground);
    })
    .catch(() => {
      res.status(500).json({
        error:
          "something went wrong when searching for a playground. please try again",
      });
    });
});

//find all playgrounds
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

//find a checkedin user in playground
router.get("/api/users/:userId", (req, res) => {
  const { userId } = req.params;
  Playground.find({
    checkedIn: userId,
  }).then((playgrounds) => {
    if (playgrounds.length === 0) {
      res.send({
        checkedIn: false,
      });
    } else {
      res.send({
        checkedIn: true,
        checkedInPlayground: playgrounds[0]._id,
      });
    }
  });
});

//create a playground
router.post("/api/playground", (req, res) => {
  Playground.create(req.body)
    .then((newPlayground) => {
      res.status(201).send(newPlayground);
    })
    .catch(() => {
      res.status(500).res.json({
        error:
          "something went wrong when creating a playground, please try again",
      });
    });
});

//Delete a playground
router.delete("/api/playground/:id", (req, res) => {
  const id = req.params.id;
  Playground.findByIdAndRemove(id)
    .then((body) => {
      res.status(204);
      console.log(`successfully deleted ${body.title}`);
    })
    .catch(() => {
      res.status(500).json({
        error:
          "something went wrong when deleting a playgtround title, please try again",
      });
    });
});

router.patch("/api/playground/:id", (req, res) => {
  const id = req.params.id;
  const userCounter = req.body;

  Playground.findByIdAndUpdate(id, userCounter, { new: true }).then(
    (playground) => {
      res.status(200).json({
        status: "CHECKED-IN",
        count: playground.userCounter,
        playgroundId: playground._id,
      });
    }
  );
});

module.exports = router;
