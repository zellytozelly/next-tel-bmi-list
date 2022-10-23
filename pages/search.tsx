import { useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import Head from 'next/head';
import styled from '@emotion/styled';

import { useIntersect } from '@/hooks';
import { getContacts, getContactsTotalPage } from '@/services/contact';
import { HeaderTitle } from '@/components/common';
import { Card, SearchForm } from '@/components/contact';

const Search = () => {
  const [query, setQuery] = useState('');

  const { data: totalPageNo } = useQuery(['totalPageNo', query], ({ signal }) =>
    getContactsTotalPage({ search: query, signal: signal! }),
  );
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['contacts', query],
    ({ pageParam = 1, signal }) => getContacts({ page: pageParam, search: query, signal: signal! }),
    {
      enabled: !!query,
      getNextPageParam: (lastPage, allPage) => {
        if (!totalPageNo || lastPage.length === 0) return;
        const lastPageIdNo = lastPage.length;
        if (lastPageIdNo % 10) return;
        const nextPageNo = (lastPageIdNo / 10) * allPage.length + 1;
        if (nextPageNo > totalPageNo) return;
        return nextPageNo;
      },
    },
  );

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
        <HeaderTitle>연락처 검색하기</HeaderTitle>
        <SearchForm setQuery={setQuery} />
        <ContactSection>
          <ContactCardWrapper>
            {contacts.map((item) => (
              <Card key={item.id} item={item} />
            ))}
            <Target ref={ref} />
            {data?.pages[0].length === 0 && <ErrorText>검색결과가 없습니다.</ErrorText>}
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
  height: 460px;
`;

const ContactCardWrapper = styled.ul`
  width: 100%;
`;

const Target = styled.div`
  height: 1px;
`;

const ErrorText = styled.p`
  text-align: center;
`;

export default Search;
