export const stages = [
  {
    id: 1,
    title: "초기 상황",
    message: `[오후 3:42] unknown_user_123: 안녕! 나 너랑 같은 학교 다니는데, 
이번에 학교 동아리 발표회 준비하면서 작년 행사 자료가 필요해.
너희 반 단체사진이랑 동아리 활동했던 사진 좀 보내줄 수 있어?
급하게 필요한데 내일까지 자료 준비해야 해서...ㅠㅠ 

[오후 3:43] unknown_user_123: 나 학생회에서 자료 정리 담당하고 있어서 그래.
걱정마, 발표 자료에만 쓰고 바로 지울게!!`,
    situation: `모르는 계정에서 갑자기 메시지가 도착했습니다. 
계정명이 불분명하고, 학교와 동아리 관련 정보를 언급하며 접근합니다.
어떻게 대응하시겠습니까?`,
    warning: `• 모르는 계정의 갑작스러운 접근
• 학교/동아리 정보를 이미 알고 있음
• 급한 톤으로 심리적 압박
• "바로 지우겠다"는 불확실한 약속`,
    options: [
      {
        id: 'a',
        text: "일단 어떤 사진이 필요한지 구체적으로 물어보기",
        points: 0,
        feedback: "모르는 사람과의 대화는 2차 피해의 위험이 있습니다. 추가 대화는 더 많은 개인정보 노출로 이어질 수 있습니다."
      },
      {
        id: 'b',
        text: "수상한 계정 즉시 차단하고 스크린샷 남기기",
        points: 2,
        feedback: "적절한 대응입니다. 증거를 확보하고 추가 접근을 차단하는 것이 좋습니다."
      },
      {
        id: 'c',
        text: "학생회 담당 선생님께 이런 계정이 있는지 먼저 확인하기",
        points: 1,
        feedback: "신중한 접근이지만, 확인하는 동안 추가 접근이 있을 수 있습니다. 일단 차단하고 확인하는 것이 더 안전합니다."
      }
    ]
  },
  {
    id: 2,
    title: "증거 수집",
    message: "수상한 계정을 발견했습니다. 어떤 추가 조치를 취하시겠습니까?",
    situation: "향후 신고나 대응을 위해 증거를 확보해야 할 수 있습니다.",
    warning: "• 증거가 없으면 신고가 어려울 수 있음\n• 추가 피해자가 발생할 수 있음\n• 기록이 남아있어야 수사가 가능",
    options: [
      {
        id: 'a',
        text: "대화 내용과 계정 정보를 스크린샷으로 저장",
        points: 2,
        feedback: "정확한 대응입니다. 증거 확보는 추후 대응에 매우 중요합니다."
      },
      {
        id: 'b',
        text: "그냥 차단하고 무시하기",
        points: 0,
        feedback: "증거를 남기지 않으면 나중에 대응이 어려울 수 있습니다."
      },
      {
        id: 'c',
        text: "일단 친구들한테 물어보고 나서 결정하기",
        points: 1,
        feedback: "우선 증거를 확보하고 나서 주변에 알리는 것이 좋습니다."
      }
    ]
  },
  {
    id: 3,
    title: "신고 절차",
    message: "증거를 확보했습니다. 이제 어떻게 해야 할까요?",
    situation: "적절한 신고와 도움 요청이 필요한 상황입니다.",
    warning: "• 혼자 해결하기 어려운 문제입니다\n• 비슷한 피해가 확산될 수 있습니다\n• 전문가의 도움이 필요합니다",
    options: [
      {
        id: 'a',
        text: "선생님과 부모님께 알리고 상담하기",
        points: 2,
        feedback: "올바른 선택입니다. 어른들의 도움을 받아 대처하는 것이 좋습니다."
      },
      {
        id: 'b',
        text: "혼자서 해결하려고 하기",
        points: 0,
        feedback: "이런 문제는 혼자 해결하기 어렵습니다. 반드시 주변에 알리세요."
      },
      {
        id: 'c',
        text: "SNS에 이 계정이 수상하다고 공유하기",
        points: 1,
        feedback: "공개적인 공유보다는 공식적인 신고 절차를 따르는 것이 좋습니다."
      }
    ]
  }
];