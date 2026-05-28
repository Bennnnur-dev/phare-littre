const express = require("express");
const app = express();
require("dotenv").config();
const connect = require("./db/connect");
const formRouter = require("./routes/router");
const errorHandler = require("./errors/handler");

//point d'entrée du serveur

const PORT = process.env.PORT;

app.use(express.static("./public"));
app.use(express.json());

app.use("/form", formRouter);

app.use(errorHandler);

async function init() {
  try {
    //connexion de la base de donnée (mongoDB pour l'instant)
    await connect(process.env.MONGO_URI);
    console.log("connected to DB");
    //connexion du serveur
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (e) {
    console.error(e);
  }
}

init();
