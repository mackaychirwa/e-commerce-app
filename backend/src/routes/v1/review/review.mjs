import express from 'express';
import { index, show, store, update, destroy, replyReview, replyReviewById } from '../../../controllers/review/reviewController.mjs';
import { authenticateUser } from '../../../middleware/authorization.js';

const router = express.Router();

/**
 * @swagger
 * /review:
 *   get:
 *     summary: Get all reviews
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     responses:
 *       200:
 *         description: List of reviews
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
 *                     example: Product Review
 *                   description:
 *                     type: string
 *                     example: This product is amazing!
 *                   created_at:
 *                     type: string
 *                     example: 2025-02-25T00:00:00Z
 */
router.get("/", authenticateUser, index);

/**
 * @swagger
 * /review/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The review ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review details
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
 *                   example: Product Review
 *                 description:
 *                   type: string
 *                   example: This product is amazing!
 *                 created_at:
 *                   type: string
 *                   example: 2025-02-25T00:00:00Z
 *       404:
 *         description: Review not found
 */
router.get("/:id", authenticateUser, show);

/**
 * @swagger
 * /review:
 *   post:
 *     summary: Create a new review
 *     tags: [Review]
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
 *                 example: Product Review
 *               description:
 *                 type: string
 *                 example: This product is amazing!
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Bad request (missing fields)
 */
router.post("/", authenticateUser, store);

/**
 * @swagger
 * /review/{id}:
 *   put:
 *     summary: Update a review by ID
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The review ID
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
 *                 example: Updated Review Name
 *               description:
 *                 type: string
 *                 example: This product has been updated and it's even better!
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Bad request (missing fields or invalid data)
 *       404:
 *         description: Review not found
 */
router.put("/:id", authenticateUser, update);

/**
 * @swagger
 * /review/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The review ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete("/:id", authenticateUser, destroy);

/**
 * @swagger
 * /review/replyReview:
 *   post:
 *     summary: Reply to a review
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - review_id
 *               - reply
 *             properties:
 *               review_id:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the review to which the reply is being made.
 *               reply:
 *                 type: string
 *                 example: Thank you for the feedback! We're glad you liked the product.
 *                 description: The reply to the review, typically thanking or responding to the review content.
 *     responses:
 *       201:
 *         description: Review reply created successfully
 *       400:
 *         description: Bad request (missing fields or invalid data)
 *       404:
 *         description: Review not found
 */
router.post("/replyReview", authenticateUser, replyReview);

/**
 * @swagger
 * /review/replyReview/{id}:
 *   get:
 *     summary: Get a reply to a review by ID
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []  # Bearer token required in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the review reply to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review reply retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *                   example: Thank you for the feedback! We're glad you liked the product.
 *       404:
 *         description: Review reply not found
 */
router.get("/replyReview/:id", authenticateUser, replyReviewById);

export default router;
