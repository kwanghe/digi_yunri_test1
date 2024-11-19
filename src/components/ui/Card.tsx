import React, { forwardRef } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...props }, ref) => (
    <div 
      ref={ref}
      className={`rounded-xl shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', ...props }, ref) => (
    <div 
      ref={ref}
      className={`p-6 border-b border-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className = '', ...props }, ref) => (
    <h2 
      ref={ref}
      className={`text-2xl font-bold text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </h2>
  )
);

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = '', ...props }, ref) => (
    <div 
      ref={ref}
      className={`p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardContent.displayName = 'CardContent';