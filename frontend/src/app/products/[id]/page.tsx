'use client'

import { useParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from '@/hooks/page';
import TopNavBar from '@/components/navigation/topNavBar';
import { getProduct } from '@/services/product/productService';
import { useSelector } from "react-redux";
import SuccessAlert from '@/components/alert/successAlert';
import ErrorAlert from '@/components/alert/errorAlert';
import { createReview, getReviewReply, getReviews } from '@/services/review/reviewService';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const [wishList, setWishlist] = useState<number[]>([]);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state: any) => state);
  const [reviews, setReviews] = useState<any[]>([]); // Changed to store review objects with replies

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await getProduct(Number(id), token);
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
        if (response.status === 200) {
          const filteredReviews = response.data.filter((review) => review.product_id === Number(id));
          // Fetch replies for each review
          for (const review of filteredReviews) {
            const replyResponse = await getReviewReply(review.id, token);
            review.replies = replyResponse.status === 200 ? replyResponse.data : [];
          }
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

  const handleAddReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await createReview(reviewText, 1, Number(id), token); // Assuming 1 as the rating for now
      if (response.status === 200) {
        SuccessAlert({
          title: 'Thank you for your wonderful review',
          message: response.data.message || 'Thank you for your wonderful review!',
        });
        setReviewText(""); // Reset review text
        fetchReviews(); // Re-fetch reviews to show the newly added one
      } else {
        ErrorAlert({
          title: 'Item already Reviewed',
          message: 'An error occurred during the review process.',
        });
      }
    } catch (error) {
      console.error('Review Error:', error);
      ErrorAlert({
        title: 'Failed to review',
        message: 'An error occurred during review.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      <TopNavBar wishlistCount={wishList} />

   

      <div className="p-6 w-full mx-auto">
        <h1 className="text-3xl font-semibold text-center">{product.name}</h1>
        
        <div className="flex flex-col lg:flex-row w-full justify-center gap-5 mt-4">
          <div className="lg:w-2/5">
            {product.imageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')}/${product.imageUrl?.replace(/^\//, '')}`}
                alt={product.name}
                width={800}
                height={800}
                className="object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-md">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>

          <div className="flex flex-col lg:w-2/5">
            <p className="text-gray-600">{product.brand}</p>
            <p className="text-gray-500 mt-2">{product.description}</p>
            <p className="text-xl mt-4">MWK: {product.unit_cost}</p>

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
                  className="bg-[#3fa6c5] text-white px-6 py-2 rounded-md mt-2 w-full"
                >
                  Submit Review
                </button>
              </div>

              <div className="mt-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="p-4 border-b border-gray-300">
                      <p className="text-sm text-gray-600">{review.comment}</p>
                      <div className="mt-2">{renderStars(review.rating)}</div> {/* Render the star ratings */}
                      <p className="text-xs text-gray-500">
                        {review.createdAt
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

                      <div className="mt-2 pl-4 border-l-2 border-gray-300">
                        <p className="text-sm text-gray-800 font-semibold">Admin Replies:</p>
                        {review.replies ? (
                          <div>
                            <p className="text-sm text-gray-600">
                              {review.replies.reply}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">No replies yet</p>
                        )}
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
      </div>
    </div>
  );
};

export default ProductDetailPage;
