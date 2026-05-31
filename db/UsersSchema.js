const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  forename: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["personnel", "ambassadeur"],
    required: true,
  },
});

module.exports = mongoose.model("Users", schema);
