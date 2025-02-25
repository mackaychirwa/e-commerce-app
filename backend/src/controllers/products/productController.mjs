import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../../services/product/productService.mjs";

export const index = async (req, res) => {
    try {
        const product = await getProducts();
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const store = async (req, res) => {
    try {
        const { name, description, unit_cost, qty, category_id } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const product = await createProduct(imageUrl, name, description, unit_cost, qty, category_id);
        res.json(product);
    } catch (error) {
        res.json({ error: error.message });
    }
}
export const show = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { image_url, name, description, unit_cost, qty, category_id } = req.body;
        const product = await updateProduct(id, image_url, name, description, unit_cost, qty, category_id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteProduct(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}