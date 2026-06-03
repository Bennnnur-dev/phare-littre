const express = require("express");
const router = express.Router();
const {
  getFormsPaginated,
  getSingleForm,
  deleteForm,
  patchForm,
} = require("../controller/forms");

router.route("/").get(getFormsPaginated);
router
  .route("/single/:id")
  .get(getSingleForm)
  .delete(deleteForm)
  .patch(patchForm);

module.exports = router;
