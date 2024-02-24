const express = require("express");
// Assuming you have a product model defined
const {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const upload = require("../middleware/uploadProductImg");

const router = express.Router();

router.route("/").post(upload.single("img"), addProduct).get(getProducts);

router
  .route("/:productId")
  .get(getProductById)
  .delete(deleteProduct)
  .put(updateProduct);

module.exports = router;
