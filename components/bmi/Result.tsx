import { Dispatch, SetStateAction, useMemo } from 'react';
import Image from 'next/future/image';
import styled from '@emotion/styled';

import { checkBmiRange } from '@/utils/bmi';
import { BMI_COLOR_LIST } from '@/constant';
import { colors } from '@/styles/colors';

import HealthImage from '@/assets/image/health.png';

interface Props {
  bmi: number;
  setIsNext: Dispatch<SetStateAction<boolean>>;
}

const Result = ({ bmi, setIsNext }: Props) => {
  const rangeArray = checkBmiRange(bmi);
  const BMI_VALUES = [0, 18.5, 23, 25, 30, 35];

  const handleClickRestart = () => {
    setIsNext(false);
  };

  return (
    <div>
      <BmiImage src={HealthImage} alt="bmi-result" />
      <BmiTextBox>
        <p>나의 BMI 지수</p>
        <p>
          {rangeArray.name}({bmi})
        </p>
      </BmiTextBox>

      <ColorList>
        {BMI_VALUES.map((value, index) => {
          return (
            <ColorItem key={value} colorCode={index + 1} activeCode={rangeArray.id}>
              {value}
            </ColorItem>
          );
        })}
      </ColorList>

      <RestartButton type="button" onClick={handleClickRestart}>
        다시하기
      </RestartButton>
    </div>
  );
};

const BmiImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

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

const ColorList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

interface ColorItemProps {
  colorCode: number;
  activeCode: number;
}

const ColorItem = styled.li<ColorItemProps>`
  width: 50px;
  height: 14px;
  padding: 2px 4px;
  font-size: 12px;
  color: ${(props) => (props.colorCode === props.activeCode ? colors.WHITE : colors.TEXT_59)};
  background-color: ${(props) =>
    props.colorCode === props.activeCode ? BMI_COLOR_LIST[props.colorCode] : BMI_COLOR_LIST[0]};

  & + & {
    margin-left: 2px;
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
