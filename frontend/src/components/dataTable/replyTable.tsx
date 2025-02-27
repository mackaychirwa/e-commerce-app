import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../skeleton/skeleton';
import { useTheme } from '@/hooks/page';
import { updateProduct } from '@/services/product/productService';
import { Dialog } from '@headlessui/react';
import { updateReviewReply } from '@/services/review/reviewService';

interface NewProduct {
  id?: number;
  user_id: number;
  product_id: number;
  rating?: number;
  review_state?: number;
  comment?: string;
  user?: { id: number; username: string }; // Adding the user object
  product?: { id: number; name: string }; // Adding the product object
}

interface SampleTableProps {
  columns: any[];
  initialClaimsData: NewProduct[];
  label: string;
  loading: boolean;
  columnNumber: string;
  token: string;
}

const ReplyTable: React.FC<SampleTableProps> = ({ columns, initialClaimsData = [], label, loading, columnNumber, token, category }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<NewProduct[]>(initialClaimsData);
  const { isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<NewProduct | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    setFilteredData(initialClaimsData);
    setCurrentPage(1);
  }, [initialClaimsData, columnNumber]);
  console.log(initialClaimsData)
  const handleEditClick = (item: NewProduct) => {
    setEditProduct(item);
    setIsModalOpen(true);
  };

  const handleEditSave = async () => {
    if (editProduct?.id && editProduct.comment) {
      const response = await updateReviewReply(editProduct.id, { comment: editProduct.comment }, token); 
      console.log(response); 
      setFilteredData((prev) => prev.map((prod) => (prod.id === editProduct.id ? { ...prod, comment: editProduct.comment } : prod))); 
      setIsModalOpen(false);  
    }
  };
  
  const handleReply = (id?: number) => {
    if (id) {
      setEditProduct({ id });  
      setIsModalOpen(true);  
    }
  };
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterColumnChange = (e) => {
    setFilterColumn(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
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
      render: (_: any, item: NewProduct) => (
        <div className="flex space-x-2">
          {item.review_state === 1 ? (
            <button className="px-2 py-1 bg-blue-500 text-white rounded">View</button>
          ) : (
            <button onClick={() => handleReply(item.id)} className="px-2 py-1 bg-green-500 text-white rounded">Reply</button>
          )}
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
          <div className={`grid grid-cols-6 p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-black'} text-white`}>
            {updatedColumns.map((column) => (
              <div key={column.key} className="font-semibold">{column.title}</div>
            ))}
          </div>

          {currentData.map((item, index) => (
            <div
              key={index}
              className={`p-2 sm:p-4 mb-[1px] grid grid-cols-4 sm:grid-cols-6 gap sm:gap-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              {columns.map((column) => (
                <div key={column.key}>
                  {column.dataIndex === 'user_id' ? (
                    <span>{item?.user?.username || 'No Username found'}</span> 
                  ) : column.dataIndex === 'product_id' ? (
                    <span>{item?.product?.name || 'No Product found'}</span>
                  ) : column.render ? (
                    column.render(null, item)
                  ) : (
                    item[column.dataIndex]
                  )}
                </div>
              ))}
              <div className="flex space-x-2">
                <button onClick={() => handleReply(item.id)} className="px-2 py-1 bg-green-500 text-white rounded">Reply</button>
              </div>
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

      {isModalOpen && editProduct && (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Dialog.Title className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-96 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h2 className="text-lg font-bold mb-4">Reply</h2>
            <div className="mb-2">
                <textarea
                className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                value={editProduct.comment || ''}
                onChange={(e) => setEditProduct({ ...editProduct, comment: e.target.value })}
                rows={3}
                placeholder="Type your reply here..."
                />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleEditSave}>Submit Reply</button>
            </Dialog.Title>
        </Dialog>
        )}

    </div>
  );
};

export default ReplyTable;
