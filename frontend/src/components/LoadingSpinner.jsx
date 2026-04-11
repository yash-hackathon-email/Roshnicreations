import React from 'react';

const LoadingSpinner = ({ size = 'md', message }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-amber-500 ${sizeClasses[size]}`}></div>
      {message && <p className="text-gray-500 font-medium">{message}</p>}
    </div>
  );
};
export default LoadingSpinner;
