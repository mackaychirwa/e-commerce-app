import express from 'express';
import { authenticateUser } from '../../../middleware/authorization.js';
import { index, store, show, update, destroy } from '../../../controllers/products/productController.mjs';
import upload from '../../../core/multer.js';


const router = express.Router(); 

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     responses:
 *       200:
 *         description: List of products
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
 *                     example: Product Name
 *                   description:
 *                     type: string
 *                     example: Product description goes here
 *                   unit_cost:
 *                     type: number
 *                     example: 15.99
 *                   qty:
 *                     type: integer
 *                     example: 100
 *                   category_id:
 *                     type: integer
 *                     example: 1
 */
router.get("/", authenticateUser, index);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
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
 *                   example: Product Name
 *                 description:
 *                   type: string
 *                   example: Product description goes here
 *                 unit_cost:
 *                   type: number
 *                   example: 15.99
 *                 qty:
 *                   type: integer
 *                   example: 100
 *                 category_id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Product not found
 */
router.get("/:id", authenticateUser, show);
/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - unit_cost
 *               - qty
 *               - category_id
 *               - image  # Image is now part of the request
 *             properties:
 *               name:
 *                 type: string
 *                 example: Product Name
 *               description:
 *                 type: string
 *                 example: Product description goes here
 *               unit_cost:
 *                 type: number
 *                 example: 15.99
 *               qty:
 *                 type: integer
 *                 example: 100
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: binary  # Specifies the file type (image)
 *                 description: The product image file
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request (missing fields or invalid image)
 */
router.post("/", authenticateUser, upload.single("image"), store);

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The product ID
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
 *                 example: Updated Product Name
 *               description:
 *                 type: string
 *                 example: Updated product description
 *               unit_cost:
 *                 type: number
 *                 example: 17.99
 *               qty:
 *                 type: integer
 *                 example: 150
 *               category_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request (missing fields)
 *       404:
 *         description: Product not found
 */
router.put("/:id", authenticateUser, update);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", authenticateUser, destroy);

export default router;
