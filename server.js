require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const Playground = require("./models/Playground");
const User = require("./models/User");

app.use(express.json());
app.use(cors());

app.get("/api/playground/:id", (req, res) => {
  const id = req.params.id;
  Playground.findById(id)
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

app.get("/api/playground", (req, res) => {
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

app.post("/api/playground", (req, res) => {
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

//Create a new User
app.post("/api/user", (req, res) => {
  User.create(req.body)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch(() => {
      res.status(500).json({
        error:
          "something went wrong when creating a user, please check the error",
      });
    });
});

//Find all users
app.get("/api/user", (req, res) => {
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

//Delete a User
app.delete("/api/user/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then((body) => {
      res.status(204);
      console.log(`successfully deleted`);
    })
    .catch(() => {
      res.status(500).json({
        error: "something went wrong when deleting a user. please check",
      });
    });
});

//Delete a playground
app.delete("/api/playground/:id", (req, res) => {
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

//patch a playground
app.patch("/api/playground/:id", (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  Playground.findById(id).then((playground) => {
    if (playground.checkedIn.includes(userId)) {
      console.log("CHECKED-OUT");
      // userId in playground
      Playground.findByIdAndUpdate(
        id,
        {
          $pull: { checkedIn: userId },
        },
        { new: true }
      ).then((updatedPlayground) => {
        res.status(200).json({
          status: "CHECKED-OUT",
          count: updatedPlayground.checkedIn.length,
        });
      });
    } else {
      console.log("CHECKED-IN");
      // userId not in playground
      Playground.findByIdAndUpdate(
        id,
        {
          $push: { checkedIn: userId },
        },
        { new: true }
      ).then((updatedPlayground) => {
        res.status(200).json({
          status: "CHECKED-IN",
          count: updatedPlayground.checkedIn.length,
        });
      });
    }
  });
});

//find a checkedin user in playground
app.get("/api/users/:userId", (req, res) => {
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
