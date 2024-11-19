import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Award } from '../../components/icons';

const DeepfakeQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { question: "자녀가 자주 사용하는 SNS 계정을 모니터링하는 것은 불법인가요?", answer: false },
    { question: "자녀의 SNS 계정 공개 설정을 비공개로 바꾸면 딥페이크 피해를 완벽히 막을 수 있나요?", answer: false },
    { question: "자녀의 개인정보 보호를 위해서는 온라인 활동에서 실명 대신 가명을 사용하는 것이 좋나요?", answer: true },
    { question: "딥페이크 범죄 예방을 위해서는 자녀와 평소 디지털 윤리에 대해 대화하는 것이 중요한가요?", answer: true },
    { question: "자녀가 받은 합성 영상은 장난이라도 즉시 신고해야 하나요?", answer: true },
    { question: "딥페이크 범죄 예방 교육은 고학년 학생들에게만 필요한가요?", answer: false },
    { question: "자녀의 개인정보 노출을 막기 위해서는 부모의 SNS에서도 자녀 사진을 삭제해야 하나요?", answer: true },
    { question: "딥페이크 피해가 의심될 때는 증거 수집 없이 즉시 삭제하는 것이 좋나요?", answer: false },
    { question: "자녀가 딥페이크 합성물을 받았을 때 공유하지만 않으면 문제가 되지 않나요?", answer: false },
    { question: "평소 자녀와 온라인 활동에 대해 대화하는 것이 딥페이크 예방에 도움이 되나요?", answer: true }
  ];

  const handleAnswer = (userAnswer: boolean) => {
    if (questions[currentQuestion].answer === userAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResultMessage = () => {
    if (score <= 4) return {
      title: "더 많은 관심이 필요합니다",
      message: "자녀의 디지털 안전을 위해 딥페이크 예방 교육에 참여해보세요.",
      icon: "🔔"
    };
    if (score <= 7) return {
      title: "잘 알고 계시네요",
      message: "조금만 더 공부하면 완벽한 디지털 보호자가 될 수 있어요!",
      icon: "📚"
    };
    return {
      title: "축하합니다",
      message: "당신은 완벽한 디지털 안전 수호자입니다!",
      icon: "🏆"
    };
  };

  const QuizScreen = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card className="bg-white p-8 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.4)]">
        <div className="space-y-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => handleAnswer(true)}
              className="bg-[#3949E4] text-white text-[20px] font-semibold leading-[24px] tracking-[-0.5px] py-8 rounded-[12px] shadow-[4px_4px_16px_rgba(0,0,0,0.16)] hover:translate-y-[-4px] transition-all duration-300"
            >
              O
            </Button>
            <Button 
              onClick={() => handleAnswer(false)}
              className="bg-red-500 text-white text-[20px] font-semibold leading-[24px] tracking-[-0.5px] py-8 rounded-[12px] shadow-[4px_4px_16px_rgba(0,0,0,0.16)] hover:translate-y-[-4px] transition-all duration-300"
            >
              X
            </Button>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-gray-600 text-center">
              신중하게 선택해주세요. 답변은 수정할 수 없습니다.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  const ResultScreen = () => {
    const result = getResultMessage();
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
      <Card className="bg-white p-8 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.4)]">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Award className="w-16 h-16 mx-auto text-[#3949E4]" />
              <h2 className="text-3xl font-bold text-[#3949E4]">
                {result.icon} {result.title}
              </h2>
              <div className="text-5xl font-bold text-[#3949E4] my-8">
                {score} / {questions.length}점
              </div>
              <p className="text-xl text-gray-600">
                {result.message}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">다음 단계를 시작해보세요!</h3>
              <p className="text-gray-600">
                이제 실제 상황에서는 어떻게 대처해야 할까요?<br />
                모의 체험을 통해 직접 경험해보세요.
              </p>
              <Button 
                onClick={() => navigate('/home2')}
                className="bg-[#3949E4] text-white text-[20px] font-semibold leading-[24px] tracking-[-0.5px] py-4 px-8 rounded-[12px] shadow-[4px_4px_16px_rgba(0,0,0,0.16)] hover:translate-y-[-4px] transition-all duration-300"
              >
                다음 단계로
                <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>

          
          </div>
        </Card>
      </div>
    );
  };

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
              10개의 질문을 통해<br />
              나의 딥페이크 대응 능력을 확인해보세요.
            </p>
          </div>
        </div>
      </div>

      {!showResult && <QuizScreen />}
      {showResult && <ResultScreen />}
    </div>
  );
};

export default DeepfakeQuiz;