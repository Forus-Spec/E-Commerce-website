// we are importing our express functionality
import express from "express";
const router = express.Router();

const { createPaymentIntent } = require("../controllers/stripe.js");

import { attachUser } from "../middleware/authMiddleware.js";

router.post("/create-payment-intent", attachUser, createPaymentIntent);

export default router;
