const express = require("express");
const router = express.Router();
const { postForm, deleteForm } = require("../controller/forms");

router.route("/").post(postForm).delete(deleteForm);

module.exports = router;
