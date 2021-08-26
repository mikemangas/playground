const User = require("../models/User");
const express = require("express");
const router = express.Router();

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

module.exports = router;
