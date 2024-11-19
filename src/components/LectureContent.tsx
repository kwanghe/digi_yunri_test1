import React from 'react';

interface LectureContentProps {
  title: string;
  items: string[];
}

const LectureContent: React.FC<LectureContentProps> = ({ title, items }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg border border-blue-100">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-[#3949E4] rounded-full flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
      </div>
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-start bg-white p-4 rounded-lg shadow-[4px_4px_16px_rgba(0,0,0,0.16)] hover:translate-y-[-4px] transition-all duration-300">
            <div className="flex-shrink-0 w-8 h-8 bg-[#3949E4] text-white rounded-full flex items-center justify-center text-lg font-semibold mr-4">
              {index + 1}
            </div>
            <div className="flex-grow">
              <div className="flex items-center">
                <span className="text-lg text-gray-700">{item}</span>
                {index === 0 && (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
                    NEW
                  </span>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureContent;