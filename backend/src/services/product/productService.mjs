import { sequelize } from "../../config/database.js";
import ProductModel from "../../models/Product/Product.js";

const Product = ProductModel(sequelize);

export const getProducts = async () => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error) {
        console.error("Failed to retrieve all products:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const createProduct =  async (image, name, description, unit_cost, qty, category_id) => {
     try {
            const existingProduct = await  Product.findOne({ where: { name } });
            if (existingProduct) return { success: false, message: "This product already exists" };
            
            const product = await Product.create({
                image: image, 
                name: name,
                description: description,
                unit_cost: unit_cost,
                qty: qty,
                category_id: category_id,
              });
            await product.save();
    
            return product;
        } catch (error) {
            console.error("Product Failed to register error:", error);
            return { success: false, message: "Server error:", error };
        }
}
export const getProductById = async (product_id) =>
{
    try {
        const product = await Product.findByPk(product_id);
        if (!product) return { success: false, message: "Product not found" };
        return product;
    } catch (error) {
        console.error("Failed to retrieve product:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const updateProduct = async (product_id, image, name, description, unit_cost, qty, category_id) => {
    try {
        const product = await Product.findByPk(product_id);
        if (!product) return { success: false, message: "Product not found" };
        product.image = image;
        product.name = name;
        product.description = description;
        product.unit_cost = unit_cost;
        product.qty = qty;
        product.category_id = category_id;
        await product.save();
        return product;
        
    } catch (error) {
        console.error("Failed to update product:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const deleteProduct = async (product_id) => {
    try {
        const product = await Product.findByPk(product_id);
        if (!product) return { success: false, message: "Product not found" };
        await product.destroy();
        return { success: true, message: "Product deleted successfully" };
    } catch (error) {
        console.error("Failed to delete product:", error);
        return { success: false, message: "Server error:", error };
    }
}