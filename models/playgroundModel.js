const mongoose = require("mongoose");
const { Schema } = mongoose;

const playGroundSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      maxLength: 80,
      required: true,
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
      required: false,
    },

    genre: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
//use singular for model names like "Book"
const Playground = mongoose.model("Playground", playGroundSchema);
module.exports = Playground;
