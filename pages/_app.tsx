import { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import '../styles/globals.css';

import FNB from '@/components/footer/FNB';
import reset from '@/styles/reset';

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>연락처-해피문데이</title>
        <meta name="description" content="연락처 목록 검색 & BMI 계산하기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Global styles={reset} />
          <BackgroundBox>
            <AppContainerBox>
              <Component {...pageProps} />
              <FNB />
            </AppContainerBox>
          </BackgroundBox>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

const BackgroundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
`;

const AppContainerBox = styled.div`
  width: 390px;
  height: 100vh;
  padding: 0 30px;
  background-color: #ffffff;
`;

export default MyApp;
