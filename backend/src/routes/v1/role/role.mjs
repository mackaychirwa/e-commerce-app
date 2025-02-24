import express from 'express';
import { index, show, store, update, destroy } from '../../../controllers/role/roleController.mjs';
import { authenticateUser } from '../../../middleware/authorization.js';

const router = express.Router(); 

router.get("/", authenticateUser,  index);
router.get("/:id",authenticateUser,  show);
router.post("/",authenticateUser,  store); 
router.put("/:id",authenticateUser,   update); 
router.delete("/:id",authenticateUser,  destroy);

export default router;
