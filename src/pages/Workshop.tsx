import { useNavigate } from 'react-router-dom';

const Workshop = () => {
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
              우리 가족 맞춤형<br />
              딥페이크 안전 수칙 만들기
            </h1>
            <p className="text-lg text-gray-200">
              이제는 막연한 걱정 대신 구체적인 실천이 필요할 때<br />
              우리 가족만의 특별한 안전 수칙을 만들어보세요.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-xl font-semibold text-blue-600 mb-4">
                "우리 가족에게 꼭 필요한 안전 수칙을 골라<br />
                온라인으로 쉽고 재미있게 만드는 7가지 약속"
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">이런 분들에게 추천해요!</h2>
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
                  가족과 함께 안전 수칙을 만들고 싶으신 분
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  구체적인 실천 방안이 필요하신 분
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/workshop/create')}
              className="bg-[#3949E4] text-white text-[20px] font-semibold leading-[24px] tracking-[-0.5px] py-4 px-8 rounded-[12px] shadow-[4px_4px_16px_rgba(0,0,0,0.16)] hover:translate-y-[-4px] transition-all duration-300"
            >
              우리 가족 딥페이크 안전 7계명 만들기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshop;