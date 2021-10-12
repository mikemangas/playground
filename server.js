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

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'"],
        "connect-src": [
          "nominatim.openstreetmap.org",
          "https://nominatim.openstreetmap.org",
          "https://spielplatzchecken.de",
          "spielplatzchecken.de",
        ],
        "img-src": [
          "https://a.tile.openstreetmap.org",
          "https://b.tile.openstreetmap.org",
          "https://c.tile.openstreetmap.org",
          "https://a.tiles.openstreetmap.org",
          "https://b.tiles.openstreetmap.org",
          "https://c.tiles.openstreetmap.org",
        ],
      },
    },
  })
);
app.use(cors());
app.use(express.json());
app.use(playgroundRoutes);
app.use(userRoutes);
app.use(contactFormRoutes);
app.use(VisitsRoutes);
app.use(CronRoutes);
app.use(CheckinRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve any static file
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const { MONGO_URI, PORT } = process.env;

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
