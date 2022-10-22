import { useEffect, useState } from 'react';
import { dehydrate, QueryClient, useQuery, useQueryClient } from 'react-query';
import styled from '@emotion/styled';

import { getContacts, getContactsCount } from '@/services/contact';
import ContactCard from '@/components/contact/ContactCard';
import Pagination from '@/components/common/PaginationButton';
import HeaderTitle from '@/components/common/HeaderTitle';

const Contacts = () => {
  const [page, setPage] = useState(1);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const queryClient = useQueryClient();

  const { isLoading, isError, data, isFetching } = useQuery(
    ['contacts', page],
    ({ signal }) => getContacts({ page, signal: signal! }),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        if (page === totalPageNo) return;
        queryClient.prefetchQuery(['contacts', page + 1], ({ signal }) =>
          getContacts({ page: page + 1, signal: signal! }),
        );
      },
    },
  );
  if (isLoading) return <div>loading</div>;
  if (isError) return;
  if (!data) return;

  useEffect(() => {
    const fetchContactsCount = async () => {
      const data = await getContactsCount();
      setTotalPageNo(data / 10);
    };
    fetchContactsCount();
  }, []);

  useEffect(() => {
    queryClient.prefetchQuery(['contacts', page + 1], ({ signal }) => getContacts({ page: page + 1, signal: signal! }));
  }, []);

  return (
    <div>
      <HeaderTitle>연락처 전체보기</HeaderTitle>
      <ContactSection>
        <ContactCardWrapper>
          {data.map((item) => {
            return <ContactCard key={item.id} item={item} />;
          })}
        </ContactCardWrapper>
        <Pagination totalPageNo={totalPageNo} page={page} setPage={setPage} />
      </ContactSection>
    </div>
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
