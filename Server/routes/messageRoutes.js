import express from 'express';
const router = express.Router();
import rateLimit from 'express-rate-limit';

const requestLimiter = (points, message) => rateLimit({
  windowMs: 1 * 60 * 1000,
  max: points,
  message: message,
})

const contactMessage = "To avoid spams please wait 5 minutes!";

import {
  createMessage,
  getMessages,
  deleteMessage
} from '../controllers/messageController.js';

import { attachUser, requireAdmin } from '../middleware/authMiddleware.js';

router.route('/message').post(requestLimiter(2, contactMessage), createMessage)
router.route('/messages').get(getMessages);
router.route('/message/:slug').delete(attachUser, requireAdmin, deleteMessage);

export default router;
