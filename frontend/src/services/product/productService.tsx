import axiosInstance from '../api';
import { AxiosResponse } from 'axios';

interface Product {
    id: number;
    name: string;
    description: string;
    unit_cost: number;
    qty: string;
    category_id: string;
    imageUrl: string;
  }
  
  const getProducts = async (token: string) => {
    try {
      const response = await axiosInstance.get('/product', {
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
  const createProduct = async (formData: FormData, token: string) => {
    try {

        for (const [key, value] of formData.entries()) {
          console.log(key, value);
      }
        const response = await axiosInstance.post(
            "/product",
            formData,  
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};
const getProduct = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  };
  

const updateProduct = async (id: number,  productData: Product,   token: string ) => {
    try {
      const response = await axiosInstance.put(
        `/product/${id}`,
        {
          name: productData.name,
          description: productData.description,
          unit_cost: productData.unit_cost,
          qty: productData.qty,
          category_id: productData.category_id,
          imageUrl: productData.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };
  

const deleteProduct = async (id: number, token: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };
  

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };