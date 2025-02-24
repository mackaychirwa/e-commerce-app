import { sequelize } from "../../config/database.js";
import RoleModel from "../../models/Role/Role.js";

const Role = RoleModel(sequelize);

export const getRoles = async () => {
    try {
        const roles = await Role.findAll();
        return roles;
    } catch (error) {
        console.error("Failed to retrieve all roles:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const createRole =  async (name, description) => {
     try {
            const existingRole = await  Role.findOne({ where: { name } });
            if (existingRole) return { success: false, message: "This Role already exists" };
            
            const role = await Role.create({
                name: name,
                description: description,
              });
            await role.save();
    
            return role;
        } catch (error) {
            console.error("Product Failed to register error:", error);
            return { success: false, message: "Server error:", error };
        }
}
export const getRoleById = async (role_id) =>
{
    try {
        const role = await Role.findByPk(role_id);
        if (!role) return { success: false, message: "Role not found" };
        return role;
    } catch (error) {
        console.error("Failed to retrieve role:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const updateRole = async (role_id, name, description) => {
    try {
        const role = await Role.findByPk(role_id);
        if (!role) return { success: false, message: "Role not found" };
        role.name = name;
        role.description = description;
        
        await role.save();
        return role;
        
    } catch (error) {
        console.error("Failed to update role:", error);
        return { success: false, message: "Server error:", error };
    }
}

export const deleteRole = async (product_id) => {
    try {
        const role = await Role.findByPk(product_id);
        if (!role) return { success: false, message: "Product not found" };
        await role.destroy();
        return { success: true, message: "Role deleted successfully" };
    } catch (error) {
        console.error("Failed to delete role:", error);
        return { success: false, message: "Server error:", error };
    }
}