import { createReview, deleteReview, getReviewById, getReviews, updateReview, replyToReview } from "../../services/review/reviewService.mjs";

export const index = async (req, res) => {
    try {
        const review = await getReviews();
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const store = async (req, res) => {
    try {

        const { user_id, product_id, rating, comment } = req.body;
        const review = await createReview(user_id, product_id, rating, comment);
        console.log(review)
        
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const show = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await getReviewById(id);
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const review = await updateReview(id,  name, description);
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteReview(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const replyReview = async (req, res) => {
    try{
        const {user_id, review_id, reply } = req.body;
        const replyReview = await replyToReview(user_id, review_id, reply);
        res.json(replyReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
   
}