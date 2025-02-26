import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../skeleton/skeleton';
import { useTheme } from '@/hooks/page';
import { deleteCategory, updateCategory } from '@/services/category/categoryService';
// import Modal from '@/components/Modal';
import { Dialog } from '@headlessui/react';

interface CategoryData {
  id?: number;
  name: string;
  description: string;
}

interface SampleTableProps {
  columns: any[];
  initialClaimsData: CategoryData[];
  label: string;
  loading: boolean;
  columnNumber: string;
  token: string;
}

const SampleTable: React.FC<SampleTableProps> = ({ columns, initialClaimsData = [], label, loading, columnNumber, token }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<CategoryData[]>(initialClaimsData);
  const { isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryData | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    setFilteredData(initialClaimsData);
    setCurrentPage(1);
  }, [initialClaimsData, columnNumber]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (item: CategoryData) => {
    setEditCategory(item);
    setIsModalOpen(true);
  };

  const handleEditSave = async () => {
    if (editCategory) {
      await updateCategory(editCategory.id!, editCategory, token);
      setFilteredData((prev) => prev.map((cat) => (cat.id === editCategory.id ? editCategory : cat)));
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id?: number) => {
    if (id) {
      await deleteCategory(id, token);
      setFilteredData((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  const filteredClaimsData = filteredData.filter((item) =>
    Object.values(item).some((val) => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredClaimsData.length / itemsPerPage);
  const currentData = filteredClaimsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const updatedColumns = [
    ...columns,
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, item: CategoryData) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEditClick(item)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
          <button onClick={() => handleDelete(item.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className={`mt-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}> 
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="text-xl font-bold">{label}</div>
        <input type="text" placeholder="Search..." className={`border rounded px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} value={searchTerm} onChange={handleSearchChange} />
      </div>

      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="overflow-hidden rounded-lg w-full">
          <div className={`grid grid-cols-3 p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-black'} text-white`}>
            {updatedColumns.map((column) => (
              <div key={column.key} className="font-semibold">{column.title}</div>
            ))}
          </div>
          {currentData.map((item, index) => (
            <div key={index} className={`p-2 sm:p-4 grid grid-cols-3 gap-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}> 
              {updatedColumns.map((column) => (
                <div key={column.key}>{column.render ? column.render(null, item) : item[column.dataIndex]}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        {[...Array(totalPages)].map((_, index) => (
          <button key={index} className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-300'}`} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
        ))}
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>

      {isModalOpen && editCategory && (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>              
          <Dialog.Title className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-96 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h2 className="text-lg font-bold mb-4">Edit Category</h2>
            <input type="text" className="border p-2 w-full mb-2" value={editCategory.name} onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })} />
            <input type="text" className="border p-2 w-full mb-2" value={editCategory.description} onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleEditSave}>Save</button>
         </Dialog.Title>
        </Dialog>
      )}
    </div>
  );
};

export default SampleTable;
