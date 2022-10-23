import { Dispatch, SetStateAction, useMemo } from 'react';
import styled from '@emotion/styled';

import { checkBmiRange } from '@/utils/bmi';
import { colors } from '@/styles/colors';

interface Props {
  bmi: number;
  setIsNext: Dispatch<SetStateAction<boolean>>;
}

const Result = ({ bmi, setIsNext }: Props) => {
  const rangeText = useMemo(() => {
    return checkBmiRange(bmi);
  }, [bmi]);

  const handleClickRestart = () => {
    setIsNext(false);
  };

  return (
    <div>
      <BmiTextBox>
        <p>나의 BMI 지수</p>
        <p>
          {rangeText}({bmi})
        </p>
      </BmiTextBox>

      <RestartButton type="button" onClick={handleClickRestart}>
        다시하기
      </RestartButton>
    </div>
  );
};

const BmiTextBox = styled.div`
  margin-top: 30px;
  text-align: center;

  p:nth-of-type(1) {
    margin: 0;
    font-size: 16px;
    color: ${colors.TEXT_59};
  }

  p:nth-of-type(2) {
    margin-top: 16px;
    font-size: 18px;
    font-weight: bold;

    color: ${colors.TEXT_39};
  }
`;

const RestartButton = styled.button`
  margin-top: 60px;
  width: 100%;
  height: 46px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  color: ${colors.WHITE};
  background-color: ${colors.COFFEE_ORANGE};
  cursor: pointer;
`;

export default Result;
