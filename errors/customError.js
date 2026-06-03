// classes qui héritent de la classe Error permettants de mieux séparer les erreurs

class InternalServerErr extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = 500;
  }
}

class UnauthorizedErr extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = 401;
  }
}

class NotFoundErr extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = 404;
  }
}

class BadRequestErr extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = 400;
  }
}

module.exports = {
  InternalServerErr,
  NotFoundErr,
  BadRequestErr,
  UnauthorizedErr,
};
