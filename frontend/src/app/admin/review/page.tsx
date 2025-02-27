'use client'

import MainComponent from '@/components/mainComponent';
import { useTheme } from '@/hooks/page';
import React, { useState,  useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getReviews } from '@/services/review/reviewService';
import { Review } from '@/types/reviewType';
import ReplyTable from '@/components/dataTable/replyTable';




const ReviewReply = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<Review[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
      key: 'rating', 
      title: 'Rating',
      dataIndex: 'rating',
    },
    { 
      key: 'comment', 
      title: 'Comment',
      dataIndex: 'comment',
    },
    { 
        title: 'Review State',
        key: 'review_state', 
        dataIndex: 'review_state',
        render: (text) => {
          // Render 'Not yet replied' if review_state is 1, otherwise just show the review state
          return text === 1 ? 'Not yet replied' : 'Replied';
        },
    }
  ];
  
    // Fetch review data from the backend
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await getReviews(token);

            if (response.status === 200) {
                const data = response.data;
                setReview(data);
                
            } else {
                console.error('Failed to retrieve client data', response);
            }
        } catch (error) {
            console.error('Error retrieving client data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);
    
  return (
    <MainComponent>
      <div className={`p-6 sm:p-8 mt-6 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <ReplyTable
          columns={columns} 
          initialClaimsData={review} 
          label="Reviews" 
          loading={loading} 
          columnNumber="5" 
          token={token}
        />
      </div>
    </MainComponent>
  );
}

export default ReviewReply;
