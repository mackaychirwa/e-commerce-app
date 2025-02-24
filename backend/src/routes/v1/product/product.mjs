
import express from 'express';
import { index, show, store, update, destroy } from '../../../controllers/products/productController.mjs';
import { authenticateUser } from '../../../middleware/authorization.js';

const router = express.Router(); 

// Product Routes
router.get("/", authenticateUser, index);  
router.get("/:id",authenticateUser,  show);  
router.post("/",authenticateUser,  store);  
router.put("/:id",authenticateUser,  update);  
router.delete("/:id", authenticateUser, destroy);

export default router;
