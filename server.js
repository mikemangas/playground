require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const Playground = require("./models/Playground");

/* Middleware */
app.use(express.json());
app.use(cors());

/*
All your api endpoints should be prefixed with /api and be before the next ones
If you have many endpoints, consider use Express Router for each set of endpoints
*/

app.get("/api/playground", (req, res) => {
  Playground.find({})
    .then((playground) => {
      res.status(200).json(playground);
    })
    .catch(() => {
      res.status(500);
      res.json({
        error:
          "something went wrong when calling the playgrounds. please try again",
      });
    });
});

app.post("/api/playground", (req, res) => {
  Playground.create(req.body)
    .then((newPlayground) => {
      res.status(201).send(newPlayground);
    })
    .catch(() => {
      res.status(500);
      res.json({
        error:
          "something went wrong when creating a playground, please try again",
      });
    });
});

app.delete("/api/playground/:id", (req, res) => {
  const id = req.params.id;
  Playground.findByIdAndRemove(id)
    .then((body) => {
      res.status(204);
      console.log(`successfully deleted ${body.title}`);
    })
    .catch(() => {
      res.status(500);
      res.json({
        error:
          "something went wrong when deleting a playgtround title, please try again",
      });
    });
});

app.patch("/api/playground/:id", (req, res) => {
  const id = req.params.id;
  Playground.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatePlayground) => {
      if (!updatePlayground) {
        res.status(404).end();
        return;
      }
      res.send(updatePlayground);
    })
    .catch(() => {
      res.status(500);
      res.json({
        error:
          "something went wrong when updating a playgrround title, please try again",
      });
    });
});
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
    console.log("conntected to the mongo database");
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
