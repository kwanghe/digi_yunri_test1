import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SimulationButtonProps {
  title: string;
  description: string;
  onClick: () => void;
  isCompleted: boolean;
}

const SimulationButton: React.FC<SimulationButtonProps> = ({ title, description, onClick, isCompleted }) => (
  <button
    onClick={onClick}
    className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left group"
  >
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">{title}</h3>
          {isCompleted && (
            <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full">
              완료됨
            </span>
          )}
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </button>
);

const Simulation = () => {
  const navigate = useNavigate();
  const [completionStatus, setCompletionStatus] = useState({
    case1: false,
    case2: false,
    case3: false
  });

  useEffect(() => {
    const case1Completed = localStorage.getItem('case1_completed') === 'true';
    const case2Completed = localStorage.getItem('case2_completed') === 'true';
    const case3Completed = localStorage.getItem('case3_completed') === 'true';

    setCompletionStatus({
      case1: case1Completed,
      case2: case2Completed,
      case3: case3Completed
    });
  }, []);

  const allCasesCompleted = completionStatus.case1 && completionStatus.case2 && completionStatus.case3;

  return (
    <div className="-mt-16">
      {/* 히어로 섹션 */}
      <div 
        className="relative h-[400px] w-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://gn50.aixstudio.kr/test_image/main_img01.png)',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          width: '100vw'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              딥페이크,<br />
              이렇게 다가옵니다!
            </h1>
            <p className="text-lg text-gray-200">
              우리 아이들이 일상에서 마주칠 수 있는 3가지 대표적인 딥페이크 위험 상황,<br />
              지금 바로 체험하고 대비하세요.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">이런 상황을 체험해볼 수 있어요</h2>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  친근한 메시지로 위장한 함정
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  호기심을 자극하는 거짓 소문
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  재미를 가장한 위험한 유혹
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <SimulationButton
                title="모르는 친구의 사진 요청"
                description="SNS에서 모르는 계정이 친구인척 접근할 때"
                onClick={() => navigate('/simulation/case1')}
                isCompleted={completionStatus.case1}
              />
              <SimulationButton
                title="이상한 소문의 공포"
                description="허위 영상이 퍼지고 있다는 소식을 들었을 때"
                onClick={() => navigate('/simulation/case2')}
                isCompleted={completionStatus.case2}
              />
              <SimulationButton
                title="수상한 앱 설치 유혹"
                description="친구들이 재미있다며 권하는 앱을 받으라고 할 때"
                onClick={() => navigate('/simulation/case3')}
                isCompleted={completionStatus.case3}
              />
            </div>
          </div>

          {allCasesCompleted && (
            <div className="mt-8 text-center">
              <p className="text-lg text-blue-600 font-medium mb-4">
                모든 모의 체험을 완료하셨습니다!
              </p>
              <button
                onClick={() => navigate('/home3')}
                className="bg-[#3949E4] text-white text-[20px] font-semibold leading-[24px] tracking-[-0.5px] py-4 px-8 rounded-[12px] shadow-[4px_4px_16px_rgba(0,0,0,0.16)] hover:translate-y-[-4px] transition-all duration-300"
              >
                다음 단계로
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulation;