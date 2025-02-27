import { addWishProductList, getWishById, getWishProductList } from "../../services/wishlist/wishlistService.mjs";

export const index = async (req, res) => {
    try {
        const productWishlist = await getWishProductList();
        res.json(productWishlist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const store = async (req, res) => {
    try{
        const { product_id, user_id } = req.body;
        const productWishlist = await addWishProductList(product_id, user_id );
        res.status(201).json(productWishlist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    } 
}
export const show = async (req, res) => {
    try {
        const { id } = req.params;
        const productWishlist = await getWishById(id);
        res.json(productWishlist);
    } catch (error) {
        res.json({ error: error.message });
    }
}