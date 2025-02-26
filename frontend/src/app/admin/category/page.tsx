'use client'

import { Dialog } from '@headlessui/react';
import SampleTable from '@/components/dataTable/datatable';
import MainComponent from '@/components/mainComponent';
import { useTheme } from '@/hooks/page';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { getCategories } from '@/services/category/categoryService';
import { useSelector } from 'react-redux';

// Define type for new category data
interface NewCategory {
  categoryName: string;
  productCount: string;
  description: string;
}

// Static data for product categories
const columns = [
  { 
    key: 'categoryName', 
    title: 'Category Name',
    dataIndex: 'name', // This links to the data
  },

  { 
    key: 'description', 
    title: 'Description',
    dataIndex: 'description', // This links to the data
  },
  { 
    key: 'actions', 
    title: 'Actions', 
    render: (item: any) => (
      <div className="text-sm flex gap-2">
        <button className="text-blue-500 hover:text-blue-700">Edit</button>
        <button className="text-red-500 hover:text-red-700">Delete</button>
      </div>
    )
  }
];



const Dashboard: React.FC = () => {
  const { isDarkMode } = useTheme();

  // Mock loading state for table
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state: any) => state);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState<NewCategory>({
    categoryName: '',
    productCount: '',
    description: ''
  });

  // Handle adding a new category
  const handleAddCategory = () => {
    console.log("Adding new category...");
    setIsModalOpen(true); // Open the modal to add a category
  };

  // Handle modal form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("New category added:", newCategory);
    setIsModalOpen(false); // Close modal after adding the category
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
                name="categoryName"
                value={newCategory.categoryName}
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
