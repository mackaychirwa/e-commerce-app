import axiosInstance from '../api';
import { AxiosResponse } from 'axios';
/**
 * Fetches all categories for a given tenant domain.
 * 
 * @returns {Promise} - A promise that resolves to the fetched category data.
 * @throws {Error} - Throws an error if the request fails.
 */
interface Category {
    id: string;
    name: string;
    subcategory: string;
    code: string;
  }
  
  const getCategories = async (token: string): Promise<Category[]> => {
    try {
      const response: AxiosResponse<Category[]> = await axiosInstance.get('/category', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
/**
 * Creates a new category for the specified tenant.
 * 
 * @param {Object} categoryData - The category data including name, subcategory, and code.
 * @returns {Promise} - A promise that resolves to the server response.
 * @throws {Error} - Throws an error if the request fails.
 */
const createCategory = async (
    categoryData: { category: string; subcategory: string; code: string },
    token: string
  ): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.post(
        '/category/',
        {
          category: categoryData.category,
          subcategory: categoryData.subcategory,
          code: categoryData.code,
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
  

/**
 * Fetches a single category by its ID.
 * 
 * @param {string} id - The ID of the category to be fetched.
 * @returns {Promise} - A promise that resolves to the fetched category data.
 * @throws {Error} - Throws an error if the request fails.
 */
const getCategory = async (id: string): Promise<Category> => {
    try {
      const response: AxiosResponse<Category> = await axiosInstance.get(`/category/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  };
  
/**
 * Updates an existing category by its ID.
 * 
 * @param {string} id - The ID of the category to be updated.
 * @param {Object} categoryData - The updated category data.
 * @returns {Promise} - A promise that resolves to the updated category data.
 * @throws {Error} - Throws an error if the request fails.
 */
const updateCategory = async (
    id: string,
    categoryData: { category: string; subcategory: string; code: string },
    token: string
  ): Promise<Category> => {
    try {
      const response: AxiosResponse<Category> = await axiosInstance.put(
        `/category/${id}`,
        {
          category: categoryData.category,
          subcategory: categoryData.subcategory,
          code: categoryData.code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };
  

/**
 * Deletes a category by its ID.
 * 
 * @param {string} id - The ID of the category to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the category is deleted.
 * @throws {Error} - Throws an error if the request fails.
 */
const deleteCategory = async (id: string, token: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };
  

export { getCategories, getCategory, createCategory, updateCategory, deleteCategory };