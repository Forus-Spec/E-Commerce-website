import express from "express";
const router = express.Router();
import { attachUser, requireAdmin } from "../middleware/authMiddleware.js";

// const req , query , params check them out
import {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  getBrand
} from "../controllers/brandController.js";

router.route("/brand").post(attachUser, requireAdmin, createBrand);
router.route("/brands").get(getBrands);
router.route("/brand/:slug").post(attachUser, requireAdmin, updateBrand);
router.route("/brand/:slug").delete(attachUser, requireAdmin, deleteBrand);
router.route("/brand/singleBrand/:brandId").get(getBrand);

export default router;
