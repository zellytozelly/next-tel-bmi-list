import Link from 'next/link';

import { ErrorBox } from '@/styles/ErrorBoundary';

import ErrorIcon from '@/assets/svg/miss-load.svg';

const Custom404 = () => {
  return (
    <ErrorBox>
      <Link href="/">&lt; 홈으로</Link>
      <h2>404 - Page Not Found</h2>
      <p>유효하지 않은 접근입니다.</p>
      <ErrorIcon />
    </ErrorBox>
  );
};

export default Custom404;
