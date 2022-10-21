import { ReactNode } from 'react';
import styled from '@emotion/styled';

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
    font-size: 22px;
    font-weight: bold;
  }
`;

export default HeaderTitle;
