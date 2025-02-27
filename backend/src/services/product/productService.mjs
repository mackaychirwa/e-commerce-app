import { sequelize } from "../../config/database.js";
import { _bytes } from "../../helper/bytesHelper.js";
import CategoryModel from "../../models/Category/Category.js";
import ProductModel from "../../models/Product/Product.js";

const Product = ProductModel(sequelize);
const Category = CategoryModel(sequelize);
// Initialize associations
Product.associate({ Category });
Category.associate({ Product });

export const getProducts = async () => {
    try {
        const products = await Product.findAll({
            include: [{
                model: Category,
                as: 'category', // Make sure this matches the 'as' defined in the association
                attributes: ['id', 'name'] // Optionally specify which category fields to include
            }]
        });
          // Format the size field for each product
          const formattedProducts = products.map(product => {
            // size is a string need to convert to a number
            const sizeInBytes = Number(product.size);
            // Check if the size is available and format it
            const formattedSize = _bytes(sizeInBytes); 
            return {
                ...product.toJSON(),  // Convert the product to a plain object
                sizeFormatted: formattedSize  // Add the formatted size
            };
        });

        return formattedProducts;
        // return products;
    } catch (error) {
        console.error("Failed to retrieve all products:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const createProduct =  async (image, name, description, unit_cost, qty, category_id, imageSize) => {
     try {

            // const existingProduct = await  Product.findOne({ where: { name: name } });
            // if (existingProduct) return { success: false, message: "This product already exists" };
            
            const product = await Product.create({
                imageUrl: image, 
                name: name,
                description: description,
                unit_cost: unit_cost,
                qty: qty,
                category_id: category_id,
                size: imageSize
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