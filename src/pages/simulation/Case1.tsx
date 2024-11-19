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
import { stages } from '../../data/simulationData';

const Case1 = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [visibleMessages, showResults, selectedAnswer]); // 상태가 변경될 때마다 실행

  useEffect(() => {
    const completionStatus = localStorage.getItem('case1_completed');
    if (completionStatus) {
      setIsCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (stage === 0) {
      setVisibleMessages(0);
      const timer = setInterval(() => {
        setVisibleMessages(prev => {
          if (prev < 2) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 1500);

      return () => clearInterval(timer);
    }
  }, [stage]);

  const messages = [
    {
      message: "안녕! 나 너랑 같은 학교 다니는데, 이번에 학교 동아리 발표회 준비하면서 작년 행사 자료가 필요해. 너희 반 단체사진이랑 동아리 활동했던 사진 좀 보내줄 수 있어?",
      time: "오후 3:42", isUser: false
    },
    {
      message: "나 학생회에서 자료 정리 담당하고 있어서 그래. 걱정마, 발표 자료에만 쓰고 바로 지울게!!",
      time: "오후 3:43", isUser: false
    }
  ];

  const handleChoice = (option: any) => {
    setScore(score + option.points);
    setSelectedAnswer(option);
    
    setTimeout(() => {
      setScore(score + option.points);
      if (stage < stages.length - 1) {
        setStage(stage + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
        localStorage.setItem('case1_completed', 'true');
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
                첫 번째 시나리오를 성공적으로 완료했습니다.<br />
                결과를 확인하고 다음 단계로 진행해보세요.
              </motion.p>
            </div>
          </motion.div>
        </div>

      <div className="max-w-2xl mx-auto px-4 py-8"  ref={contentRef}>
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
              <div className="text-lg mb-6">
                {score >= maxScore * 0.8 ? 
                  "훌륭한 대처였습니다!" : 
                  "아쉬운 부분이 있네요. 다시 한번 연습해보세요."}
              </div>
            </motion.div>

            <motion.div 
              className="bg-blue-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="font-bold mb-4">올바른 대처 순서</h3>
              <ol className="space-y-3 list-decimal list-inside">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  수상한 메시지 발견 시 즉시 차단
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  대화 내용과 계정 정보 스크린샷 저장
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  부모님/선생님께 즉시 알리기
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  전문기관에 신고하기
                </motion.li>
              </ol>
            </motion.div>

            <motion.div 
              className="bg-yellow-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="font-bold mb-4">주요 예방 수칙</h3>
              <ul className="space-y-3">
                {[
                  "모르는 계정의 메시지는 신중하게 대응",
                  "개인 사진 공유 요청은 반드시 거절",
                  "수상한 상황은 반드시 주변에 알리기"
                ].map((tip, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
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
      <div className="bg-[#9bbbd4] p-4 rounded-lg space-y-4" ref={contentRef} style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
      <div className={`max-w-[80%] ${msg.isUser ? 'order-1' : 'order-2'}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            msg.isUser
              ? 'bg-[#3949E4] text-white rounded-tr-none'
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}
        >
          <p className="whitespace-pre-line text-[15px]">{msg.message}</p>
        </div>
        {msg.time && (
          <span className={`text-xs text-[#556677] mt-1 ${msg.isUser ? 'text-right' : 'text-left'}`}>
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
              모르는 친구의<br />
              사진 요청
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-200"
            >
              SNS에서 모르는 계정이 친구인척 접근할 때,<br />
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

                <div className="grid gap-4">
                  {currentStage.options.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
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

export default Case1;