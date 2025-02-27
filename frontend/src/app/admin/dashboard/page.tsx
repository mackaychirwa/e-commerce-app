"use client"

import MainComponent from '@/components/mainComponent';
import { useTheme } from '@/hooks/page';
import { getUsers } from '@/services/authentication/authenticationService';
import { getCategories } from '@/services/category/categoryService';
import { getProducts } from '@/services/product/productService';
import React, { useEffect, useState } from 'react';
import { FiUsers, FiFolder, FiFile, FiHardDrive } from "react-icons/fi";

export default function Dashboard() {
  const { isDarkMode } = useTheme();
const [loading, setLoading] = useState(false);
const [user, setUser] = useState([]);
const [category, setCategory] = useState([]);
    // const [product, setProduct] = useState([]);
const [product, setProduct] = useState([]);
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;



//TODO:: Need to change this to one api call to improve perfomance
const fetchCategory = async () => {
  setLoading(true);
  try {
      const response = await getCategories(token);
      console.log('category data', response);

      if (response.status === 200) {
          const data = response.data;
          setCategory(data.category);
      } else {
          console.error('Failed to retrieve category data', response);
      }
  } catch (error) {
      console.error('Error retrieving category data:', error);
  } finally {
      setLoading(false);
  }
};

// Fetch Products data from the backend
const fetchProducts = async () => {
  setLoading(true);
  try {
      const response = await getProducts(token);
      console.log('getProducts', response);

      if (response.status === 200) {
          const data = response.data;
          setProduct(data);
      } else {
          console.error('Failed to retrieve product data', response);
      }
  } catch (error) {
      console.error('Error retrieving product data:', error);
  } finally {
      setLoading(false);
  }
};
const fetchUsers = async () => {
  setLoading(true);
  try {
      const response = await getUsers(token);
      console.log('getUsers', response);

      if (response.status === 200) {
          const data = response.data;
          setUser(data);
      } else {
          console.error('Failed to retrieve user data', response);
      }
  } catch (error) {
      console.error('Error retrieving user data:', error);
  } finally {
      setLoading(false);
  }
};
useEffect(() => {
  fetchUsers();
  fetchProducts();
  fetchCategory();
}, []);
  
  // Dashboard cards configuration
  const cards = [
    {
      icon: <FiUsers className="text-2xl text-[var(--primary)]" />,
      title: "Users",
      count: user.length ?? 0,
    },
    {
      icon: <FiFolder className="text-2xl text-[var(--primary)]" />,
      title: "Categories",
      count:  category.length ?? 0,
    },
    {
      icon: <FiFile className="text-2xl text-[var(--primary)]" />,
      title: "Products",
      count: product.length ?? 0,
    },
    {
      icon: <FiHardDrive className="text-2xl text-[var(--primary)]" />,
      title: "Storage Capacity",
      count: product.length > 0 ? product[0].sizeFormatted : "0 B",
    },
  ];
  
console.log(product)
 
  return (
    <MainComponent>
      <div className={` w-full min-h-screen ${
        isDarkMode ? 'bg-[var(--dark-bg)]' : 'bg-gray-50'
      }`}>
        <h1 className={`text-xl md:text-2xl font-semibold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${
                isDarkMode ? 'bg-[var(--dark-card)]' : 'bg-white'
              } rounded-lg shadow-lg p-4 md:p-6 transition-all duration-300 hover:shadow-xl`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {card.title}
                  </p>
                  <h3 className={`text-xl md:text-2xl font-bold mt-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {card.count}
                  </h3>
                </div>
                <div className={`p-3 rounded-full ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                } transition-colors duration-300`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Upload Chart */}
        <div className={`mt-6 p-4 md:p-6 ${
          isDarkMode ? 'bg-[var(--dark-card)]' : 'bg-white'
        } rounded-lg shadow-lg transition-all duration-300`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className={`text-lg md:text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Products Uploaded
            </h2>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            </div>
          </div>
          <div className="mt-4 h-[350px] w-full">
           
          </div>
        </div>
      </div>
    </MainComponent>
  );
}
