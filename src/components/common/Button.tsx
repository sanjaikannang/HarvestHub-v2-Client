import React from 'react';

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  children,
  className = ""
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`bg-harvest-secondary hover:bg-harvest-primary hover:scale-105 duration-300 text-harvest-offwhite font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
);