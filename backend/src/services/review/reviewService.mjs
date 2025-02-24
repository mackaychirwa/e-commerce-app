import { sequelize } from "../../config/database.js";
import ReviewModel from "../../models/Review/Review.js";

const Review = ReviewModel(sequelize);

export const getReviews = async () => {
    try {
        const review = await Review.findAll();
        return review;
    } catch (error) {
        console.error("Failed to retrieve all roles:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const createReview =  async (name, description) => {
     try {
            const existingReview = await  Review.findOne({ where: { name } });
            if (existingReview) return { success: false, message: "This Role already exists" };
            
            const review = await Review.create({
                name: name,
                description: description,
              });
            await review.save();
    
            return review;
        } catch (error) {
            console.error("Review Failed to register error:", error);
            return { success: false, message: "Server error:", error };
        }
}
export const getReviewById = async (review_id) =>
{
    try {
        const review = await Review.findByPk(review_id);
        if (!review) return { success: false, message: "Review not found" };
        return review;
    } catch (error) {
        console.error("Failed to retrieve Review:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const updateReview = async (review_id, name, description) => {
    try {
        const review = await Review.findByPk(review_id);
        if (!review) return { success: false, message: "Role not found" };
        review.name = name;
        review.description = description;
        
        await review.save();
        return review;
        
    } catch (error) {
        console.error("Failed to update review:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const deleteReview = async (review_id) => {
    try {
        const review = await Review.findByPk(review_id);
        if (!review) return { success: false, message: "Product not found" };
        await review.destroy();
        return { success: true, message: "review deleted successfully" };
    } catch (error) {
        console.error("Failed to delete review:", error);
        return { success: false, message: "Server error:", error };
    }
}
export const replyToReview = async (review_id, reply) => {
    try {
        const review = await Review.findOne({ where: { review_id } });
        if (!review) return { success: false, message: "review not found" };
        review.reply = reply;
        await review.save();
        return review;
    } catch (error) {
        console.error("Failed to reply review:", error);
        return { success: false, message: "Server error:", error };
    }
}