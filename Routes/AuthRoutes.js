const express = require("express");
const router = express.Router();
const passport = require("passport");

//auth login

router.get("/login", (req, res) => {
  res.render("login");
});

//auth logout

router.get("/logout", (req, res) => {
  //handle with passport
  res.render("logging out");
});

//auth with google

router.post(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

module.exports = router;
