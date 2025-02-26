import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../skeleton/skeleton';
import { useTheme } from '@/hooks/page';
import { updateReview } from '@/services/review/reviewService';
import { Dialog } from '@headlessui/react';
import { Review } from '@/types/reviewType';

interface ReviewTableProps {
  columns: any[];
  initialReviewsData: Review[];
  label: string;
  loading: boolean;
  columnNumber: string;
  token: string;
}

const ReviewTable = ({ columns, initialReviewsData = [], label, loading, columnNumber, token }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<Review[]>(initialReviewsData);
  const { isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editReview, setEditReview] = useState<Review | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    setFilteredData(initialReviewsData);
    setCurrentPage(1);
  }, [initialReviewsData, columnNumber]);

  const handleReplyClick = (review: Review) => {
    setEditReview(review);
    setIsModalOpen(true);
  };

  const handleReplySave = async () => {
    if (editReview) {
      await updateReview(editReview.id!, editReview, token);
      setFilteredData((prev) => prev.map((rev) => (rev.id === editReview.id ? editReview : rev)));
      setIsModalOpen(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredReviewsData = filteredData.filter((item) =>
    Object.values(item).some((val) => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredReviewsData.length / itemsPerPage);
  const currentData = filteredReviewsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      render: (_: any, item: Review) => (
        <div className="flex space-x-2">
          <button onClick={() => handleReplyClick(item)} className="px-2 py-1 bg-blue-500 text-white rounded">Reply</button>
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
          <div className={`grid grid-cols-5 p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-black'} text-white`}>
            {updatedColumns.map((column) => (
              <div key={column.key} className="font-semibold">{column.title}</div>
            ))}
          </div>

          {currentData.map((item, index) => (
            <div key={index} className={`p-2 sm:p-4 mb-[1px] grid grid-cols-5 gap-5 sm:gap-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}> 
              {columns.map((column) => (
                <div key={column.key}>{column.render ? column.render(null, item) : item[column.dataIndex]}</div>
              ))}
              <div className="flex space-x-2">
                <button onClick={() => handleReplyClick(item)} className="px-2 py-1 bg-blue-500 text-white rounded">Reply</button>
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

      {isModalOpen && editReview && (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>              
          <Dialog.Title className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-96 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h2 className="text-lg font-bold mb-4">Reply to Review</h2>
              <div className="mb-2">
                <textarea className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`} value={editReview.comment} onChange={(e) => setEditReview({ ...editReview, comment: e.target.value })} rows={3}></textarea>
              </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleReplySave}>Reply</button>
          </Dialog.Title>
        </Dialog>
      )}
    </div>
  );
};

export default ReviewTable;
