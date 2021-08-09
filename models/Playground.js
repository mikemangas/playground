const mongoose = require("mongoose");
const { Schema } = mongoose;

const playGroundSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    author: {
      maxLength: 80,
      required: false,
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
      required: false,
    },

    genre: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);
const Playground = mongoose.model("Playground", playGroundSchema);
module.exports = Playground;
