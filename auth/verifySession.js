const { UnauthorizedErr } = require("../errors/customError");

function verifySession(req, res, next) {
  try {
    console.log(req.session);
    if (!req.session.userId) {
      throw new UnauthorizedErr("Accès non autorisé");
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = verifySession;
