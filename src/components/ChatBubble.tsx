import React from 'react';
import { motion } from 'framer-motion';

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  time?: string;
  delay?: number;
    className?: string;        // className 속성 추가
  timeClassName?: string;     // timeClassName 속성 추가
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser = false, time, delay = 0 }) => {
  return (
    <motion.div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-2'}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-[#3949E4] text-white rounded-tr-none'
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}
        >
          <p className="whitespace-pre-line text-[15px]">{message}</p>
        </div>
        {time && (
          <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {time}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatBubble;