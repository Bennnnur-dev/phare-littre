const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    message: {
      type: "string",
      required: [true, "Veuillez fournir une justification"],
      minLength: [60, "Le contenu doit être au minmum de 60 caractères"],
    },
    anonymous: {
      type: "boolean",
      required: [
        true,
        "Veuillez choisir entre rester anonyme ou publier votre nom",
      ],
    },
    name: {
      type: "string",
      required: [true, "Veuillez présenter un nom valide"],
    },
    expiresAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Forms", schema);
