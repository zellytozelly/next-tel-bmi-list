import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import globals from '@/styles/globals';
import '@/styles/reset.css';

import { FNB } from '@/components/fnb';
import { DEPLOY_URL } from '@/constant';
import Spinner from '@/components/common/Spinner';

const META_DATA = { title: '해피문데이', description: '해피문데이 : 연락처 목록 검색 & BMI 계산하기' };

const MyApp = ({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) => {
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = () => {
      console.log('start');
      setLoading(true);
    };
    const end = () => {
      console.log('finished');
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <Head>
        <title>해피문데이</title>
        <meta name="description" content={META_DATA.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={META_DATA.title} />
        <meta property="og:description" content={META_DATA.description} />
        <meta property="og:url" content={DEPLOY_URL} />
        <meta name="twitter:title" content={META_DATA.title} key="tw-title" />
        <meta name="twitter:description" content={META_DATA.description} key="tw-desc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Global styles={globals} />
          <BackgroundBox>
            <AppContainerBox>
              <AppBox>
                {loading ? (
                  <SpinnerBox>
                    <Spinner />
                  </SpinnerBox>
                ) : (
                  <Component {...pageProps} />
                )}
              </AppBox>
              <FNB />
            </AppContainerBox>
          </BackgroundBox>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

const BackgroundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
`;

const AppContainerBox = styled.div`
  width: 390px;
  height: 100vh;
  background-color: #ffffff;
`;

const AppBox = styled.div`
  padding: 0 30px;
`;

const SpinnerBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default MyApp;
