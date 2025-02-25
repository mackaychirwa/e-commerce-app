"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from '@/hooks/page';
import TopNavBar from '@/components/navigation/topNavBar';

const ProductDetailPage = () => {
  const { id } = useParams(); // Access dynamic 'id' from URL using useParams
  const { isDarkMode } = useTheme();  // Access dark mode state
  const [wishList, setWishlist] = useState<number[]>([]);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);  // Quantity state
  const [reviewText, setReviewText] = useState("");  // Review text state
  const [reviews, setReviews] = useState<string[]>([
    "Great product! Highly recommend.",
    "Satisfactory quality, would buy again.",
    "Amazing! Exactly what I was looking for."
  ]); // Dummy reviews

  useEffect(() => {
    if (id) {
      // Simulate fetching product details based on the id
      const fetchedProduct = {
        id: Number(id),
        name: "Baby Stroller",
        brand: "CozyBaby",
        image: "/images/1.svg",
        unit_price: 5,
        description: "A comfortable and stylish stroller for your baby."
      };
      setProduct(fetchedProduct);
    }
  }, [id]);  // Trigger useEffect when the id changes

  // Render loading or fallback if product is not available
  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddReview = () => {
    if (reviewText) {
      setReviews([...reviews, reviewText]);
      setReviewText("");  // Clear review text after submission
    }
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

      {/* Product Details */}
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center">{product.name}</h1>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-80 object-cover rounded-md mx-auto my-4"
        />
        <p className="text-gray-600 text-center">{product.brand}</p>
        <p className="text-gray-500 mt-2 text-center">{product.description}</p>
        <p className="text-xl mt-4 text-center">${product.unit_price}</p>

        {/* Quantity and Add to Cart */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button 
            className="text-xl bg-gray-300 p-2 rounded-full"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            -
          </button>
          <span className="text-xl">{quantity}</span>
          <button 
            className="text-xl bg-gray-300 p-2 rounded-full"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-[#3fa6c5] text-white px-6 py-2 rounded-md flex items-center space-x-2">
            <span>Add to Cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <div className="mt-4">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
            />
            <button
              onClick={handleAddReview}
              className="bg-[#3fa6c5] text-white px-6 py-2 rounded-md mt-2"
            >
              Submit Review
            </button>
          </div>

          {/* Display Reviews */}
          <div className="mt-6">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="p-4 border-b border-gray-300">
                  <p className="text-sm text-gray-600">{review}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
