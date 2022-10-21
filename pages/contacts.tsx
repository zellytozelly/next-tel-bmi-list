import { useEffect, useState } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import styled from '@emotion/styled';

import { getContacts, getContactsCount } from '@/services/contact';
import ContactCard from '@/components/contact/ContactCard';
import Pagination from '@/components/common/PaginationButton';

const Contacts = () => {
  const [page, setPage] = useState(1);
  const [totalPageNo, setTotalPageNo] = useState(0);

  const { isLoading, isError, data, isFetching } = useQuery(['contacts', page], () => getContacts({ page }), {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
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

  return (
    <div>
      <h3>연락처 전체보기</h3>
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

  await queryClient.prefetchQuery(['contacts', page], () => getContacts({ page }));
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

const ContactCardWrapper = styled.ul``;

export default Contacts;
