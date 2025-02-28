import { UserRegisterData } from "@/types/userRegisterData";
import axiosInstance from "../api";
import { UserData } from "@/types/userData";

const getUsers = async (token: string)=> {
  try {
    const response = await axiosInstance.get(`/auth/users`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const createUser = async (userData: UserRegisterData) => {
  try {
    const response = await axiosInstance.post('/auth/register',
       userData);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const loginUser = async (userData: UserData) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      email: userData.email,
      password: userData.password,
    });
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export {  loginUser, createUser, getUsers };
