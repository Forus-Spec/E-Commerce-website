import express from "express";
const router = express.Router();
import rateLimit from "express-rate-limit";

const requestLimiter = (points, message) =>
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: points,
    message: message
  });

import {forgotPassword,resetPassword,register,login} from "../controllers/authController.js";

const registerMessage      = "to avoid spams please try again later !";
const resetPasswordMessage = "to avoid spams please try again later !";

router.route("/register").post(requestLimiter(10, registerMessage), register);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(requestLimiter(3, resetPasswordMessage), resetPassword);

export default router;
