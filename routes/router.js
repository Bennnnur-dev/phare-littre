const express = require("express");
const router = express.Router();
const {
  postForm,
  getFormsPaginated,
  getSingleForm,
  deleteForm,
} = require("../controller/forms");

router.route("/").post(postForm).get(getFormsPaginated);
router.route("/single/:id").get(getSingleForm).delete(deleteForm);

module.exports = router;
