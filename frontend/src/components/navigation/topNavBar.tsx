"use client";

import React, { useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Button from "../button/button";
import Link from 'next/link';
import { FaSun, FaMoon } from 'react-icons/fa'; 
import { useTheme } from '@/hooks/page';

interface TopNavBarProps {
  wishlistCount: number[];
}

export default function TopNavBar({ wishlistCount }: TopNavBarProps) {
  const { isDarkMode, toggleTheme } = useTheme();  
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login"); 
  };

  const handleRegisterClick = () => {
    router.push("/register"); 
  };

  return (
    <nav className={`flex justify-between items-center p-5 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} border-b border-gray-200`}>
      <div className="text-2xl font-bold text-[#3fa6c5]">Kaizen</div>
      <ul className="flex gap-5 list-none">
        {["Home", "Shop", "About Us", "Contact Us"].map((item) => (
          <li key={item} className="cursor-pointer hover:text-blue-500">
            <Link href={`/${item.toLowerCase().replace(/\s/g, "-")}`}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-3 items-center">
        {/* Cart Button with Badge */}
        <button className="relative bg-[#3fa6c5] text-white px-3 py-1 rounded flex items-center">
          <AiOutlineShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </button>

        {/* Wishlist Button with Badge */}
        <button className="relative bg-transparent text-white px-3 py-1 rounded flex items-center">
          <AiOutlineHeart size={20} className="bg-red-500" />
          {wishlistCount.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {wishlistCount.length}
            </span>
          )}
        </button>

        {/* Login and Register Buttons */}
        <Button label="Login" onClick={handleLoginClick} />
        <Button label="Register" onClick={handleRegisterClick} />

        {/* Dark/Light Mode Toggle */}
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-gray-300 hover:bg-gray-400">
          {isDarkMode ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} className="text-gray-700" />}
        </button>
      </div>
    </nav>
  );
}
