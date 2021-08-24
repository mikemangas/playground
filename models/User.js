const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  createdAt: {
    type: Date,
    expires: 60,
    default: Date.now,
  },
  checkedInStatus: {
    type: Boolean,
    required: true,
  },
  checkedInPlayground: {
    type: String,
    required: true,
  },
});
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 15 });
const User = mongoose.model("User", userSchema);
module.exports = User;
