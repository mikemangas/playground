const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();

// const { GOOGLE_CLIENT, GOOGLE_SECRET } = process.env;

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID:
        "557635390240-17nvvt4l2kd4bdtlrr96rhmjsvojluf3.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/redirect",
    },
    () => {
      // passport callback function
    }
  )
);
