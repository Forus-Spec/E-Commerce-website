import express from "express";
const router = express.Router();
import { attachUser, requireAdmin } from "../middleware/authMiddleware.js";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory
} from "../controllers/categoryController.js";

router.route("/category").post(attachUser, requireAdmin, createCategory);
router.route("/categories").get(getCategories);
router.route("/category/:slug").post(attachUser, requireAdmin, updateCategory);
router
  .route("/category/:slug")
  .delete(attachUser, requireAdmin, deleteCategory);

router.route("/category/singleCategory/:categoryId").get(getCategory);

export default router;
