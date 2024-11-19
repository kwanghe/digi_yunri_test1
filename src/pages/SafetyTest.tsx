import { useNavigate } from 'react-router-dom';

const SafetyTest = () => {
  const navigate = useNavigate();

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
              딥페이크 안전지수<br />
              OX 퀴즈
            </h1>
            <p className="text-lg text-gray-200">
              딥페이크와 사이버 범죄가 우리 일상에 가까이 다가오고 있습니다.<br />
              부모로서 자녀의 안전을 어떻게 지킬 수 있을까요?
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-xl font-semibold text-blue-600 mb-4">
                "이제는 막연한 걱정 대신 구체적인 실천이 필요할 때"
              </p>
              <p className="text-gray-700 leading-relaxed">
                이 간단한 OX퀴즈를 통해 딥페이크의 위험성과 예방 방법을 가볍게 점검해보세요!
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">이런 분들을 위한 테스트예요!</h2>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  자녀의 온라인 활동이 걱정되시는 부모님
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  디지털 안전에 관심이 있으신 분
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  자녀의 디지털 생활을 이해하고 싶으신 분
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/safety-test/questions')}
              className="bg-[#3949E4] text-white text-[20px] font-semibold leading-[24px] tracking-[-0.5px] py-4 px-8 rounded-[12px] shadow-[4px_4px_16px_rgba(0,0,0,0.16)] hover:translate-y-[-4px] transition-all duration-300"
            >
              OX 퀴즈 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTest;