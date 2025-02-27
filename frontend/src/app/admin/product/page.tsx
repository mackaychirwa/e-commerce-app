'use client'

import { Dialog, DialogTitle } from '@headlessui/react';
import MainComponent from '@/components/mainComponent';
import { useTheme } from '@/hooks/page';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createProduct, getProducts } from '@/services/product/productService';
import { getCategories } from '@/services/category/categoryService';
import ProductTable from '@/components/dataTable/productTable';

// Define type for new product data

interface ProductType {
  id: number;
  name: string;
  description: string;
  unit_cost: string;
  qty: number;
  category_id: number;
  imageUrl?: string;
}

// Static data for product
const columns = [
  { 
    key: 'productName', 
    title: 'Product Name',
    dataIndex: 'name',
  },
  { 
    key: 'unit_cost', 
    title: 'Unit Cost',
    dataIndex: 'unit_cost',
  },
  { 
    key: 'qty', 
    title: 'Quantity',
    dataIndex: 'qty',
  },
  { 
    key: 'category_id', 
    title: 'Category',
    dataIndex: 'category_id',
    
  },
  { 
    key: 'description', 
    title: 'Description',
    dataIndex: 'description', 
  },

];



const Product= () => {
    const { isDarkMode } = useTheme();

    const [loading, setLoading] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState("");
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [category, setCategory] = useState([]);
    // const [product, setProduct] = useState([]);
    const [product, setProduct] = useState<ProductType[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState(0);
    const [files, setFiles] = useState([]); 
    const [newProduct, setNewProduct] = useState<Omit<ProductType, 'id'>>({
      name: '',
      description: '',
      unit_cost: '',
      qty: 0,
      category_id: 0,
      imageUrl: '',
    });
    // const [newProduct, setNewProduct] = useState({
    //     name: '',
    //     qty: '',
    //     description: '',
    //     unit_cost: '',
    //     category_id: ''
    // });
    
    // Handle adding a new Product
    const handleAddProduct = () => {
        console.log("Adding new Product...");
        setIsModalOpen(true);
    };

    // Handle modal form input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        console.log("New Product added:", newProduct);
    
        if (files.length === 0) {
            alert("No files to upload.");
            return;
        }
    
        const fileName = files[0]?.name || "default_name";
        const formData = new FormData();
    
        files.forEach((file) => {
            formData.append("image", file); 
        });
    
        formData.append("path", selectedFolder);
        formData.append("namefile", fileName);
        formData.append("name", newProduct.name);
        formData.append("description", newProduct.description);
        formData.append("unit_cost", newProduct.unit_cost);
        formData.append("qty", newProduct.qty );
        formData.append("category_id", newProduct.category_id);
        // Log form data entries

        try {
            setLoading(true);
            const response = await createProduct(formData, token);
            console.log("Send `formData`", response);
            if(response.status == 200)
            {
       
              setProduct((prevProduct) => [
                ...prevProduct,
                { ...newProduct, id: product.length + 1 },
              ]);
              setUploadedFiles(files.length); 
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    
        setIsModalOpen(false);
    };
    console.log(category)
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const uploadedFiles = Array.from(e.target.files);
        const folderStructure: { path: string; files: File[] }[] = [];

        uploadedFiles.forEach((file) => {
            if (file.webkitRelativePath) {
                const pathParts = file.webkitRelativePath.split("/");
                const fileName = pathParts.pop();
                const folderPath = pathParts.join("/");

                const existingFolder = folderStructure.find(folder => folder.path === folderPath);
                if (existingFolder) {
                    existingFolder.files.push(file);
                } else {
                    folderStructure.push({ path: folderPath, files: [file] });
                }
            }
        });

        setUploadedFiles(0);
        setFiles(uploadedFiles);
    };
  
    
    const fetchCategory = async () => {
        setLoading(true);
        try {
            const response = await getCategories(token);
            console.log('client data', response);

            if (response.status === 200) {
                const data = response.data;
                setCategory(data.category);
            } else {
                console.error('Failed to retrieve client data', response);
            }
        } catch (error) {
            console.error('Error retrieving client data:', error);
        } finally {
            setLoading(false);
        }
    };

      // Fetch clients data from the backend
      const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await getProducts(token);
            console.log('getProducts', response);

            if (response.status === 200) {
                const data = response.data;
                setProduct(data);
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
        fetchProducts();
        fetchCategory();
    }, []);
    
  return (
    <MainComponent>
      <div 
        className={`p-6 sm:p-8 mt-6 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold"></h2>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-800" onClick={handleAddProduct}>
            Add New Product
          </button>
        </div>

        <ProductTable 
          columns={columns} 
          initialClaimsData={product} 
          label="Products" 
          loading={loading} 
          columnNumber="5" 
          token={token}
          category={category}
        />
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        
        <DialogTitle 
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-96 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        >
          <h3 className="text-xl font-semibold">Add New Product</h3>
          <form className="mt-4">
            <div className="mb-2">
              <label className="block text-sm font-medium">Product Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Unit Cost</label>
              <input
                type="number"
                name="unit_cost"
                value={newProduct.unit_cost}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Number of Products</label>
              <input
                type="number"
                name="qty"
                value={newProduct.qty}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Category</label>
              <select
                name="category_id"
                value={newProduct.category_id}
                className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                onChange={handleInputChange}
                >
                <option value="">Select Category</option>
                {category.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                    {cat?.name}
                    </option>
                ))}
                </select>              
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                rows={3}
              ></textarea>
            </div>
            {/* File Upload Dropzone */}
            <div className="drop-box-container mt-3 mb-3">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600"
                >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 16"
                    fill="none"
                    >
                    <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, or GIF
                    </p>
                </div>
                <input
                    type="file"
                    id="dropzone-file"
                    className="hidden"
                    onChange={handleFileUpload}
                />
                </label>
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
        </DialogTitle>
      </Dialog>
    </MainComponent>
  );
}

export default Product;
