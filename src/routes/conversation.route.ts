import { Router } from "express";
import {
  conversationCreate,
  getMyConversations,
} from "../controllers/conversation.controller.js";
import { protect } from "../middlewares/protect.js";
const router = Router();
// Protect ALL routes in this file
router.use(protect);
router.route("/").post(conversationCreate);
router.route("/").get(getMyConversations).post(conversationCreate);
export default router;
