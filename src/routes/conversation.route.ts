import { Router } from "express";
import { conversationCreate } from "../controllers/conversation.controller";
import { protect } from "../middlewares/protect";
const router = Router();
// Protect ALL routes in this file
router.use(protect);
router.route("/").post(conversationCreate);
export default router;
