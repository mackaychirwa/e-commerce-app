"use client";

import { useParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from '@/hooks/page';
import TopNavBar from '@/components/navigation/topNavBar';
import { getProduct } from '@/services/product/productService';
import { useSelector } from "react-redux";
import WarningAlert from '@/components/alert/warningAlert';
import SuccessAlert from '@/components/alert/successAlert';
import ErrorAlert from '@/components/alert/errorAlert';
import { createReview, getReviews } from '@/services/review/reviewService';
import { store } from '@/store/redux/auth/store';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const [wishList, setWishlist] = useState<number[]>([]);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state: any) => state);
  const [reviews, setReviews] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await getProduct(Number(id), token);
        console.log(response)
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          console.error("Failed to retrieve product", response);
        }
      } catch (error) {
        console.error("Error retrieving product:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchReviews = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await getReviews(token);
        console.log(response);
        if (response.status === 200) {
          // Filter reviews based on product_id matching the current product's id
          const filteredReviews = response.data.filter(
            (review) => review.product_id === Number(id)
          );
          setReviews(filteredReviews);
        } else {
          console.error("Failed to retrieve reviews", response);
        }
      } catch (error) {
        console.error("Error retrieving reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    fetchReviews();
  }, [id, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  const currentState = store.getState();

  console.log(currentState)
  const handleAddReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  

    setLoading(true);
  
    try {
      const response = await createReview(reviewText,1, Number(id), token);
  
      console.log('Response:', response);
  
      if (response.data.success === true) {
      
        SuccessAlert({ 
          title: 'Thank you for you wonderfull review', 
          message: response.data.message || 'Thank you for you wonderfull revie!',
        });
       
      }else{
        ErrorAlert({ 
          title: 'Item already Reviewed',
          message:'An error occurred during review',
        });
      }
    } catch (error) {
      console.error('review Error:', error);
      ErrorAlert({ 
        title: 'failed to review',
        message:'An error occurred during review',
      });
    } finally {
      setReviewText("");
      setLoading(false);
    }
  };
  // const handleAddReview = () => {
  //   if (reviewText) {
  //     setReviews([...reviews, reviewText]);
  //     setReviewText("");
  //   }
  // };

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      <TopNavBar wishlistCount={wishList} />

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

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center">{product.name}</h1>

        <div>
          {product.imageUrl ? (
         <Image
         src={`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')}/${product.imageUrl?.replace(/^\//, '')}`}
         alt={product.name}
         width={800}  // Increase width
         height={800} // Increase height
         className="w-full h-[500px] object-cover rounded-md mb-3"
       />
       
          ) : (
            <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-md mb-3">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-center">{product.brand}</p>
        <p className="text-gray-500 mt-2 text-center">{product.description}</p>
        <p className="text-xl mt-4 text-center">MWK: {product.unit_cost}</p>

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


          <div className="mt-6">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="p-4 border-b border-gray-300">
                  <p className="text-sm text-gray-600">{review?.comment}</p>
                  {/* Format and display the createdAt time using toLocaleString */}
                  <p className="text-xs text-gray-500">
                    {review?.createdAt
                      ? new Date(review.createdAt).toLocaleString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'No date available'}
                  </p>

                  {/* Display Admin Reply */}
                  <div className="mt-2 pl-4 border-l-2 border-gray-300">
                    <p className="text-sm text-gray-800 font-semibold">Admin Reply:</p>
                    <p className="text-sm text-gray-600">
                      "Thank you for your feedback! We're glad you liked the product."
                    </p>
                  </div>
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
