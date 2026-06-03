const Users = require("../db/UsersSchema.js");
const {
  InternalServerErr,
  BadRequestErr,
  UnauthorizedErr,
  NotFoundErr,
} = require("../errors/customError.js");
const sanitize = require("mongo-sanitize");

async function login(req, res, next) {
  try {
    req.body = sanitize(req.body); //éviter les injections NOSQL
    const { credentials } = req.body;
    if (!credentials.password || !credentials.username) {
      throw new BadRequestErr(
        "Veuillez inscrire un mot de passe et un identifiant",
      );
    }

    const user = await Users.findOne({ username: credentials.username });
    if (!user) {
      throw new NotFoundErr("Impossible de trouver l'utilisateur");
    }
    const match = await user.comparePassword(credentials.password);
    if (!match) {
      throw new UnauthorizedErr("Mot de passe invalide");
    }

    req.session.regenerate(err => {
      if (err) {
        next(new InternalServerErr("Erreur lors de la connexion"));
      }
      req.session.userId = user._id;
      res.json({ msg: "Connecté" });
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    console.log("DFAZEGA", req.session);
    req.session.destroy(err => {
      if (err) next(new InternalServerErr("Erreur lors de la déconnexion"));
      res.clearCookie("sid");
      res.json({ message: "Déconnecté" });
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  logout,
};
