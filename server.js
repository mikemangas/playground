require("dotenv").config();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const playgroundRoutes = require("./Routes/PlaygroundRoutes");
const userRoutes = require("./Routes/UserRoutes");
const contactFormRoutes = require("./Routes/ContactFormRoutes");
const VisitsRoutes = require("./Routes/VisitsRoutes");
const CronRoutes = require("./Routes/CronRoutes");
const CheckinRoutes = require("./Routes/CheckinRoutes");
const helmet = require("helmet");
const ReferrerRoutes = require("./Routes/ReferrerRoutes");
const { MONGO_URI, PORT, ORIGINS } = process.env;
// const whitelist = ORIGINS.split(",");
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": [
          "'self'",
          "'unsafe-inline'",
          "https://spielplatzchecken.de",
          "spielplatzchecken.de",
        ],
        "font-src": ["https://spielplatzchecken.de", "spielplatzchecken.de"],

        "default-src": [
          "'self'",
          "https://spielplatzchecken.de",
          "spielplatzchecken.de",
        ],
        "connect-src": [
          "nominatim.openstreetmap.org",
          "https://nominatim.openstreetmap.org",
          "https://spielplatzchecken.de",
          "spielplatzchecken.de",
          "https://a.tile.openstreetmap.org",
          "https://b.tile.openstreetmap.org",
          "https://c.tile.openstreetmap.org",
          "a.tile.openstreetmap.org",
          "b.tile.openstreetmap.org",
          "c.tile.openstreetmap.org",
          "https://a.tiles.openstreetmap.org",
          "https://b.tiles.openstreetmap.org",
          "https://c.tiles.openstreetmap.org",
        ],
        "img-src": [
          "https://a.tile.openstreetmap.org",
          "https://b.tile.openstreetmap.org",
          "https://c.tile.openstreetmap.org",
          "https://a.tiles.openstreetmap.org",
          "https://b.tiles.openstreetmap.org",
          "https://c.tiles.openstreetmap.org",
          "https://spielplatzchecken.de",
          "spielplatzchecken.de",
          "self",
          "data:",
        ],
      },
    },
  })
);
app.use(express.json());
app.use(playgroundRoutes);
app.use(userRoutes);
app.use(contactFormRoutes);
app.use(VisitsRoutes);
app.use(CronRoutes);
app.use(CheckinRoutes);
app.use(ReferrerRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve any static file
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to the mongo database");
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
