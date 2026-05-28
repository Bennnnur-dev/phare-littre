const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: "string",
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("users", schema);
