import { useEffect, useState } from 'react';
import { dehydrate, QueryClient, useQuery, useQueryClient } from 'react-query';
import Head from 'next/head';
import styled from '@emotion/styled';

import { getContacts, getContactsTotalPage } from '@/services/contact';
import { PaginationButton } from '@/components/common';
import { Card } from '@/components/contact';
import { contactKeys } from '@/constant/queryKeys';

const Contacts = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data: totalPageNo } = useQuery(contactKeys.totalPageNo, ({ signal }) =>
    getContactsTotalPage({ signal: signal! }),
  );
  const { isLoading, isError, data } = useQuery(
    contactKeys.contactPerPage(page),
    ({ signal }) => getContacts({ page, signal: signal! }),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (page === totalPageNo) return;
    queryClient.prefetchQuery(contactKeys.contactPerPage(page + 1), ({ signal }) =>
      getContacts({ page: page + 1, signal: signal! }),
    );
  }, [page, queryClient, totalPageNo]);

  if (isLoading) return <div>loading</div>;
  if (isError) return;
  if (!data || !totalPageNo) return;

  return (
    <>
      <Head>
        <title>연락처 - 해피문데이</title>
      </Head>
      <div>
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

  await queryClient.prefetchQuery(['totalPageNo'], ({ signal }) => getContactsTotalPage({ signal: signal! }));
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
  overflow-y: scroll;
  height: 500px;
`;

const ContactCardWrapper = styled.ul`
  width: 100%;
`;

export default Contacts;
