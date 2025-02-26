import axiosInstance from "../api";

// Define the type for user data
interface UserData {
  email: string;
  password: string;
  [key: string]: unknown;
}
interface UserRegisterData {
  email: string;
  password: string;
  username: string;
  phoneNumber: number;
  address: string;
  city: string;
  country: string;
  role_id: number;
  
}
// const getUser = async (id: string): Promise<unknown> => {
//   try {
//     const response = await axiosInstance.get(`/users/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     throw error;
//   }
// };

const createUser = async (userData: UserRegisterData) => {
  try {
    const response = await axiosInstance.post('/auth/register',
      // {
      //   name: userData.name,
      //   description: userData.description,
      // }
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

// Add more user-related API calls here

export {  loginUser, createUser };
