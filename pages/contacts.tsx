import { useEffect, useState } from 'react';
import { dehydrate, QueryClient, useQuery, useQueryClient } from 'react-query';
import Head from 'next/head';
import styled from '@emotion/styled';

import { getContacts, getContactsCount } from '@/services/contact';
import { HeaderTitle, PaginationButton } from '@/components/common';
import { Card } from '@/components/contact';

const Contacts = () => {
  const [page, setPage] = useState(1);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(
    ['contacts', page],
    ({ signal }) => getContacts({ page, signal: signal! }),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    const fetchContactsCount = async () => {
      const count = await getContactsCount();
      setTotalPageNo(count / 10);
    };
    fetchContactsCount();
  }, []);

  useEffect(() => {
    if (page === totalPageNo) return;
    queryClient.prefetchQuery(['contacts', page + 1], ({ signal }) => getContacts({ page: page + 1, signal: signal! }));
  }, [page, queryClient, totalPageNo]);

  if (isLoading) return <div>loading</div>;
  if (isError) return;
  if (!data) return;

  return (
    <>
      <Head>
        <title>연락처 - 해피문데이</title>
      </Head>
      <div>
        <HeaderTitle>연락처 전체보기</HeaderTitle>
        <ContactSection>
          <ContactCardWrapper>
            {data.map((item) => {
              return <Card key={item.id} item={item} />;
            })}
          </ContactCardWrapper>
          <PaginationButton totalPageNo={totalPageNo} page={page} setPage={setPage} />
        </ContactSection>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const page = 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['contacts', page], ({ signal }) => getContacts({ page, signal: signal! }));
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const ContactSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  height: 500px;
`;

const ContactCardWrapper = styled.ul`
  width: 100%;
`;

export default Contacts;
