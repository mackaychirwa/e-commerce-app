
import express from 'express';
import { index, show, store, update, destroy } from '../../../controllers/products/productController.mjs';
import { authenticateUser } from '../../../middleware/authorization.js';
import upload from '../../../core/multer.js';

const router = express.Router(); 

// Product Routes
router.get("/", authenticateUser, index);  
router.get("/:id",authenticateUser,  show);  
// router.post("/",authenticateUser,  store); 
router.post("/", authenticateUser, upload.single("image"), store); 
router.put("/:id",authenticateUser,  update);  
router.delete("/:id", authenticateUser, destroy);

export default router;
