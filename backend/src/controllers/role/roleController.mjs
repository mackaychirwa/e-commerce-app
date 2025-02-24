import { createRole, deleteRole, getRoleById, getRoles, updateRole } from "../../services/role/roleService.mjs";

export const index = async (req, res) => {
    try {
        const role = await getRoles();
        res.status(200).json(role);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const store = async (req, res) => {
    try {
        const { name, description } = req.body;
        const role = await createRole(name, description);
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const show = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await getRoleById(id);
        res.status(200).json(role);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const role = await updateRole(id,  name, description);
        res.status(200).json(role);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteRole(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}