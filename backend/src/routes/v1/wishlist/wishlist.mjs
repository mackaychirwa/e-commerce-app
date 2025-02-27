import express from 'express';
import { authenticateUser } from '../../../middleware/authorization.js';
import { index, show, store } from '../../../controllers/wishList/wishlistController.mjs';

const router = express.Router();

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Retrieve a list of all products in the wishlist
 *     description: Fetches the entire wishlist for an authenticated user.
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []  # Authentication required using Bearer Token
 *     responses:
 *       200:
 *         description: List of products in the wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID of the wishlist entry
 *                   product_id:
 *                     type: integer
 *                     description: ID of the product in the wishlist
 *                   user_id:
 *                     type: integer
 *                     description: ID of the user who added the product
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the wishlist entry was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the wishlist entry was last updated
 *                   product:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the product
 *                       qty:
 *                         type: integer
 *                         description: Quantity of the product
 *                       unit_cost:
 *                         type: string
 *                         description: Unit cost of the product
 *       401:
 *         description: Unauthorized, authentication failed
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticateUser, index);

/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Add a product to the wishlist
 *     description: Adds a new product to the user's wishlist.
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []  # Authentication required using Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: ID of the product to add to the wishlist
 *               user_id:
 *                 type: integer
 *                 description: ID of the user who is adding the product
 *     responses:
 *       201:
 *         description: Product successfully added to the wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the wishlist entry
 *                 product_id:
 *                   type: integer
 *                   description: ID of the product
 *                 user_id:
 *                   type: integer
 *                   description: ID of the user
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid request, missing or incorrect data
 *       401:
 *         description: Unauthorized, authentication failed
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticateUser, store);

/**
 * @swagger
 * /wishlist/{id}:
 *   get:
 *     summary: Retrieve details of a specific product in the wishlist
 *     description: Fetches a specific product's details from the user's wishlist by its ID.
 *     tags:
 *       - Wishlist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the wishlist entry to fetch
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  # Authentication required using Bearer Token
 *     responses:
 *       200:
 *         description: Details of the wishlist product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the wishlist entry
 *                 product_id:
 *                   type: integer
 *                   description: ID of the product in the wishlist
 *                 user_id:
 *                   type: integer
 *                   description: ID of the user who added the product
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: When the wishlist entry was created
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: When the wishlist entry was last updated
 *                 product:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the product
 *                     qty:
 *                       type: integer
 *                       description: Quantity of the product
 *                     unit_cost:
 *                       type: string
 *                       description: Unit cost of the product
 *       400:
 *         description: Invalid ID format or entry does not exist
 *       401:
 *         description: Unauthorized, authentication failed
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticateUser, show);

export default router;
