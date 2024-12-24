import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse mx-2"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
    );
};

export default Loader;
