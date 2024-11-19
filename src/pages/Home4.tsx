import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: 'https://gn50.aixstudio.kr/test_image/main_img01.png',
    title: '',
    description: ''
  },
  {
    id: 2,
    image: 'https://gn50.aixstudio.kr/test_ppt1/14.PNG',
    title: '',
    description: ''
  },
  // 필요한 만큼 슬라이드 추가
];

const Home4: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      // 마지막 슬라이드에서 simulation으로 이동
      navigate('/certificate');
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full relative flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            <img 
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="h-full w-full object-contain"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-[10%]">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 md:mb-6 whitespace-pre-line text-white">
                {slides[currentSlide].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl whitespace-pre-line text-white">
                {slides[currentSlide].description}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-4 sm:right-6 md:right-8 lg:right-10 
                       bg-blue-600 hover:bg-blue-700 text-white 
                       px-4 sm:px-5 md:px-6 
                       py-2 sm:py-2.5 md:py-3 
                       rounded-full transition-all shadow-lg 
                       text-base sm:text-lg md:text-xl lg:text-2xl font-medium"
            >
              {currentSlide === slides.length - 1 ? '학습 시작하기' : '다음'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Home4;