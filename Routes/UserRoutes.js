const User = require("../models/User");
const express = require("express");
const router = express.Router();

//Create a new User
router.post("/api/user", (req, res) => {
  User.create(req.body)
    .then((newUser) => {
      res.status(201).send(newUser);
      console.log("User successfully generated");
    })
    .catch(() => {
      res.status(500).json({
        error:
          "something went wrong when creating a user, please check the error",
      });
    });
});

//Delete a User
router.delete("/api/user/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then((body) => {
      res.status(204);
      console.log(`User successfully deleted`);
    })
    .catch(() => {
      res.status(500).json({
        error: "something went wrong when deleting a user. please check",
      });
    });
});

//find out the playgroundinfos, where user is checked in
router.get("/api/user/:userId", (req, res) => {
  const { userId } = req.params;
  User.find({
    userId: userId,
  }).then((users) => {
    if (users.length === 0) {
      res.send({
        checkedIn: false,
      });
    } else {
      res.send({
        checkedIn: true,
        checkedInPlayground: users[0].checkedInPlayground,
        checkedInUserMongoId: users[0]._id,
        checkedInLocalStorageId: users[0].userId,
      });
    }
  });
});

//Find all users
router.get("/api/user", (req, res) => {
  User.find({})
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({
        error:
          "something went wrong when calling the playgrounds. please try again",
      });
    });
});

//Find all users, checked in a specific playground
router.get("/api/userinplayground/:checkedInPlayground", (req, res) => {
  const { checkedInPlayground } = req.params;
  User.find({
    checkedInPlayground: checkedInPlayground,
  }).then((users) => {
    res.send({
      userCounter: users.length,
    });
  });
});

module.exports = router;
