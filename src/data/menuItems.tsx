import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: 'home',
    title: (
      <> 
        <span className="text-base font-semibold block">홈</span>
      </>
    ),
    mobile_title: '딥페이크프리 홈',
    path: '/',
    description: '전체 학습 개요와 학습 순서 안내',
    step: 0,
  },
  {
    id: 'safety-test',
    title: (
      <>
        <span className="text-base font-semibold block">OX퀴즈</span>
      </>
    ),
    mobile_title: '딥페이크프리 OX퀴즈',
    path: '/safety-test',
    description: '나의 딥페이크 대응 능력 테스트',
    step: 1,
  },
  {
    id: 'simulation',
    title: (
      <>
        <span className="text-base font-semibol block">모의 체험</span>
      </>
    ),
    mobile_title: '딥페이크프리 모의 체험',
    path: '/simulation',
    description: '실제 상황을 가정한 대응 훈련',
    step: 2,
  },
  {
    id: 'workshop',
    title: (
      <>
        <span className="text-base font-semibold block">실천 워크샵</span>
      </>
    ),
    mobile_title: '딥페이크프리 실천 워크샵',
    path: '/workshop',
    description: '나만의 안전 수칙 만들기',
    step: 3,
  },
  {
    id: 'certificate',
    title: (
      <>
        <span className="text-base font-semibold block">인증서 발급</span>
      </>
    ),
    mobile_title: '딥페이크프리 인증서 발급'
,
    path: '/certificate',
    description: '학습 완료 인증서 발급',
    step: 4,
  }
];