import express from "express";
const router = express.Router();
import { attachUser, requireAdmin } from "../middleware/authMiddleware.js";
import { upload, remove } from "../controllers/imageController.js";

//This is our upload functionality which is amazing and awesome
router.post("/uploadAvatar", upload);
router.post("/deleteAvatar", remove);
router.post("/uploadImages", attachUser, requireAdmin, upload);
router.post("/removeImages", attachUser, requireAdmin, remove);

export default router;
