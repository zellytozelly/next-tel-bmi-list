export const checkBmiRange = (bmi: number) => {
  const bmiRangeList = ['저체중', '정상', '과체중', '경도 비만', '중등도 비만', '고도 비만'];
  if (bmi < 0) return;

  if (bmi <= 18.4) return bmiRangeList[0];
  else if (bmi <= 22.9) return bmiRangeList[1];
  else if (bmi <= 24.9) return bmiRangeList[2];
  else if (bmi <= 29.9) return bmiRangeList[3];
  else if (bmi <= 34.9) return bmiRangeList[4];
  else return bmiRangeList[5];
};
