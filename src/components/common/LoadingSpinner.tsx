import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center space-x-2">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white mr-2"></div>
    </div>
);

export default LoadingSpinner;