import React from 'react';

interface NewsCardProps {
  date: string;
  title: string;
  source: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ date, title, source }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500 hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-400 mb-2">{date}   {source}</p>
      <h3 className="text-gray-800 font-medium mb-1">{title}</h3>
    </div>
  );
};

export default NewsCard;