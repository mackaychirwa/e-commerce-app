import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../skeleton/skeleton';
import { useTheme } from '@/hooks/page';

// Define the type for product data
interface NewProduct {
  name: string;
  qty: number;
  description: string;
  unit_cost: number;
  category_id: number;
}


interface SampleTableProps {
  columns: any[];
  initialClaimsData: NewProduct[];
  label: string;
  loading: boolean;
  columnNumber: string;
}

const ProductTable: React.FC<SampleTableProps> = ({ columns, initialClaimsData = [], label, loading, columnNumber }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<NewProduct[]>(initialClaimsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const itemsPerPage = 10;

  useEffect(() => {
    setFilteredData(initialClaimsData);
    setCurrentPage(1);
  }, [initialClaimsData, columnNumber]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterColumnChange = (e) => {
    setFilterColumn(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  // Dynamic filtering based on selected filter column and search
  const filteredClaimsData = filteredData.filter((item) => {
    const filterMatch = filterColumn
      ? String(item[filterColumn]).toLowerCase().includes(filterValue.toLowerCase())
      : true;

    const searchMatch = Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return searchMatch && filterMatch;
  });

  const totalPages = Math.ceil(filteredClaimsData.length / itemsPerPage);
  const currentData = filteredClaimsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Get unique filter values dynamically from the selected column
  const getUniqueFilterValues = () => {
    if (!filterColumn) return [];
    return [...new Set(filteredData.map((item) => item[filterColumn]))];
  };
  
  const isSmallScreen = window.innerWidth < 390; // Tailwind's `sm` is at 640px

  return (
    <div className={`mt-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="text-xl font-bold">{label}</div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Search Box */}
          <input
            type="text"
            placeholder="Search..."
            className={`border rounded px-2 sm:px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {/* Column Filter */}
          <select
            className={`border rounded px-2 sm:px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
            value={filterColumn}
            onChange={handleFilterColumnChange}
          >
            <option value="">Select Column</option>
            {columns.map((column) => (
              <option key={column.key} value={column.dataIndex}>
                {column.title}
              </option>
            ))}
          </select>

          {/* Filter Value */}
          {filterColumn && (
            <select
              className={`border rounded px-2 sm:px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              value={filterValue}
              onChange={handleFilterValueChange}
            >
              <option value="">All</option>
              {getUniqueFilterValues().map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          )}

          
        </div>
      </div>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="overflow-hidden rounded-lg w-full">
          <div className={`grid grid-cols-4 sm:grid-cols-6 p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-black'} text-white`}>
            {columns
              .filter(
                (column) =>
                  isSmallScreen
                    ? column.dataIndex === 'name' || column.title === 'Actions'
                    : true
              )
              .map((column) => (
                <div key={column.key} className="font-semibold w-full">
                  {column.title}
                </div>
              ))}
          </div>

          {currentData.map((item, index) => (
          <div
            key={index}
            className={`p-2 sm:p-4 mb-[1px] grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            {columns
              .filter(
                (column) =>
                  isSmallScreen ? column.dataIndex === 'name' || column.title === 'Actions' : true
              )
              .map((column) => (
                <div key={column.key}>
                  {column.dataIndex === 'category_id' ? (
                    // Display category name instead of the category_id
                    <span>{item?.category?.name || 'No Category'}</span>
                  ) : column.render ? (
                    column.render(null, item)
                  ) : (
                    item[column.dataIndex]
                  )}
                </div>
              ))}
          </div>
        ))}

        </div>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
