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
  Shield,
  Smartphone 
} from '../../components/icons';
import ChatBubble from '../../components/ChatBubble';
import { stages } from '../../data/simulationData3';

interface Option {
  id: string;
  text: string;
  points: number;
  riskImpact: number;
  feedback: string;
}

const Case3 = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState(100);
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
    const completionStatus = localStorage.getItem('case3_completed');
    if (completionStatus) {
      setIsCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (stage === 0 || stage === 2) {
      setVisibleMessages(0);
      const maxMessages = stage === 0 ? 5 : 4;
      const timer = setInterval(() => {
        setVisibleMessages(prev => {
          if (prev < maxMessages) {
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
      message: "야야!! 너도 이거 깔아봐ㅋㅋㅋ 완전 싱기방기야~ 지금 다들 이거 하는 중!",
      time: "오후 4:23"
    },
    {
      message: "[앱 홍보 이미지]",
      time: "오후 4:23"
    },
    {
      message: "얼굴 한 장만 올리면 AI가 분석해서 닮은 연예인 찾아주는건데, 나는 아이유랑 87% 일치했대 ㅎㅎ 너는 누구 나올지 궁금하다!",
      time: "오후 4:23"
    },
    {
      message: "여기서 다운받으면 돼! 근데 처음에 카메라랑 사진첩 접근 허용해야 하는데, 이건 얼굴 분석하려면 당연히 필요한 거라서 괜찮아~",
      time: "오후 4:24"
    },
    {
      message: "근데 빨리 해야될 걸? 이벤트라서 오늘만 무료래ㅠㅠ",
      time: "오후 4:25"
    }
  ];

  const stage3Messages = [
    {
      message: "민지야 나도 방금 깔았어! 진짜 재밌더라ㅋㅋㅋ 너무 신기해~",
      time: "오후 4:40",
      sender: "소희"
    },
    {
      message: "헐 나만 안 깔았네... 다들 하는데 나도 해볼까?",
      time: "오후 4:41",
      sender: "은지"
    },
    {
      message: "얼른 해봐!! 우리 단톡방 사람들 다 하고 있는데 너만 없어!!",
      time: "오후 4:42",
      sender: "민지"
    },
    {
      message: "나도 할래!! 같이 하자~~",
      time: "오후 4:42",
      sender: "수지"
    }
  ];

  const handleChoice = (option: Option) => {
    setScore(score + option.points);
    setRiskLevel(Math.max(0, Math.min(100, riskLevel + option.riskImpact)));
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
        localStorage.setItem('case3_completed', 'true');
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
    setRiskLevel(100);
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
                세 번째 시나리오를 성공적으로 완료했습니다.<br />
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
                  앱 안전성 진단 결과
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
                    "훌륭한 보안 의식입니다!" : 
                    "보안 의식을 좀 더 높여보세요."}
                </div>
                <div className="text-sm text-gray-600 mb-6">
                  안전 수준: {riskLevel}%
                </div>
              </motion.div>

              <motion.div 
                className="bg-blue-50 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="font-bold mb-4">안전한 앱 사용 수칙</h3>
                <ol className="space-y-3 list-decimal list-inside">
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    공식 앱스토어에서만 앱 설치하기
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    앱 리뷰와 평가 확인하기
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    필요한 권한만 허용하기
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    불필요한 개인정보 제공하지 않기
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    의심스러운 앱은 설치하지 않기
                  </motion.li>
                </ol>
              </motion.div>

              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
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
      <div className="bg-[#9bbbd4] p-4 rounded-lg space-y-2">
        <AnimatePresence mode="wait">
          {messages.slice(0, visibleMessages).map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ChatBubble
                message={msg.message}
                time={msg.time}
                delay={index * 0.5}
                className="bg-[#fef01b] text-gray-800 p-3 rounded-lg shadow-sm max-w-xs text-sm"
                timeClassName="text-xs text-[#556677]"
              />
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
  } else if (stage === 2) {
    return (
      <div className="bg-[#9bbbd4] p-4 rounded-lg space-y-2">
        <AnimatePresence mode="wait">
          {stage3Messages.slice(0, visibleMessages).map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ChatBubble
                message={msg.message}
                time={msg.time}
                delay={index * 0.5}
                className="bg-[#fef01b] text-gray-800 p-3 rounded-lg shadow-sm max-w-xs text-sm"
                timeClassName="text-xs text-[#556677]"
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {visibleMessages < stage3Messages.length && (
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
              수상한 앱 설치<br />
              유혹
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-200"
            >
              친구들이 재미있다며 권하는 앱을 받으라고 할 때,<br />
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
                <Smartphone className="w-6 h-6" />
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

            {((stage === 0 && visibleMessages === messages.length) || 
              (stage === 2 && visibleMessages === stage3Messages.length) || 
              (stage === 1)) && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <p className="text-gray-600 mb-4 whitespace-pre-line">{currentStage.situation}</p>
                    
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
                    <div className="text-sm text-gray-600 mb-1">안전 수준</div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${riskLevel}%`,
                          backgroundColor: riskLevel > 70 ? '#22c55e' : 
                                        riskLevel > 40 ? '#eab308' : 
                                        '#ef4444'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${riskLevel}%` }}
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

export default Case3;