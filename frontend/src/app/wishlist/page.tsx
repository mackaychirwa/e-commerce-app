"use client"

import { useState } from 'react';
import Image from "next/image";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      name: 'Beanie with Logo',
      unitPrice: 20.00,
      salePrice: 18.00,
      stockStatus: 'In Stock',
      addedDate: 'December 5, 2019',
      image: "/images/1.svg",
    },
    {
      name: 'Classy shirt',
      unitPrice: 16.00,
      stockStatus: 'In Stock',
      addedDate: 'December 6, 2019',
      image: "/images/1.svg",
    },
    {
      name: 'Beanie',
      unitPrice: 20.00,
      salePrice: 18.00,
      stockStatus: 'In Stock',
      addedDate: 'December 7, 2019',
      image: "/images/1.svg",
    },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-center mb-8">My Wishlist</h1>

      <div className="space-y-4">
        {wishlist.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b border-gray-200"
          >
            <div className="flex items-center">
              <Image
                src={item.image} 
                alt={item.name}
                className="w-12 h-12 mr-4"
                width={500} height={500}
              />
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                {item.salePrice ? (
                  <p className="text-gray-500 line-through">${item.unitPrice.toFixed(2)}</p>
                ) : null}
                <p className="text-gray-900 font-semibold">${item.salePrice ? item.salePrice : item.unitPrice}</p>
                <p className="text-sm text-gray-500">Added on {item.addedDate}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm ${item.stockStatus === 'In Stock' ? 'text-green-500' : 'text-red-500'}`}>
                {item.stockStatus}
              </p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
