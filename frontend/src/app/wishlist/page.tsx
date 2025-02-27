"use client";

import Image from "next/image";
import TopNavBar from '@/components/navigation/topNavBar';
import { useTheme } from "@/hooks/page";
import { getWishlist } from '@/services/wishlist/wishListService';
import { useEffect, useState } from "react";

const Wishlist = () => {
    const { isDarkMode } = useTheme();   
    const [wishlist, setWishlist] = useState([]);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const user = storedUser ? JSON.parse(storedUser) : null;

    const fetchWishlist = async () => {
        if (!user) return;
        try {
            const response = await getWishlist(user.id, token);
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
      <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
          <TopNavBar wishlistCount={wishlist.length} />
          <div className="p-8">
              <h1 className="text-3xl font-semibold text-center mb-8">My Wishlist</h1>
  
              {wishlist.length === 0 ? (
                  <p className="text-center text-gray-500">Your wishlist is empty.</p>
              ) : (
                  <div className="w-full flex justify-center">
                      <div className="w-3/4">
                          {/* Wishlist Titles */}
                          <div className="grid grid-cols-6 gap-4 items-center p-4 border-b border-gray-200 font-semibold">
                              <p className="text-center">Image</p>
                              <p className="text-center">Product</p>
                              <p className="text-center">Price (MWK)</p>
                              <p className="text-center">Stock</p>
                              <p className="text-center">Date</p>
                              <p className="text-center">Action</p>
                          </div>
  
                          {/* Wishlist Items */}
                          {wishlist.map((item, index) => (
                              <div key={index} className="grid grid-cols-6 gap-4 items-center p-4 border-b border-gray-200">
                                  <div className="flex justify-center">
                                      <Image
                                          src={`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')}/${item?.product?.image_url?.replace(/^\//, '')}`}
                                          alt={item?.product?.name} 
                                          width={64}
                                          height={64}
                                          className="w-16 h-16 object-cover rounded"
                                      />
                                  </div>
                                  <p className="text-center">{item?.product?.name}</p>
                                  <p className="text-center font-semibold">{parseFloat(item?.product?.unit_cost).toFixed(2)}</p>
                                  <p className="text-center text-gray-500">{item?.product?.qty}</p>
                                  <p className="text-center text-gray-500">{new Date(item?.createdAt).toLocaleDateString()}</p>
                                  <div className="flex gap-2 justify-center">
                                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                          Add to cart
                                      </button>
                                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                                          Remove
                                      </button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>
      </div>
  );
  
};

export default Wishlist;
