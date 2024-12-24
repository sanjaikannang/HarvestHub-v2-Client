import React from "react";

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageSrc, className = "" }) => {
  return (
    <div className={`border rounded shadow-md overflow-hidden ${className}`}>
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default Card;
