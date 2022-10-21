import Link from 'next/link';
import styled from '@emotion/styled';

const FNB = () => {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/contacts">연락처 전체보기</Link>
          </li>
          <li>
            <Link href="/search">연락처 검색하기</Link>
          </li>
          <li>
            <Link href="/bmi">나의 BMI 계산하기</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

const Footer = styled.footer`
  position: fixed;
`;

export default FNB;
