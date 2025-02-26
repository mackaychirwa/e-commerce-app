import express from 'express';
import { index, show, store, update, destroy } from '../../../controllers/category/categoryController.mjs';
import { authenticateUser } from '../../../middleware/authorization.js';

const router = express.Router(); 

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []  # Specifies that a Bearer token is required in the Authorization header
 *     responses:
 *       200:
 *         description: List of categories
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
 *                     example: Electronics
 *                   description:
 *                     type: string
 *                     example: Items related to electronic devices
 *                   image_url:
 *                     type: string
 *                     example: https://example.com/image.jpg
 */
router.get("/", authenticateUser, index);  

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The category ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category details
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
 *                   example: Electronics
 *                 description:
 *                   type: string
 *                   example: Items related to electronic devices
 *                 image_url:
 *                   type: string
 *                   example: https://example.com/image.jpg
 *       404:
 *         description: Category not found
 */
router.get("/:id", authenticateUser, show);  

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
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
 *               - category_id
 *               - unit_cost
 *               - qty
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 example: Items related to electronic devices
 *               image_url:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               unit_cost:
 *                 type: number
 *                 example: 250.00
 *               qty:
 *                 type: integer
 *                 example: 50
 *               category_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request (missing fields)
 */
router.post("/", authenticateUser, store);  

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The category ID
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
 *                 example: Updated Electronics
 *               description:
 *                 type: string
 *                 example: Updated description for electronics
 *               image_url:
 *                 type: string
 *                 example: https://example.com/new-image.jpg
 *               unit_cost:
 *                 type: number
 *                 example: 300.00
 *               qty:
 *                 type: integer
 *                 example: 60
 *               category_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad request (missing fields)
 *       404:
 *         description: Category not found
 */
router.put("/:id", authenticateUser, update);  

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The category ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete("/:id", authenticateUser, destroy);

export default router;
