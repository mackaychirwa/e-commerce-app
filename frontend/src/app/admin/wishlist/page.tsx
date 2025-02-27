'use client'

import MainComponent from '@/components/mainComponent';
import { useTheme } from '@/hooks/page';
import React, { useState,  useEffect } from 'react';
import { getWishlists } from '@/services/wishlist/wishListService';
import WishlistTable from '@/components/dataTable/wishlistTable';



const Wishlist = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = storedUser ? JSON.parse(storedUser) : null;

  const columns = [
    { 
      key: 'user_id', 
      title: 'username',
      dataIndex: 'user_id', 
    },
  
    { 
      key: 'product_id', 
      title: 'Product name',
      dataIndex: 'product_id',
    },
    { 
      key: 'Cost', 
      title: 'cost',
      dataIndex: 'unit_cost',
    },
    { 
        key: 'Quality', 
        title: 'Quality',
        dataIndex: 'qty',
      },
   
 
  ];
  
    // Fetch review data from the backend
   
    const fetchWishlist = async () => {
        if (!user) return;
        try {
            const response = await getWishlists(token);
            console.log("Fetched wishlist:", response);

            if (response.status === 200 && Array.isArray(response.data)) {
                setWishlist(response.data);
            } else {
                console.error("Failed to retrieve Wishlist", response);
            }
        } catch (error) {
            console.error("Error retrieving Wishlist:", error);
        } 
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

  return (
    <MainComponent>
      <div className={`p-6 sm:p-8 mt-6 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <WishlistTable
          columns={columns} 
          initialClaimsData={wishlist} 
          label="Wishlist" 
          loading={loading} 
          columnNumber="5" 
          token={token}
        />
      </div>
    </MainComponent>
  );
}

export default Wishlist;
