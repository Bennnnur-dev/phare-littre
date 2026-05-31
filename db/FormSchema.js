const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    message: {
      type: "string",
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
      type: "string",
      required: [true, "Veuillez présenter un nom valide%%"],
      minLength: [3, "%%Le nom doit être d'au moins 3 charactères%%"],
      maxLength: [90, "%%Le nom doit être infèrieur à 90 caractères%%"],
    },
    bullied: {
      type: "boolean",
      required: true,
      default: false,
    },
    date: {
      type: "string",
      required: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Forms", schema);
