export const stages = [
  {
    id: 1,
    title: "이상한 소문",
    message: `[오후 2:15] 친구: 야... 너 지금 톡 받은 거 봤어?
단톡방에서 너 얘기가 돌고 있는데... 

[오후 2:16] 친구: 누가 니 얼굴이 들어간 영상을 만들었다고... 
근데 그게 이상한 영상이래. 지금 다른 단톡방으로도 퍼지고 있대.

[오후 2:16] 친구: 얼른 확인해봐. 나도 아직 안 봤는데, 
다들 너라고 하면서 공유하고 있어.`,
    situation: `친한 친구가 갑자기 수상한 영상에 대해 알려왔습니다.
영상이 여러 단톡방에 공유되고 있다고 합니다.
어떻게 대응하시겠습니까?`,
    warning: `• 허위 영상이 빠르게 퍼지고 있음
• 여러 단톡방으로 확산 중
• 영상 확인 유도 상황
• 실제 피해로 이어질 수 있는 상황`,
    options: [
      {
        id: 'a',
        text: "당장 단톡방에 들어가서 영상 확인하기",
        points: 0,
        mentalHealthImpact: -30,
        feedback: "영상을 직접 확인하는 것은 심리적 충격을 줄 수 있으며, 증거 수집에도 도움이 되지 않습니다."
      },
      {
        id: 'b',
        text: "침착하게 친구에게 자세한 상황 파악하기",
        points: 2,
        mentalHealthImpact: -10,
        feedback: "정확한 상황 파악이 우선입니다. 침착하게 대응하는 것이 좋습니다."
      },
      {
        id: 'c',
        text: "무시하고 단톡방 나가기",
        points: 0,
        mentalHealthImpact: -20,
        feedback: "상황을 회피하면 피해가 더 확산될 수 있습니다. 적극적인 대응이 필요합니다."
      }
    ]
  },
  {
    id: 2,
    title: "도움 요청",
    message: "상황이 심각해 보입니다. 누구에게 도움을 요청해야 할까요?",
    situation: "빠른 대응을 위해 도움이 필요한 상황입니다.",
    warning: `• 혼자 해결하기 어려운 상황
• 전문가의 도움이 필요
• 빠른 대응이 중요`,
    options: [
      {
        id: 'a',
        text: "부모님께 즉시 알리고 상황 설명하기",
        points: 2,
        mentalHealthImpact: 20,
        feedback: "가장 적절한 선택입니다. 부모님의 도움을 받아 체계적으로 대응할 수 있습니다."
      },
      {
        id: 'b',
        text: "친구들과 의논하면서 해결책 찾기",
        points: 1,
        mentalHealthImpact: -10,
        feedback: "친구들의 지지도 중요하지만, 성인의 도움이 반드시 필요한 상황입니다."
      },
      {
        id: 'c',
        text: "혼자서 해결하려고 노력하기",
        points: 0,
        mentalHealthImpact: -30,
        feedback: "이런 상황은 혼자 해결하기 매우 어렵습니다. 반드시 주변의 도움을 받으세요."
      }
    ]
  },
  {
    id: 3,
    title: "공식적인 대응",
    message: "부모님과 상의 후, 어떤 조치를 취해야 할까요?",
    situation: "피해 확산을 막기 위한 공식적인 대응이 필요합니다.",
    warning: `• 증거 수집이 중요한 시점
• 법적 대응 필요 가능성
• 2차 피해 예방 필요`,
    options: [
      {
        id: 'a',
        text: "디지털성범죄피해자지원센터에 상담 요청",
        points: 2,
        mentalHealthImpact: 10,
        feedback: "전문기관의 도움을 받는 것이 가장 효과적입니다."
      },
      {
        id: 'b',
        text: "학교 선생님께 알리고 조치 요청",
        points: 2,
        mentalHealthImpact: 10,
        feedback: "학교 차원의 대응도 매우 중요합니다."
      },
      {
        id: 'c',
        text: "해당 영상 신고하고 삭제 요청하기",
        points: 1,
        mentalHealthImpact: 0,
        feedback: "영상 삭제도 중요하지만, 전문가의 도움을 받아 체계적으로 대응해야 합니다."
      }
    ]
  }
];