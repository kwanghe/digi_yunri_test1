import React from 'react';
import { Link } from 'react-router-dom';

interface HomeButtonProps {
  to: string;
  title: React.ReactNode;
  description: string;
  step: number;
  mobile_title: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ to, mobile_title, description, step }) => {
  return (
    <Link
      to={to}
      className="block p-6 bg-[#3949E4] shadow-[4px_4px_16px_rgba(0,0,0,0.16)] rounded-[12px] hover:translate-y-[-4px] transition-all duration-300 flex justify-between items-center"
    >
  <div className="flex-1 whitespace-nowrap overflow-hidden">
<h3 className="flex items-center text-[20px] font-semibold text-white leading-[24px] tracking-[-0.5px] mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
  <span className="mr-2">Step{step}. {mobile_title}</span>
</h3>
  <p className="text-[16px] font-normal text-white leading-[24px] tracking-[-0.4px]">{description}</p>
</div>
      
      {/* 항상 오른쪽 끝에 흰색 아이콘 표시 */}
      <svg 
        className="w-5 h-5 text-white" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};
export default HomeButton;