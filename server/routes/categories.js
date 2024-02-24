const express = require("express");
const {
  addCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/").post(addCategory).get(getCategories);

router
  .route("/:categoryId")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
