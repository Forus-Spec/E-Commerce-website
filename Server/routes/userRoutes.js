import express from "express";
const router = express.Router();
import { attachUser, requireAdmin } from "../middleware/authMiddleware.js";
import {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getUsers,
  updateUserPassword,
  userCart,
  getUserCart,
  emptyUserCart,
  createOrder,
  checkEmail,
  checkPhone,
  addToWishlist,
  removeFromWishlist,
  wishlist
} from "../controllers/userController.js";

//User crud operations
router.route("/users").get(attachUser, requireAdmin, getUsers);
router.route("/user/:id").get(attachUser, requireAdmin, getUser);
router.route("/user").post(attachUser, requireAdmin, createUser);

//Asynchronous form validation
router.route("/user/checkEmail").post(checkEmail);
router.route("/user/checkPhone").post(checkPhone);

//Profile Update
router.route("/user/profile/:user").get(attachUser, getUser);
router
  .route("/user/updateUser/:id")
  .patch(attachUser, requireAdmin, updateUser);
router.route("/user/updatePass").post(attachUser, updateUserPassword);
router.route("/user/:id").delete(attachUser, requireAdmin, deleteUser);

// Cart and Order
router.route("/user/cart").post(attachUser, userCart);
router.route("/user/cart").get(attachUser, getUserCart);
router.route("/user/cart").delete(attachUser, emptyUserCart);
router.route("/user/order").post(attachUser, createOrder);

router.route("/user/products/favorites").post(attachUser, addToWishlist);
router.route("/user/products/favorites").get(attachUser, wishlist);
router.route("/user/favorites/:productId").put(attachUser, removeFromWishlist);

export default router;
