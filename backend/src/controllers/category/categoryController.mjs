import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../../services/category/categoryService.mjs";

export const index = async (req, res) => {
    try {
        const category = await getCategories();
        res.status(200).json({category});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const store = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await createCategory(name, description);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const show = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { image_url, name, description, unit_cost, qty, category_id } = req.body;
        const category = await updateCategory(id, image_url, name, description, unit_cost, qty, category_id);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteCategory(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}