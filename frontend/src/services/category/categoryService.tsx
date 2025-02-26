import axiosInstance from '../api';
/**
 * Fetches all categories for a given tenant domain.
 * 
 * @returns {Promise} - A promise that resolves to the fetched category data.
 * @throws {Error} - Throws an error if the request fails.
 */
interface Category {
    id?: number;
    name: string;
    description: string;
  }
  
  const getCategories = async (token: string) => {
    try {
      const response = await axiosInstance.get('/category', {
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
/**
 * Creates a new category for the specified tenant.
 * 
 * @param {Object} - The category data including name, subcategory, and code.
 * @returns {Promise} - A promise that resolves to the server response.
 * @throws {Error} - Throws an error if the request fails.
 */
const createCategory = async (categoryData: Omit<Category, "id">, token: string) => { 
  try {
    const response = await axiosInstance.post(
      "/category",
      {
        name: categoryData.name,
        description: categoryData.description,
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
 * @param {number} id - The ID of the category to be fetched.
 * @returns {Promise} - A promise that resolves to the fetched category data.
 * @throws {Error} - Throws an error if the request fails.
 */
const getCategory = async (id: number)=> {
    try {
      const response = await axiosInstance.get(`/category/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  };
  
/**
 * Updates an existing category by its ID.
 * 
 * @param {number} id - The ID of the category to be updated.
 * @param {Object} categoryData - The updated category data.
 * @returns {Promise} - A promise that resolves to the updated category data.
 * @throws {Error} - Throws an error if the request fails.
 */
const updateCategory = async (id: number,  categoryData: Category,   token: string )=> {
    try {
      const response = await axiosInstance.put(
        `/category/${id}`,
        {
          name: categoryData.name,
          description: categoryData.description,
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
 * @param {number} id - The ID of the category to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the category is deleted.
 * @throws {Error} - Throws an error if the request fails.
 */
const deleteCategory = async (id: number, token: string) => {
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