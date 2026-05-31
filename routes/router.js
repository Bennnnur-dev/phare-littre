const express = require("express");
const router = express.Router();
const { postForm, getFormsPaginated } = require("../controller/forms");

router.route("/").post(postForm).get(getFormsPaginated);

module.exports = router;
