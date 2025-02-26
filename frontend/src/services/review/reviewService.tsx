import { Review } from '@/types/reviewType';
import axiosInstance from '../api';


  const getReviews = async (token: string) => {
    try {
      const response = await axiosInstance.get('/review', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

const createReview = async (reviewData: Omit<Review, "id">, token: string) => { 
  try {
    const response = await axiosInstance.post(
      "/review",
      {
        user_id: reviewData.user_id,
        product_id: reviewData.product_id,
        rating: reviewData.rating,
        comment: reviewData.comment,
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
    console.error('Error creating category:', error);
    throw error;
  }
};
const getReview = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/review/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching review:', error);
      throw error;
    }
  };
  

const updateReview = async (id: number,  reviewData: Review,   token: string ) => {
    try {
      console.log(reviewData);

      const response = await axiosInstance.put(
        `/review/${id}`,
        {
          user_id: reviewData.user_id,
          product_id: reviewData.product_id,
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  };
  

const deleteReview = async (id: number, token: string) => {
    try {
      await axiosInstance.delete(`/review/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  };
  const updateReviewReply = async (id: number,  reviewData: Review,   token: string ) => {
    try {
      console.log(reviewData);

      const response = await axiosInstance.put(
        `/review/${id}`,
        {
          user_id: reviewData.user_id,
          product_id: reviewData.product_id,
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  };
  

export { getReviews, getReview, createReview, updateReview, deleteReview, updateReviewReply };