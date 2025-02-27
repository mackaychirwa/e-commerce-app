import express from 'express';
import { authenticateUser } from '../../../middleware/authorization.js';
import { index, show, store } from '../../../controllers/wishList/wishlistController.mjs';

const router = express.Router();
router.get("/", authenticateUser, index);
router.post("/", authenticateUser, store);
router.get("/:id", authenticateUser, show);
export default router;
