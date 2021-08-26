const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  createdAt: {
    type: Date,
    expires: 7200,
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
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7200 });
const User = mongoose.model("User", userSchema);
module.exports = User;
