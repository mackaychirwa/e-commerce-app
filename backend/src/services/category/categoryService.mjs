import { sequelize } from "../../config/database.js";
import CategoryModel from "../../models/Category/Category.js";

const Category = CategoryModel(sequelize);

export const getCategories = async () => {
    try {
        const Categories = await Category.findAll();
        return Categories;
    } catch (error) {
        console.error("Failed to retrieve all Categories:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const createCategory =  async (name, description) => {
     try {
            const existingCategory = await  Category.findOne({ where: { name } });
            if (existingCategory) return { success: false, message: "This Category already exists" };
            
            const newCategory = await Category.create({
                name: name,
                description: description,
              });
            await newCategory.save();
    
            return newCategory;
        } catch (error) {
            console.error("Category Failed to register error:", error);
            return { success: false, message: "Server error:", error };
        }
}
export const getCategoryById = async (Category_id) =>
{
    try {
        const getCategoryById = await Category.findByPk(Category_id);
        if (!getCategoryById) return { success: false, message: "Category not found" };
        return getCategoryById;
    } catch (error) {
        console.error("Failed to retrieve Category:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const updateCategory = async (Category_id, image, name, description, unit_cost, qty, category_id) => {
    try {
        const updateCategory = await Category.findByPk(Category_id);
        if (!updateCategory) return { success: false, message: "Category not found" };
        updateCategory.image = image;
        updateCategory.name = name;
        updateCategory.description = description;
        updateCategory.unit_cost = unit_cost;
        updateCategory.qty = qty;
        updateCategory.category_id = category_id;
        await updateCategory.save();
        return updateCategory;
        
    } catch (error) {
        console.error("Failed to update Category:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const deleteCategory = async (Category_id) => {
    try {
        const deleteCategory = await Category.findByPk(Category_id);
        if (!deleteCategory) return { success: false, message: "Category not found" };
        await deleteCategory.destroy();
        return { success: true, message: "Category deleted successfully" };
    } catch (error) {
        console.error("Failed to delete Category:", error);
        return { success: false, message: "Server error:", error };
    }
}