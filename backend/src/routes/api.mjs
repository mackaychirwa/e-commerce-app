import authRouter from "./v1/authentication/auth.mjs"
import categoryRouter from "./v1/category/category.mjs"
import roleRouter from "./v1/role/role.mjs"
import productRouter from "./v1/product/product.mjs"
import reviewRouter from "./v1/review/review.mjs"
import wishlistRouter from "./v1/wishlist/wishlist.mjs"
import express from 'express';


const router = express.Router();

// un protected Routes
router.use("/auth", authRouter);

// protected Routes
router.use("/category", categoryRouter);
router.use("/role", roleRouter);
router.use("/product", productRouter);
router.use("/review", reviewRouter);
router.use("/wishlist", wishlistRouter);

router.all("*", (req, res) => {
    res.status(404).json({ message: "You need to login to use all routes" });
});

export default router;