'use client'

import { Dialog } from '@headlessui/react';
import SampleTable from '@/components/dataTable/datatable';
import MainComponent from '@/components/mainComponent';
import { useTheme } from '@/hooks/page';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { createCategory, deleteCategory, getCategories } from '@/services/category/categoryService';
import { useSelector } from 'react-redux';
import { Category } from '@/types/categoryType';



const columns = [
  { 
    key: 'categoryName', 
    title: 'Category Name',
    dataIndex: 'name', 
  },

  { 
    key: 'description', 
    title: 'Description',
    dataIndex: 'description', 
  },
 
];



const Dashboard: React.FC = () => {
  const { isDarkMode } = useTheme();

  const [loading, setLoading] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id'>>({
    name: '',
    description: ''
  });



    // Handle adding a new category
    const handleAddCategory = () => {
      console.log("Adding new category...");
      setIsModalOpen(true); 
    };

    // Handle modal form input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewCategory((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
      const handleSubmit = async () => {
        console.log("New category added:", newCategory);
        try {
          setLoading(true);
          const response = await createCategory(newCategory, token);
          console.log(" Send `formData`", response);
          if (response.status === 201) {
            setCategory((prevCategory) => [
              ...prevCategory,
              { ...newCategory, id: prevCategory.length + 1 },
            ]);
          }
        } catch (error) {
          console.error("Upload failed:", error);
          alert("Upload failed. Please try again.");
        } finally {
          setLoading(false);
        }
        setIsModalOpen(false);
      };
      const handleDelete = async () => {
        console.log("New category added:", newCategory);
        try {
          setLoading(true);
          const response = await deleteCategory(newCategory, token);
          console.log(" Send `formData`", response);
          if (response.status === 201) {
            setCategory((prevCategory) => [
              ...prevCategory,
              { ...newCategory, id: prevCategory.length - 1 },
            ]);
          }
        } catch (error) {
          console.error("Upload failed:", error);
          alert("Upload failed. Please try again.");
        } finally {
          setLoading(false);
        }
        setIsModalOpen(false);
      };
      const handleEdit = async () => {
        console.log("New category added:", newCategory);
        try {
          setLoading(true);
          const response = await createCategory(newCategory, token);
          console.log(" Send `formData`", response);
          if (response.status === 201) {
            setCategory((prevCategory) => [
              ...prevCategory,
              { ...newCategory, id: prevCategory.length + 1 },
            ]);
          }
        } catch (error) {
          console.error("Upload failed:", error);
          alert("Upload failed. Please try again.");
        } finally {
          setLoading(false);
        }
        setIsModalOpen(false);
      };
      // Fetch clients data from the backend
      const fetchClients = async () => {
        setLoading(true);
        try {
            const response = await getCategories(token);
            console.log('client data', response);

            if (response.status === 200) {
                const data = response.data;
                setCategory(data.category);
                
                sessionStorage.setItem('clientsData', JSON.stringify(data));
            } else {
                console.error('Failed to retrieve client data', response);
            }
        } catch (error) {
            console.error('Error retrieving client data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
       fetchClients();
    }, []);
    
  return (
    <MainComponent>
      <div 
        className={`p-6 sm:p-8 mt-6 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold"></h2>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-800" onClick={handleAddCategory}>
            Add New Category
          </button>
        </div>

        <SampleTable 
          columns={columns} 
          initialClaimsData={category} 
          label="Categories" 
          loading={loading} 
          columnNumber="5" 
          token={token}
        />
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        
        <Dialog.Title 
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-96 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        >
          <h3 className="text-xl font-semibold">Add New Category</h3>
          <form className="mt-4">
            <div className="mb-2">
              <label className="block text-sm font-medium">Category Name</label>
              <input
                type="text"
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}

               
              />
            </div>
           
            <div className="mb-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                rows={3}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Title>
      </Dialog>
    </MainComponent>
  );
}

export default Dashboard;
