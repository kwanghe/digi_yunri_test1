import React from 'react';

interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
    <div
      className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);