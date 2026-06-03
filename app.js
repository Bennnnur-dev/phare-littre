const express = require("express");
const app = express();
require("dotenv").config();
const connect = require("./db/connect");
const formRouter = require("./routes/forms");
const errorHandler = require("./errors/handler");
const cors = require("cors");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const verifySession = require("./auth/verifySession");
const { postForm } = require("./controller/forms");
const authRouter = require("./routes/auth");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");

const PORT = process.env.PORT;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);
const lim = rateLimit({
  windowMs: 1000,
  max: 100,
  message: { msg: "Trop de requêtes, réessayez plus tard", code: 1 },
});
app.use(lim);
app.use(hpp());

app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 60 * 60 * 24,
    }), //SUPP doc après 1j
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, //1j
    },
  }),
);

app.use(express.json());
app.use(express.static("./public"));

app.use("/auth", authRouter);
app.use("/form/admin", verifySession, formRouter);
app.post("/form", postForm);

app.use(errorHandler);

async function init() {
  try {
    await connect(process.env.MONGO_URI);
    console.log("connected to DB");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (e) {
    console.error(e);
  }
}

init();
