import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="animate-pulse p-6 space-y-6">
            <div className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 h-8 w-1/4 rounded-lg mb-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow-lg space-y-4">
                        <div className="h-24 bg-gray-300 rounded-lg" />

                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-3/4" />
                            <div className="h-4 bg-gray-300 rounded w-1/2" />
                            <div className="h-4 bg-gray-300 rounded w-full" />
                        </div>

                        <div className="h-8 bg-gray-300 rounded w-1/3 mt-4" />
                    </div>
                ))}
            </div>
            <div className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 h-6 w-1/3 rounded-lg mt-8" />
        </div>
    );
};

export default SkeletonLoader;
