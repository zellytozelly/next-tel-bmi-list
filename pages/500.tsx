import Link from 'next/link';

import { ErrorBox } from '@/styles/ErrorBoundary';

import ErrorIcon from '@/assets/svg/miss-load.svg';

const Custom500 = () => {
  return (
    <ErrorBox>
      <Link href="/">&lt; 홈으로</Link>
      <h2>500 - Internal Server Error</h2>
      <p>
        서버에 오류가 발생했습니다. <br />
        잠시후 다시 시도해주세요.
      </p>
      <ErrorIcon />
    </ErrorBox>
  );
};

export default Custom500;
