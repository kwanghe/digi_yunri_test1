import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default', 
  className = '',
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-[12px] font-semibold transition-all duration-200 shadow-[4px_4px_16px_rgba(0,0,0,0.16)]";
  const variants = {
    default: "bg-[#3949E4] text-white hover:translate-y-[-4px]",
    outline: "border-2 border-[#3949E4] text-[#3949E4] hover:bg-[#3949E4] hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};