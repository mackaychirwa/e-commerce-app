"use client";

import { AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import TopNavBar from "@/components/navigation/topNavBar";
import { useTheme } from "@/hooks/page";
import Link from "next/link";
import { getProducts } from "@/services/product/productService";
import { useSelector } from "react-redux";
import { createWishlist } from "@/services/wishlist/wishListService";

interface ProductType {
  id: number;
  name: string;
  description: string;
  unit_cost: string;
  qty: number;
  category_id: number;
  imageUrl?: string;
}

export default function Home() {
  const { isDarkMode } = useTheme(); 
  const [wishList, setWishlist] = useState<number[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // const handleWishlist = (productId: number) => {
  //   setWishlist((prev) =>
  //     prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
  //   );
  // };
  const handleWishlist = async (productId: number) => {

    try {
      const user_id =1;
      const response = await createWishlist(productId, user_id, token);
      if(response.status == 201)
      {
        setWishlist((prev) =>
          prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
      }
      console.log(response);
    } catch (err: any) {
      console.error('Error:', err);
     
    } finally {
      setLoading(false);
    }
  }

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(token);
      console.log("Fetched Products:", response);

      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error("Failed to retrieve products", response);
      }
    } catch (error) {
      console.error("Error retrieving products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
      <TopNavBar wishlistCount={wishList} />
      {/* Header */}
      <header className={`p-12 text-center ${isDarkMode ? "bg-gray-800" : "bg-[#e6f7fb]"}`}>
        <h1 className="text-4xl font-bold">Welcome to Kaizen</h1>
        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-5`}>
          We are the center of all your baby needs
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search for Baby items or Keywords"
            className={`flex-1 p-2 border rounded-md ${
              isDarkMode ? "bg-gray-800 text-white border-gray-600" : "border-gray-300"
            }`}
          />
          <button className="bg-[#3fa6c5] text-white px-4 py-2 rounded-md">Search</button>
        </div>
      </header>

      <section className="p-10">
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className={`border p-2 rounded-lg shadow-sm ${
                  isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"
                }`}
              >
                <Link href={`/products/${product.id}`} passHref>
                  <div>
                    {product.imageUrl ? (
                    <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')}/${product.imageUrl?.replace(/^\//, '')}`}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  
                    ) : (
                      <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-md mb-3">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {product.description}
                    </p>
                    <p className="text-xl mt-4">MWK: {product.unit_cost}</p>
                  </div>
                </Link>
                <div className="flex justify-end mt-2 gap-2">
                  {/* Wishlist Button */}
                  <button
                    className={`px-3 py-1 rounded flex items-center gap-2 border transition ${
                      wishList.includes(product.id)
                        ? "bg-[#3fa6c5] text-white"
                        : `border-[#3fa6c5] text-[#3fa6c5] hover:bg-[#3fa6c5] hover:text-white`
                    }`}
                    onClick={() => handleWishlist(product.id)}
                  >
                    <AiOutlineHeart size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
