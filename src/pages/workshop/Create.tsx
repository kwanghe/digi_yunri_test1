import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Progress } from '../../components/ui/Progress';
import { Plus, Shield, Heart, Lock } from '../../components/icons';

interface Rule {
  id: string;
  category: string;
  rule: string;
  icon: string;
  isCustom?: boolean;
}

interface SavedRule {
  text: string;
  icon: string;
}

const DeepfakeSafetyGame = () => {
  const navigate = useNavigate();
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [step, setStep] = useState('selection');
  const [customRules, setCustomRules] = useState<Rule[]>([]);
  const [newRuleInput, setNewRuleInput] = useState('');

  useEffect(() => {
    const savedRules = localStorage.getItem('safety_rules');
    if (savedRules) {
      setSelectedRules(JSON.parse(savedRules));
    }
  }, []);

  const safetyRules: Rule[] = [
    // 개인정보 보호 관련
    { id: '1', category: "개인정보", rule: "얼굴 사진은 꼭 필요한 경우에만 SNS에 공유하기", icon: "🤳" },
    { id: '2', category: "개인정보", rule: "프로필 사진은 실제 얼굴 대신 아바타 사용하기", icon: "👤" },
    { id: '3', category: "개인정보", rule: "SNS 계정은 비공개로 설정하기", icon: "🔒" },
    
    // 미디어 리터러시 관련
    { id: '4', category: "미디어", rule: "영상의 진위 여부를 항상 의심하고 확인하기", icon: "🔍" },
    { id: '5', category: "미디어", rule: "수상한 영상은 즉시 신고하기", icon: "⚠️" },
    { id: '6', category: "미디어", rule: "출처가 불분명한 영상 공유하지 않기", icon: "🚫" },
    
    // 앱 사용 관련
    { id: '7', category: "앱사용", rule: "얼굴 합성 앱은 신중하게 선택하여 사용하기", icon: "📱" },
    { id: '8', category: "앱사용", rule: "앱 권한 설정 시 꼭 필요한 것만 허용하기", icon: "⚙️" },
    { id: '9', category: "앱사용", rule: "무료 AI 합성 앱 함부로 사용하지 않기", icon: "🤖" },
    
    // 소통 관련
    { id: '10', category: "소통", rule: "모르는 사람과의 영상통화 거절하기", icon: "📞" },
    { id: '11', category: "소통", rule: "수상한 메시지나 링크 무시하기", icon: "✉️" },
    { id: '12', category: "소통", rule: "온라인에서 알게 된 사람 조심하기", icon: "🤝" },
    
    // 가족 협력 관련
    { id: '13', category: "가족", rule: "가족과 주기적으로 안전 대화 나누기", icon: "💕" },
    { id: '14', category: "가족", rule: "자녀의 SNS 활동에 관심 가지기", icon: "👨‍👩‍👧‍👦" },
    { id: '15', category: "가족", rule: "가족 간 비상연락망 공유하기", icon: "📱" },
    
    // 예방 관련
    { id: '16', category: "예방", rule: "정기적으로 계정 비밀번호 변경하기", icon: "🔑" },
    { id: '17', category: "예방", rule: "2단계 인증 설정하기", icon: "🔐" },
    { id: '18', category: "예방", rule: "수상한 활동 발견 시 즉시 가족에게 알리기", icon: "🚨" },
    
    // 대응 관련
    { id: '19', category: "대응", rule: "피해 발생 시 증거 수집하고 신고하기", icon: "📝" },
    { id: '20', category: "대응", rule: "전문가 도움 받을 수 있는 연락처 보관하기", icon: "☎️" },
    { id: '21', category: "대응", rule: "피해 발생 시 대처 방법 숙지하기", icon: "✅" }
  ];

  const handleAddCustomRule = () => {
    if (newRuleInput.trim()) {
      const newRule: Rule = {
        id: `custom-${customRules.length + 1}`,
        category: "사용자정의",
        rule: newRuleInput.trim(),
        icon: "✨",
        isCustom: true
      };
      setCustomRules([...customRules, newRule]);
      setNewRuleInput('');
    }
  };

  const handleRuleSelection = (ruleId: string) => {
    if (selectedRules.includes(ruleId)) {
      const newRules = selectedRules.filter(id => id !== ruleId);
      setSelectedRules(newRules);
      localStorage.setItem('safety_rules', JSON.stringify(newRules));
    } else if (selectedRules.length < 7) {
      const newRules = [...selectedRules, ruleId];
      setSelectedRules(newRules);
      localStorage.setItem('safety_rules', JSON.stringify(newRules));
    }
  };

  const saveCompletedRules = () => {
    const completedRules: SavedRule[] = selectedRules.map(ruleId => {
      const rule = safetyRules.find(r => r.id === ruleId) || 
                  customRules.find(r => r.id === ruleId);
      return {
        text: rule?.rule || '',
        icon: rule?.icon || ''
      };
    });
    localStorage.setItem('completed_safety_rules', JSON.stringify(completedRules));
  };

  const handleComplete = () => {
    saveCompletedRules();
    navigate('/home4');
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
              우리 가족 맞춤형<br />
              딥페이크 안전 7계명
            </h1>
            <p className="text-lg text-gray-200">
              우리 가족에게 꼭 필요한 안전 수칙을 선택하고<br />
              나만의 특별한 안전 수칙도 추가해보세요.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {step === 'selection' ? (
          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-gray-800">
                7가지 안전 수칙을 선택해주세요
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-gray-600">{selectedRules.length}/7 선택됨</p>
                  <Progress value={(selectedRules.length / 7) * 100} className="w-full mt-2" />
                </div>

                {["개인정보", "미디어", "앱사용", "소통", "가족", "예방", "대응"].map(category => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
                    <div className="grid gap-3">
                      {safetyRules
                        .filter(rule => rule.category === category)
                        .map(rule => (
                          <Button
                            key={rule.id}
                            variant={selectedRules.includes(rule.id) ? "default" : "outline"}
                            className={`w-full justify-start gap-2 ${
                              selectedRules.includes(rule.id) ? "bg-[#3949E4] text-white" : "bg-white text-gray-700"
                            }`}
                            onClick={() => handleRuleSelection(rule.id)}
                            disabled={!selectedRules.includes(rule.id) && selectedRules.length >= 7}
                          >
                            <span>{rule.icon}</span>
                            {rule.rule}
                          </Button>
                        ))}
                    </div>
                  </div>
                ))}

                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">나만의 안전 수칙 추가하기</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="새로운 안전 수칙을 입력하세요"
                      value={newRuleInput}
                      onChange={(e) => setNewRuleInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleAddCustomRule} 
                      disabled={!newRuleInput.trim()}
                      className="bg-[#3949E4]"
                    >
                      <Plus className="w-4 h-4" />
                      추가
                    </Button>
                  </div>
                </div>

                {customRules.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">추가된 안전 수칙</h3>
                    <div className="grid gap-3">
                      {customRules.map(rule => (
                        <Button
                          key={rule.id}
                          variant={selectedRules.includes(rule.id) ? "default" : "outline"}
                          className={`w-full justify-start gap-2 ${
                            selectedRules.includes(rule.id) ? "bg-[#3949E4] text-white" : "bg-white text-gray-700"
                          }`}
                          onClick={() => handleRuleSelection(rule.id)}
                          disabled={!selectedRules.includes(rule.id) && selectedRules.length >= 7}
                        >
                          <span>{rule.icon}</span>
                          {rule.rule}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRules.length === 7 && (
                  <Button 
                    className="w-full bg-[#3949E4] text-white text-[20px] font-semibold leading-[24px] tracking-[-0.5px] py-4 rounded-[12px] shadow-[4px_4px_16px_rgba(0,0,0,0.16)] hover:translate-y-[-4px] transition-all duration-300"
                    onClick={() => setStep('final')}
                  >
                    7계명 완성하기
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-gray-800">
                우리가족 딥페이크 안전 7계명
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                {selectedRules.map((ruleId, index) => {
                  const rule = safetyRules.find(r => r.id === ruleId) || 
                            customRules.find(r => r.id === ruleId);
                  return rule ? (
                    <div key={rule.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                      <div className="w-8 h-8 bg-[#3949E4] text-white rounded-full flex items-center justify-center text-lg font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{rule.icon}</span>
                        <span className="text-gray-800">{rule.rule}</span>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>

              <Button 
                className="w-full bg-[#3949E4] text-white text-[20px] font-semibold leading-[24px] tracking-[-0.5px] py-4 rounded-[12px] shadow-[4px_4px_16px_rgba(0,0,0,0.16)] hover:translate-y-[-4px] transition-all duration-300"
                onClick={handleComplete}
              >
                다음 단계로
              </Button>

              <div className="flex justify-center gap-4">
                <Shield className="text-[#3949E4] w-8 h-8" />
                <Heart className="text-red-500 w-8 h-8" />
                <Lock className="text-green-500 w-8 h-8" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DeepfakeSafetyGame;