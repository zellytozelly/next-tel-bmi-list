import { colors } from '@/styles/colors';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { memo } from 'react';

const SPINNER_COUNT = 12;

const Spinner = () => {
  return (
    <SpinnerBox>
      {Array.from({ length: SPINNER_COUNT }, (empty, i) => (
        <Circle key={`circle_${i}`} index={i} />
      ))}
    </SpinnerBox>
  );
};

const circleFadeDelayKeyframes = keyframes`
  0% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const SpinnerBox = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
`;

interface CircleProps {
  index: number;
}

const Circle = styled.span<CircleProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  &:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: ${colors.COFFEE_ORANGE};
    border-radius: 100%;
    animation: ${circleFadeDelayKeyframes} 1.2s infinite ease-in-out both;
  }

  ${({ index }) =>
    index !== 0 &&
    css`
      transform: rotate(${30 * index}deg);
      &:before {
        animation-delay: ${((SPINNER_COUNT - index) / 10) * -1}s;
      }
    `}
`;

export default memo(Spinner);
