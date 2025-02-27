import axiosInstance from "../api";
const createWishlist = async ( product_id: number, user_id: number, token: string) => { 
    try {
      const response = await axiosInstance.post(
        "/wishlist",
        {
          user_id: user_id,
          product_id: product_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Error creating wishlist:', error);
      throw error;
    }
  };

const getWishlist = async (id: number, token: string ) => {
    try {

      const response = await axiosInstance.get(
        `/wishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Error retreving wishlist:', error);
      throw error;
    }
  };

  const getWishlists = async (token: string ) => {
    try {

      const response = await axiosInstance.get(
        `/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
export { createWishlist, getWishlist, getWishlists };