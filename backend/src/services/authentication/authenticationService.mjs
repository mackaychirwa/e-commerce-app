import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();  

import jwt from 'jsonwebtoken';
import { sequelize } from '../../config/database.js';
import initUserModel from '../../models/User/user.js';
import logger from '../../logs/logger.js';
import { addTokenToCookie, createToken, generateAccessRefreshToken, userToken } from '../../utils/index.js';
import buildUser from '../../controllers/helpers/Response.js';

const User = initUserModel(sequelize);
export const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return { success: false, message: "Invalid email or password" };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return { success: false, message: "Invalid email or password" };
       
        const data = buildUser(user.dataValues);
        return {
            success: true,
            message: "Login successful",
            userData: data
          };

    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "Server error" };
    }
};


export const registerUser = async (username, email, password, phoneNumber, address, city, country, role_id) => {
    try {
        const existingUser = await  User.findOne({ where: { email } });
        if (existingUser) return { success: false, message: "Email already exists" };

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username, 
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            city: city,
            country: country,
            password: hashedPassword,
            role_id: role_id
          });
        await user.save();

        return user;
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, message: "Server error:", error };
    }
};
