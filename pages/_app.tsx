import type { AppProps } from 'next/app';
import '../styles/globals.css';

import FNB from '../src/components/FNB';
import Top from '../src/components/Top';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Top />
      <Component {...pageProps} />
      <FNB />
    </>
  );
}

export default MyApp;
