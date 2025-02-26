import express from 'express';
import { index, show, store, update, destroy } from '../../../controllers/role/roleController.mjs';
import { authenticateUser } from '../../../middleware/authorization.js';

const router = express.Router(); 

/**
 * @swagger
 * /role:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Admin
 *                   description:
 *                     type: string
 *                     example: Administrative user with full access
 */
router.get("/", authenticateUser, index);

/**
 * @swagger
 * /role/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The role ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Admin
 *                 description:
 *                   type: string
 *                   example: Administrative user with full access
 *       404:
 *         description: Role not found
 */
router.get("/:id", authenticateUser, show);

/**
 * @swagger
 * /role:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin
 *               description:
 *                 type: string
 *                 example: Administrative user with full access
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Bad request (missing fields)
 */
router.post("/", authenticateUser, store);

/**
 * @swagger
 * /role/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The role ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Super Admin
 *               description:
 *                 type: string
 *                 example: Super administrative user with full access to the system
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Bad request (missing fields)
 *       404:
 *         description: Role not found
 */
router.put("/:id", authenticateUser, update);

/**
 * @swagger
 * /role/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The role ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 */
router.delete("/:id", authenticateUser, destroy);

export default router;
