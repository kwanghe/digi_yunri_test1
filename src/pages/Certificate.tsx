import { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Shield } from '../components/icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = () => {
  const [guardianInfo, setGuardianInfo] = useState({
    guardianName: '',
    childNickname: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [step, setStep] = useState(1);
  const certificateRef = useRef<HTMLDivElement>(null);

  const generateCertificateNumber = () => {
    return `DFG-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  const handleSubmit = () => {
    setIsCompleted(true);
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`딥페이크_안전_수호자_인증서_${guardianInfo.guardianName}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
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
              딥페이크 안전 수호자<br />
              인증서 발급
            </h1>
            <p className="text-lg text-gray-200">
              축하합니다! 이제 당신은 우리 아이의<br />
              든든한 디지털 안전 수호자입니다.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {!isCompleted ? (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-blue-800">
                수호자 정보 입력
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <Shield className="w-12 h-12 text-blue-500 mx-auto" />
                      <p className="text-gray-600">
                        딥페이크 안전 수호자 인증을 위한 기본 정보를 입력해주세요.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">수호자 성함</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={guardianInfo.guardianName}
                          onChange={(e) => setGuardianInfo({
                            ...guardianInfo,
                            guardianName: e.target.value
                          })}
                          placeholder="이름을 입력하세요"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">자녀 예명 (별칭)</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={guardianInfo.childNickname}
                          onChange={(e) => setGuardianInfo({
                            ...guardianInfo,
                            childNickname: e.target.value
                          })}
                          placeholder="자녀의 별칭을 입력하세요"
                        />
                      </div>

                      <Button 
                        className="w-full"
                        onClick={() => setStep(2)}
                        disabled={!guardianInfo.guardianName || !guardianInfo.childNickname}
                      >
                        다음
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <Shield className="w-12 h-12 text-blue-500 mx-auto" />
                      <h2 className="text-xl font-bold">수호자 서약</h2>
                      <p className="text-gray-600">
                        아래 서약 내용을 확인하고 체크해주세요.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        "자녀의 디지털 생활에 관심을 가지고 소통하겠습니다.",
                        "딥페이크 위험성과 예방법을 지속적으로 학습하겠습니다.",
                        "자녀의 온라인 활동을 존중하고 신뢰하겠습니다.",
                        "문제 발생 시 적극적으로 도움을 제공하겠습니다.",
                        "정기적으로 온라인 안전을 점검하겠습니다."
                      ].map((pledge, index) => (
                        <label key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                          <input
                            type="checkbox"
                            className="rounded"
                          />
                          <span>{pledge}</span>
                        </label>
                      ))}
                    </div>

                    <Button 
                      className="w-full"
                      onClick={handleSubmit}
                    >
                      인증서 발급받기
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div ref={certificateRef}>
            <Card className="border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-8">
                <div className="text-center space-y-8">
                  <div className="space-y-3">
                    <Shield className="w-16 h-16 text-blue-600 mx-auto" />
                    <h1 className="text-3xl font-bold text-blue-800">
                      딥페이크 안전 수호자 인증서
                    </h1>
                    <p className="text-sm text-gray-600">No. {generateCertificateNumber()}</p>
                  </div>

                  <div className="space-y-6">
                    <div className="text-lg space-y-1">
                      <p>
                        <span className="font-bold text-blue-700">{guardianInfo.guardianName}</span> 님은
                      </p>
                      <p>
                        <span className="font-bold text-blue-700">{guardianInfo.childNickname}</span>의
                      </p>
                      <p className="font-medium">
                        딥페이크 안전 수호자로 임명되었습니다.
                      </p>
                    </div>

                    <div className="text-sm text-gray-600 space-y-2">
                      <p>임명일: {guardianInfo.date}</p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-blue-200">
                    <Button 
                      className="w-full"
                      onClick={downloadCertificate}
                    >
                      인증서 저장하기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificate;