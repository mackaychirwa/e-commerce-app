import express from 'express';
import { userLogin, userRegistration } from '../../../controllers/authentication/authenticationController.mjs';
import { emailToLowerCase } from '../../../middleware/authorization.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', emailToLowerCase, userLogin);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role_id
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role_id:
 *                 type: integer
 *                 example: 2
 *                 description: |
 *                   1 - Admin
 *                   2 - Customer
 *                   3 - Other roles as defined in the system
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Bad request (missing fields)
 */

router.post('/register', emailToLowerCase, userRegistration);

export default router;
