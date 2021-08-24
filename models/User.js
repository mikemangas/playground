const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  checkedInPlayground: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
