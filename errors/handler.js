//les erreurs des fonctions de l'API sont traitées puis renvoyées ici

async function errorHandler(error, req, res, next) {
  console.log(error);
  if (error.constructor.name == "MongoServerError") {
    const { code, errmsg } = error.errorResponse;
    return res.status(500).json({ msg: errmsg, code });
  }

  if (error.constructor.name == "ValidationError") {
    const msg = error.message;
    return res.status(500).json({ msg, code: 100 });
  }

  if (!error || !error.status || !error.message) {
    return res.status(500).json({ msg: "Unknown Error", code: 0 });
  }

  res.status(error.status).json({ msg: error.message, code: 0 });
}

module.exports = errorHandler;
