//PROGRAMME EXECUTABLE EXTERNE
//node INSERT_USER.js pour exécuter

const Users = require("./db/UsersSchema");
const connect = require("./db/connect");
require("dotenv").config();

const USER = {
  name: "Axcell",
  forename: "Benjamin",
  role: "personnel",
  password: "123",
  username: "benj",
};

async function insert() {
  try {
    await connect(process.env.MONGO_URI);
    const user = new Users(USER);
    user.save();
  } catch (error) {
    console.log(error);
  }
}

insert();
