import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { colors } from '@/styles/colors';

interface Props {
  children: ReactNode;
}

const HeaderTitle = ({ children }: Props) => {
  return (
    <HeaderTitleContainer>
      <h2>{children}</h2>
    </HeaderTitleContainer>
  );
};

const HeaderTitleContainer = styled.div`
  padding: 24px 0;

  h2 {
    color: ${colors.TEXT_39};
    font-size: 22px;
    font-weight: bold;
  }
`;

export default HeaderTitle;
