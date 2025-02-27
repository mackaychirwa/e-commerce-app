import { sequelize } from "../../config/database.js";
import initUserModel from "../../models/User/user.js";
import WishlistModel from "../../models/Wishlist/Wishlist.js";
import ProductModel from "../../models/Product/Product.js";

const Wishlist = WishlistModel(sequelize);
const User = initUserModel(sequelize);
const Product = ProductModel(sequelize);

Wishlist.associate({ User, Product });
// User.associate({ Wishlist });
// Product.associate({ Wishlist });

export const getWishProductList = async () => {
    try {
        const wishlist = await Wishlist.findAll({
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
        return wishlist;
    } catch (error) {
        console.error("Failed to retrieve all wishlist:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const addWishProductList = async (product_id, user_id ) =>
{
    try {
        const wishlist = await Wishlist.create({
            product_id: product_id, 
            user_id: user_id,
          });
        await wishlist.save();

        return wishlist;
    } catch (error) {
        console.error("Failed to create wishlist:", error);
        return { success: false, message: "Server error:", error };
    }
}
export const getWishById = async (id) =>
{
    try {
        const wishlist = await Wishlist.findAll({
            where: { user_id: id },
            include: [
                {
                    model: User,
                    as: "user", 
                    attributes: ["id", "username"], 
                },
                {
                    model: Product,
                    as: "product",
                    attributes: ["id", "name", "image_url", "qty", "unit_cost"], 
                }
            ]
        });
        if (!wishlist) return { success: false, message: "wishlist not found" };
        return wishlist;
    } catch (error) {
        console.error("Failed to retrieve wishlist:", error);
        return { success: false, message: "Server error:", error };
    }
}