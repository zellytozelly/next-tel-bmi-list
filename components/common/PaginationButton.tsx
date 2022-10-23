import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';

import { PAGE_INDEX } from '@/constant';
import { colors } from '@/styles/colors';

import LeftArrowIcon from '@/assets/svg/left-arrow.svg';
import RightArrowIcon from '@/assets/svg/right-arrow.svg';

interface Props {
  totalPageNo: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const PaginationButton = ({ totalPageNo, page, setPage }: Props) => {
  const [pageGroup, setPageGroup] = useState(1);

  const handleClickPrev = () => {
    setPageGroup((prev) => prev - 1);
    setPage((pageGroup - 1) * 5);
  };

  const handleClickNext = () => {
    setPageGroup((prev) => prev + 1);
    setPage(pageGroup * 5 + 1);
  };

  const handleClickPage = (e: MouseEvent<HTMLButtonElement>) => {
    const { page: buttonPageNo } = e.currentTarget.dataset;
    if (!buttonPageNo) return;
    setPage(parseInt(buttonPageNo, 10));
  };
  return (
    <PaginationSection>
      <PageMoveButton type="button" onClick={handleClickPrev} disabled={pageGroup === 1}>
        <LeftArrowIcon />
      </PageMoveButton>
      {PAGE_INDEX.map((item) => {
        const pageNo = item + 5 * (pageGroup - 1);
        if (pageNo <= totalPageNo) {
          return (
            <PageButton key={item} type="button" onClick={handleClickPage} data-page={pageNo} clicked={pageNo === page}>
              {pageNo}
            </PageButton>
          );
        }
      })}
      <PageMoveButton type="button" onClick={handleClickNext} disabled={pageGroup >= totalPageNo / 5}>
        <RightArrowIcon />
      </PageMoveButton>
    </PaginationSection>
  );
};

const PaginationSection = styled.section`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

interface PageButtonProps {
  clicked: boolean;
}
const PageButton = styled.button<PageButtonProps>`
  width: 35px;
  height: 35px;
  border-radius: 2px;
  background-color: ${(props) => (props.clicked ? colors.DARK_BROWN : colors.WHITE)};
  color: ${(props) => (props.clicked ? colors.WHITE : colors.BLACK)};
  cursor: pointer;
`;

const PageMoveButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 2px;
  background-color: ${colors.LIGHT_GREY};
  cursor: pointer;

  &:disabled {
    background-color: ${colors.WHITE};

    svg {
      fill: ${colors.LIGHT_GREY};
    }
  }

  svg {
    width: 15px;
    height: 15px;
    fill: ${colors.TEXT_59};
  }
`;

export default PaginationButton;
