const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "%%Veuillez fournir une description%%"],
      minLength: [
        60,
        "%%Le contenu de la description doit être au minimum de 60 caractères%%",
      ],
      maxLength: [
        2000,
        "%%Le contenu de la description doit être au maximum de 2000 caractères%%",
      ],
    },
    name: {
      type: String,
      required: [true, "Veuillez présenter un nom valide%%"],
      minLength: [3, "%%Le nom doit être d'au moins 3 charactères%%"],
      maxLength: [90, "%%Le nom doit être infèrieur à 90 caractères%%"],
    },
    bullied: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: String,
      required: false,
    },
    important: {
      type: Boolean,
      required: true,
      default: false,
    },
    color: {
      type: String,
      required: true,
      default: "rgb(94, 142, 201)",
    },
  },
  { timestamps: true },
);

schema.pre("save", async function () {
  this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  this.important = false;
});

module.exports = mongoose.model("Forms", schema);
