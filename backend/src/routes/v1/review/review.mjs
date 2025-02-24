import express from 'express';
import { index, show, store, update, destroy, replyReview } from '../../../controllers/review/reviewController.mjs';
import { authenticateUser } from '../../../middleware/authorization.js';

const router = express.Router(); 

router.get("/", authenticateUser,  index);
router.get("/:id",authenticateUser,   show);
router.post("/",authenticateUser,  store); 
router.put("/:id",authenticateUser,   update); 
router.delete("/:id",authenticateUser,  destroy);
router.post("/replyReview",authenticateUser,  replyReview); 



export default router;
