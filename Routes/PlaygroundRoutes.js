const Playground = require("../models/Playground");
const User = require("../models/User");
const express = require("express");
const router = express.Router();

//NOT USED find playground by Id
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

//NOT USED find a checkedin user in playground
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

//NOT USED create a playground
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

//NOT USED Delete a playground
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

// router.patch("/api/playground/:id", (req, res) => {
//   const id = req.params.id;
//   const userCounter = req.body;

//   Playground.findByIdAndUpdate(id, userCounter, { new: true }).then(
//     (playground) => {
//       res.status(200).json({
//         status: "CHECKED-IN",
//         count: playground.userCounter,
//         playgroundId: playground._id,
//       });
//     }
//   );
// });

/*
  This endpoint allows us to check-in and check-out
  depending on the user current status
*/
router.patch("/api/playground/:playgroundId", async (req, res) => {
  const { playgroundId } = req.params;
  const { userId } = req.body;

  // how is the user?
  // if the user is checked-in in this park, we checkout the user
  // if the user is checked-in, but not in this park, we send an error
  // if the user is not checked-in in any park, we check them in this park

  const user = await User.findOne({ userId });

  if (!user) {
    await User.create({ userId, checkedInPlayground: playgroundId });
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

  // User.findOne({
  //   userId,
  // }).then((user) => {
  //   if (!user) {
  //     // Check in
  //     // Create user
  //     User.create({
  //       userId,
  //       checkedInPlayground: playgroundId,
  //     })
  //       .then((newUser) => {
  //         return Playground.findByIdAndUpdate(
  //           playgroundId,
  //           {
  //             userCounter: {
  //               $inc: 1,
  //             },
  //           },
  //           { new: true }
  //         );
  //       })
  //       .then(() => {
  //         res.status(200).send({
  //           status: "CHECKED-IN",
  //         });
  //       });
  //   } else {
  //     if (user.checkedInPlayground === playgroundId) {
  //       // Check out
  //       User.findOneAndDelete({
  //         userId,
  //       })
  //         .then(() => {
  //           return Playground.findByIdAndUpdate(
  //             playgroundId,
  //             {
  //               userCounter: {
  //                 $inc: -1,
  //               },
  //             },
  //             { new: true }
  //           );
  //         })
  //         .then(() => {
  //           res.status(200).send({
  //             status: "CHECKED-OUT",
  //           });
  //         });
  //     } else {
  //       // Useris checked in in anothe playground
  //     }
  //   }
});

// Playground.findById(id).then((playground) => {
//   if (playground.checkedIn.includes(userId)) {
//     console.log("CHECKED-OUT");
//     // userId in playground
//     Playground.findByIdAndUpdate(
//       id,
//       {
//         $pull: { checkedIn: userId },
//       },
//       { new: true }
//     ).then((updatedPlayground) => {
//       res.status(200).json({
//         status: "CHECKED-OUT",
//         count: updatedPlayground.checkedIn.length,
//       });
//     });
//   } else {
//     console.log("CHECKED-IN");
//     // userId not in playground
//     Playground.findByIdAndUpdate(
//       id,
//       {
//         $push: { checkedIn: userId },
//       },
//       { new: true }
//     ).then((updatedPlayground) => {
//       res.status(200).json({
//         status: "CHECKED-IN",
//         count: updatedPlayground.checkedIn.length,
//       });
//     });
//   }
// });

module.exports = router;

// Checkin
// Checkout

// Fetch all playgrounds (maybe with filtering)
// Get user information

// Planned
// Create parks
