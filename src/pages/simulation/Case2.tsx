import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  MessageCircle, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  Shield 
} from '../../components/icons';
import { stages } from '../../data/simulationData2';

interface Option {
  id: string;
  text: string;
  points: number;
  mentalHealthImpact: number;
  feedback: string;
}

const Case2 = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const [mentalHealth, setMentalHealth] = useState(100);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<Option | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [visibleMessages, showResults, selectedAnswer]); // 상태가 변경될 때마다 실행

  useEffect(() => {
    const completionStatus = localStorage.getItem('case2_completed');
    if (completionStatus) {
      setIsCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (stage === 0) {
      setVisibleMessages(0);
      const timer = setInterval(() => {
        setVisibleMessages(prev => {
          if (prev < 3) {
            if (contentRef.current) {
              contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 1500);

      return () => clearInterval(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (selectedAnswer && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [selectedAnswer]);

  const messages = [
    {
      message: "야... 너 지금 톡 받은 거 봤어? 단톡방에서 너 얘기가 돌고 있는데...",
      time: "오후 2:15", isUser: false
    },
    {
      message: "누가 니 얼굴이 들어간 영상을 만들었다고... 근데 그게 이상한 영상이래. 지금 다른 단톡방으로도 퍼지고 있대.",
      time: "오후 2:16", isUser: false
    },
    {
      message: "얼른 확인해봐. 나도 아직 안 봤는데, 다들 너라고 하면서 공유하고 있어.",
      time: "오후 2:16", isUser: false
    }
  ];

  const handleChoice = (option: Option) => {
    setScore(score + option.points);
    setMentalHealth(Math.max(0, Math.min(100, mentalHealth + option.mentalHealthImpact)));
    setSelectedAnswer(option);
    
    setTimeout(() => {
      if (stage < stages.length - 1) {
        setStage(stage + 1);
        setSelectedAnswer(null);
        if (contentRef.current) {
          contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      } else {
        setShowResults(true);
        localStorage.setItem('case2_completed', 'true');
        setIsCompleted(true);
      }
    }, 1500);
  };

  const handleReturn = () => {
    navigate('/simulation');
  };

  const restartGame = () => {
    setStage(0);
    setScore(0);
    setMentalHealth(100);
    setShowResults(false);
    setSelectedAnswer(null);
    setVisibleMessages(0);
  };

  if (showResults) {
    const maxScore = stages.reduce((acc, stage) => 
      acc + Math.max(...stage.options.map(o => o.points)), 0);
    
    return (
      <div className="-mt-16">
        {/* 히어로 섹션 */}
        <div 
          className="relative h-[250px] w-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://gn50.aixstudio.kr/test_image/main_img01.png)',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            width: '100vw'
          }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40 flex items-center justify-center"
          >
            <div className="max-w-4xl mx-auto px-4 text-center text-white space-y-6">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold leading-tight"
              >
                모의 체험 완료!
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-200"
              >
                두 번째 시나리오를 성공적으로 완료했습니다.<br />
                결과를 확인하고 다음 단계로 진행해보세요.
              </motion.p>
            </div>
          </motion.div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  대응 결과 분석
                </motion.span>
                {isCompleted && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full"
                  >
                    완료됨
                  </motion.span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Shield className="w-16 h-16 mx-auto text-[#3949E4] mb-4" />
                <div className="text-4xl font-bold mb-4 text-[#3949E4]">
                  {score} / {maxScore}점
                </div>
                <div className="text-lg mb-2">
                  {score >= maxScore * 0.8 ? 
                    "훌륭한 대처였습니다!" : 
                    "아쉬운 부분이 있네요. 다시 한번 연습해보세요."}
                </div>
                <div className="text-sm text-gray-600 mb-6">
                  심리 상태: {mentalHealth}%
                </div>
              </motion.div>

              <motion.div 
                className="bg-blue-50 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="font-bold mb-4">디지털 성범죄 피해 대응 방법</h3>
                <ol className="space-y-3 list-decimal list-inside">
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    침착하게 상황 파악하기
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    부모님께 즉시 알리기
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    영상을 직접 보거나 저장하지 않기
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    전문기관에 도움 요청하기
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    학교에 상황 알리기
                  </motion.li>
                </ol>
              </motion.div>

              <motion.div 
                className="bg-yellow-50 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="font-bold mb-4">긴급 연락처</h3>
                <ul className="space-y-2 text-sm">
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    디지털성범죄피해자지원센터: 02-735-8994
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    경찰청 사이버안전국: 182
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    학교폭력신고: 117
                  </motion.li>
                </ul>
              </motion.div>

              <motion.div 
                className="bg-red-50 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h3 className="font-bold mb-4">주의사항</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "해당 영상을 직접 보거나 저장하지 마세요",
                    "영상을 공유하는 행위도 범죄가 될 수 있습니다",
                    "혼자 해결하려 하지 말고 반드시 도움을 요청하세요",
                    "증거 수집은 전문가의 도움을 받으세요"
                  ].map((warning, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                    >
                      • {warning}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <Button 
                  onClick={restartGame} 
                  variant="outline" 
                  className="flex-1 border-[#3949E4] text-[#3949E4] hover:bg-[#3949E4] hover:text-white"
                >
                  다시 연습하기
                </Button>
                <Button 
                  onClick={handleReturn} 
                  className="flex-1 bg-[#3949E4] hover:bg-[#2838D3]"
                >
                  목록으로 돌아가기
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentStage = stages[stage];

  const renderChatMessages = () => {
    if (stage === 0) {
      return (
      <div className="bg-[#9bbbd4] p-4 rounded-lg space-y-4">
       <AnimatePresence mode="wait">
  {messages.slice(0, visibleMessages).map((msg, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {/* 말풍선과 시간 */}
      <div className="flex flex-col items-start space-y-1 max-w-[80%]">
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            msg.isUser
              ? 'bg-[#3949E4] text-white rounded-tr-none' // 사용자 메시지 스타일
              : 'bg-gray-100 text-gray-800 rounded-tl-none' // 비사용자 메시지 스타일
          }`}
        >
          <p className="whitespace-pre-line text-[15px]">{msg.message}</p>
        </div>
        {msg.time && (
          <span
            className={`text-xs text-gray-500 mt-1 ${msg.isUser ? 'text-right' : 'text-left'}`}
          >
            {msg.time}
          </span>
        )}
      </div>
    </motion.div>
  ))}
</AnimatePresence>
          {visibleMessages < messages.length && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
        </div>
      );
    }
    return (
      <motion.div 
        className="bg-gray-50 p-4 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start gap-3">
          <MessageCircle className="w-5 h-5 mt-1" />
          <p className="text-gray-600 whitespace-pre-line">{currentStage.message}</p>
        </div>
      </motion.div>
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
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40 flex items-center justify-center"
        >
          <div className="max-w-4xl mx-auto px-4 text-center text-white space-y-6">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              이상한 소문의<br />
              공포
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-200"
            >
              허위 영상이 퍼지고 있다는 소식을 들었을 때,<br />
              어떻게 대처해야 할까요?
            </motion.p>
          </div>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8" ref={contentRef}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                <motion.span
                  key={stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {currentStage.title} ({stage + 1}/{stages.length})
                </motion.span>
              </div>
              {isCompleted && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full"
                >
                  완료됨
                </motion.span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderChatMessages()}

            {visibleMessages === messages.length && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <p className="text-gray-600 mb-4">{currentStage.situation}</p>
                    
                    <motion.div 
                      className="flex items-start bg-red-50 p-4 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-1" />
                      <p className="text-red-700 whitespace-pre-line">{currentStage.warning}</p>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="bg-gray-100 p-3 rounded-lg text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-sm text-gray-600 mb-1">심리 상태</div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${mentalHealth}%`,
                          backgroundColor: mentalHealth > 70 ? '#22c55e' : 
                                        mentalHealth > 40 ? '#eab308' : 
                                        '#ef4444'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${mentalHealth}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>

                  <div className="grid gap-4">
                    {currentStage.options.map((option, index) => (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                      >
                        <Button
                          variant="outline"
                          className={`w-full p-4 h-auto text-left flex items-center justify-between border-2 ${
                            selectedAnswer?.id === option.id ? (
                              option.points === 2 ? 'border-green-500 bg-green-50' : 
                              option.points === 1 ? 'border-yellow-500 bg-yellow-50' :
                              'border-red-500 bg-red-50'
                            ) : 'border-[#3949E4] hover:bg-[#3949E4] hover:text-white'
                          }`}
                          onClick={() => !selectedAnswer && handleChoice(option)}
                          disabled={selectedAnswer !== null}
                        >
                          <span>{option.text}</span>
                          {selectedAnswer?.id === option.id && (
                            option.points === 2 ? <CheckCircle2 className="w-5 h-5 text-green-500 ml-2" /> :
                            option.points === 1 ? <AlertCircle className="w-5 h-5 text-yellow-500 ml-2" /> :
                            <XCircle className="w-5 h-5 text-red-500 ml-2" />
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  {selectedAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        selectedAnswer.points === 2 ? 'bg-green-50 text-green-700' : 
                        selectedAnswer.points === 1 ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}
                    >
                      {selectedAnswer.feedback}
                    </motion.div>
                  )}

                  <motion.div 
                    className="mt-4 text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-sm text-gray-600">현재 점수: {score}</p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Case2;