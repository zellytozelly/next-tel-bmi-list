export const checkBmiRange = (bmi: number) => {
  const bmiRangeList = [
    { id: 1, name: '저체중' },
    { id: 2, name: '정상' },
    { id: 3, name: '과체중' },
    { id: 4, name: '경도 비만' },
    { id: 5, name: '중등도 비만' },
    { id: 6, name: '고도 비만' },
  ];

  if (bmi >= 0 && bmi <= 18.4) return bmiRangeList[0];
  if (bmi <= 22.9) return bmiRangeList[1];
  if (bmi <= 24.9) return bmiRangeList[2];
  if (bmi <= 29.9) return bmiRangeList[3];
  if (bmi <= 34.9) return bmiRangeList[4];
  return bmiRangeList[5];
};
