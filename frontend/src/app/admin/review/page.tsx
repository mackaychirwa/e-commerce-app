'use client'

import MainComponent from '@/components/mainComponent';
import { useTheme } from '@/hooks/page';
import React, { useState,  useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getReviews } from '@/services/review/reviewService';
import { Review } from '@/types/reviewType';
import ReviewTable from '@/components/dataTable/reviewTable';


const columns = [
  { 
    key: 'user_id', 
    title: 'Username',
    dataIndex: 'username', 
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
];



const ReviewReply = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state: any) => state);
  const [review, setReview] = useState<Review[]>([]);

    // Fetch review data from the backend
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await getReviews(token);
            console.log('client data', response);

            if (response.status === 200) {
                const data = response.data;
                setReview(data.category);
                
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
    },[]);
    
  return (
    <MainComponent>
      <div 
        className={`p-6 sm:p-8 mt-6 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
      >
       

        <ReviewTable 
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
