import express from "express";
const router = express.Router();
import { attachUser, requireAdmin } from "../middleware/authMiddleware.js";

import {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  handleQuery,
  relatedProducts,
  listingProduct,
  handleCategory,
  handleBrand,
  handlePrice
} from "../controllers/productController.js";
import { getBrand } from "../controllers/brandController.js";
import { getCategory } from "../controllers/categoryController.js";

// router.route("/products/:count").get(getProducts);
// router.route("/product/:slug").get(getProduct);
router.route("/product/:id").get(relatedProducts);

router.route("/product").post(attachUser, requireAdmin, createProduct);
router.route("/products").get(listingProduct);
router.route("/products/category").get(handleCategory);
router.route("/products/:count").get(getProduct);
router.route("/product/:slug").post(attachUser, requireAdmin, updateProduct);
router.route("/product/:slug").delete(attachUser, requireAdmin, deleteProduct);
// router.route("/products/:pageNumber").get(listingProduct);
// router.route("/products/productCount").get(productCount);
router.route("/products/search/:query").get(handleQuery);
router.route("/products/brand/:brand").get(handleBrand);
router.route("/products/price/:price").get(handlePrice);



export default router;
