import { useState } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';

import { useIntersect } from '@/hooks';
import { useContactByQuery, useTotalPageNoByQuery } from '@/hooks/queries';
import { Card, SearchForm } from '@/components/contact';
import Spinner from '@/components/common/Spinner';
import { colors } from '@/styles/colors';

const Search = () => {
  const [query, setQuery] = useState('');

  const { data: totalPageNo } = useTotalPageNoByQuery(query);
  const { data, isFetching, fetchNextPage, hasNextPage } = useContactByQuery({ query, totalPageNo });

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  const contacts = data ? data.pages.flatMap((item) => item) : [];

  return (
    <>
      <Head>
        <title>연락처 검색 - 해피문데이</title>
      </Head>
      <div>
        <SearchForm setQuery={setQuery} />
        <ContactSection>
          <ContactCardWrapper>
            {contacts.map((item) => (
              <Card key={item.id} item={item} />
            ))}
            <Target ref={ref} />
            {data?.pages[0].length === 0 && <ErrorText>검색결과가 없습니다.</ErrorText>}
            {isFetching && (
              <SpinnerBox>
                <Spinner />
              </SpinnerBox>
            )}
          </ContactCardWrapper>
        </ContactSection>
      </div>
    </>
  );
};

const ContactSection = styled.section`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  height: 70vh;
`;

const ContactCardWrapper = styled.ul`
  width: 100%;
`;

const Target = styled.div`
  height: 1px;
`;

const ErrorText = styled.p`
  margin-top: 20px;
  text-align: center;
  color: ${colors.TEXT_39};
`;

const SpinnerBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default Search;
