"use client";

import React, { useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Button from "../button/button";
import Link from 'next/link';
import { FaSun, FaMoon, FaHeart } from 'react-icons/fa';
import { CgMenuMotion } from "react-icons/cg";
import { useTheme } from '@/hooks/page';
import { IoIosClose } from "react-icons/io";
import { getWishlist } from '@/services/wishlist/wishListService';

interface TopNavBarProps {
  wishlistCount: number[];
}

export default function TopNavBar({ wishlistCount }: TopNavBarProps) {
  const { isDarkMode, toggleTheme } = useTheme();  
  const [cartCount, setCartCount] = useState(0);
  const [ isMenuOpen, setToggleMenu] = useState(false);
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login"); 
  };

  const handleRegisterClick = () => {
    router.push("/register"); 
  };
  const handleWishlistClick = () => {
    router.push("/wishlist"); 
  };
  const handleToggleMenu = () => {
    setToggleMenu(!isMenuOpen);
  };

  return (
    <nav className={`flex justify-between items-center p-5 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} border-b border-gray-200`}>
      <Link href='/'> <div className="text-2xl font-bold text-[#3fa6c5]">Kaizen</div> </Link>

      <ul className="hidden lg:flex gap-5 list-none">
        {["Home", "Shop", "About Us", "Contact Us"].map((item) => (
          <li key={item} className="cursor-pointer hover:text-blue-500">
            <Link href={`/${item.toLowerCase().replace(/\s/g, "-")}`}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden lg:flex gap-3 items-center">
        {/* Cart Button with Badge */}
        <button className="relative text-white px-3 py-1 rounded flex items-center">
          <AiOutlineShoppingCart size={20} className="text-[var(--primary)]" onClick={handleWishlistClick}/>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </button>

        {/* Wishlist Button with Badge */}
        <button className="relative bg-transparent text-white px-3 py-1 rounded flex items-center">
          <AiOutlineHeart size={20} className="text-red-500"  />
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


      {/* MODILE CONTROL VIEW */}  
      <div> 
        <CgMenuMotion className={` ${isMenuOpen? 'hidden' : 'block'} lg:hidden text-[var(--primary)] text-2xl`} onClick={handleToggleMenu}/>
        <IoIosClose className={` ${isMenuOpen? 'block' : 'hidden'} lg:hidden text-red-500 text-3xl`}  onClick={handleToggleMenu}/>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed lg:hidden ${isDarkMode ? 'bg-gray-900 text-white border-b' : 'bg-white text-black'} top-16 left-0 w-full ${isMenuOpen? 'block' : 'hidden'}`}>
        <ul className='flex flex-col gap-5 py-2 pb-5'>
          <li className="text-lg font-bold text-gray-700 dark:text-white flex justify-end">
            {/* Dark/Light Mode Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-400">
              {isDarkMode ? <FaSun size={20} className="text-white" /> : <FaMoon size={20} className="text-gray-700" />}
            </button>

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
              <FaHeart size={20} className="text-red-500" />
              {wishlistCount.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {wishlistCount.length}
                </span>
              )}
            </button>
          </li>

          {["Home", "Shop", "About Us", "Contact Us"].map((item) => (
            <li key={item} className="flex justify-center cursor-pointer hover:text-blue-500">
              <Link href={`/${item.toLowerCase().replace(/\s/g, "-")}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col justify-center gap-3 items-center mb-4">
          {/* Login and Register Buttons */}
          <Button label="Login" onClick={handleLoginClick} />
          <Button label="Register" onClick={handleRegisterClick} />
        </div>
      </div>
    </nav>
  );
}
