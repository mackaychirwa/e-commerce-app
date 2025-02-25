"use client";

import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import { useState } from "react";
import TopNavBar from "@/components/navigation/topNavBar";
import { useTheme } from '@/hooks/page';  // Import useTheme
import Link from "next/link";

export default function Home() {
  const { isDarkMode } = useTheme();  // Access dark mode state
  const [wishList, setWishlist] = useState<number[]>([]);

  const products = [
    { id: 1, name: "Baby Stroller", brand: "CozyBaby", image: "/images/1.svg", unit_price: 5 },
    { id: 2, name: "Diaper Pack", brand: "Huggies", image: "/images/2.svg", unit_price: 5 },
    { id: 3, name: "Baby Bottle", brand: "Philips Avent", image: "/images/3.svg", unit_price: 5 },
    { id: 4, name: "Soft Blanket", brand: "ComfyNest", image: "/images/4.svg", unit_price: 5 },
  ];

  const handleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <TopNavBar wishlistCount={wishList} />
      {/* Header */}
      <header className="p-12 bg-gradient-to-r from-[#e6f7fb] to-white text-center">
        <h1 className="text-4xl mb-2">Welcome to Kaizen</h1>
        <p className="text-gray-600 mb-5">We are the center of all your baby needs</p>
        <div className="mt-5 flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search for Baby items or Keywords"
            className="flex-1 p-2 border border-gray-300 rounded-md"
          />
          <button className="bg-[#3fa6c5] text-white px-4 py-2 rounded-md">Search</button>
        </div>
      </header>

      <section className="p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-2 rounded-lg shadow-sm bg-white">
              <Link href={`/products/${product.id}`} passHref>
                <div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-500">{product.brand}</p>
                  <p className="text-xl mt-4">${product.unit_price}</p>
                </div>
              </Link>
              <div className="flex justify-end mt-2 gap-2">
                {/* Wishlist Button */}
                <button
                  className={`px-3 py-1 rounded flex items-center gap-2 border transition ${
                    wishList.includes(product.id)
                      ? "bg-[#3fa6c5] text-white"
                      : "border-[#3fa6c5] text-[#3fa6c5] hover:bg-[#3fa6c5] hover:text-white"
                  }`}
                  onClick={() => handleWishlist(product.id)}
                >
                  <AiOutlineHeart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>   
    </div>
  );
}
