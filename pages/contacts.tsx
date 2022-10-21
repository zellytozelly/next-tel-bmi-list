import { useEffect, useState } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import styled from '@emotion/styled';

import { getContacts, getContactsCount } from '@/services/contact';
import Pagination from '@/components/common/PaginationButton';
import { colors } from '@/styles/colors';

import Image from 'next/future/image';

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
        <ContactCard>
          {data.map((item) => {
            return (
              <ContactItem key={item.id}>
                <ContactImage src={item.profileImage} width={40} height={40} alt={item.name} />
                <ContactTextWrapper>
                  <p>{item.name}</p>
                  <p>{item.phoneNumber}</p>
                </ContactTextWrapper>
              </ContactItem>
            );
          })}
        </ContactCard>
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

const ContactCard = styled.div``;

const ContactItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  width: 334px;
  height: 75px;
  border-radius: 10px;
  background-color: ${colors.LIGHT_BROWN};
`;

const ContactImage = styled(Image)({
  borderRadius: '50%',
});

const ContactTextWrapper = styled.div`
  padding-left: 20px;
  height: 40px;
  margin-top: 3px;

  p:nth-child(1) {
    margin: 0;
    font-size: 16px;
    line-height: 16px;
    color: ${colors.TEXT_39};
  }

  p:nth-child(2) {
    margin: 5px 0 0;
    font-size: 14px;
    line-height: 14px;
    color: ${colors.TEXT_59};
  }
`;

export default Contacts;
