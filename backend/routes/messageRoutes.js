import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import { getConversations } from "../controllers/messageController.js";
const router = express.Router();



router.post('/', protectRoute, sendMessage)
router.get('/:otherUserId', protectRoute, getMessages);
router.get("/conversations", protectRoute, getConversations);
export default router;