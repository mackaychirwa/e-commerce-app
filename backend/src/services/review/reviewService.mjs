import { sequelize } from "../../config/database.js";
import ProductModel from "../../models/Product/Product.js";
import ReviewModel from "../../models/Review/Review.js";
import ReviewReplyModel from "../../models/Review/ReviewReply.js";
import initUserModel from "../../models/User/user.js";

const Review = ReviewModel(sequelize);
const User = initUserModel(sequelize);
const Product = ProductModel(sequelize);
const ReviewReply = ReviewReplyModel(sequelize);


// Initialize associations
Review.associate({ User, Product });

export const getReviews = async () => {
    try {
        const review = await Review.findAll({
            include: [
                {
                    model: User,
                    as: "user", 
                    attributes: ["id", "username"], 
                },
                {
                    model: Product,
                    as: "product",
                    attributes: ["id", "name"], 
                }
            ],
        });
        return review;
    } catch (error) {
        console.error("Failed to retrieve all review:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const createReview =  async (user_id, product_id, rating, comment) => {
     try {
            const existingReview = await  Review.findOne({ where: {user_id: user_id, product_id: product_id } });
            if (existingReview) return { success: false, message: "You have already reviewed this product" };
            
            const review = await Review.create({
            
                user_id: user_id, 
                product_id: product_id, 
                rating: rating, 
                comment: comment
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
export const replyToReview = async (user_id, review_id, reply) => {
    try {
        const existingReply = await ReviewReply.findOne({ where: { review_id: review_id, user_id: user_id } });
        if (existingReply) {
            return { message: "You have already replied to this review." };
        }
        const reviewReply = await ReviewReply.create({
            review_id: review_id,
            user_id: user_id,
            reply: reply
        });
        await Review.update(
            { review_state: 1 }, 
            { where: { id: review_id } } 
        );
        return reviewReply;
    } catch (error) {
        console.error("Failed to reply review:", error);
        return { success: false, message: "Server error:", error };
    }
}
export const getReviewReplyById = async (id) =>
{
    try {
        const reviewReply = await ReviewReply.findOne({ where: { review_id: id } });
        if (!reviewReply) return { success: false, message: "Review not found" };
        return reviewReply;
    } catch (error) {
        console.error("Failed to retrieve Review:", error);
        return { success: false, message: "Server error:", error };
    }
}
    