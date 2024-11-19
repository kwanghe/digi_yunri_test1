import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ children, className = '' }) => (
  <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children, className = '' }) => (
  <div className={`text-blue-700 ${className}`}>
    {children}
  </div>
);