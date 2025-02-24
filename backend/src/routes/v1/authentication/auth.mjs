import express from 'express';
import { userLogin, userRegistration } from '../../../controllers/authentication/authenticationController.mjs';
import { emailToLowerCase } from '../../../middleware/authorization.js';

const router = express.Router(); 

router.post('/login', emailToLowerCase, userLogin);
router.post('/register', emailToLowerCase, userRegistration);

export default router;
