const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Veuillez inscrire un identifiant"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Veuillez inscrire un mot de passe"],
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

schema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

schema.methods.comparePassword = async function (inputPassword) {
  const isValid = bcrypt.compare(inputPassword, this.password);
  return isValid;
};

module.exports = mongoose.model("Users", schema);
