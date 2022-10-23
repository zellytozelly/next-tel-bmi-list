import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import Head from 'next/head';
import styled from '@emotion/styled';

import { useIntersect } from '@/hooks';
import { getContacts, getContactsCount } from '@/services/contact';
import { HeaderTitle } from '@/components/common';
import { Card, SearchForm } from '@/components/contact';

const Search = () => {
  const [query, setQuery] = useState('');
  const [totalPageNo, setTotalPageNo] = useState(0);

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['contacts', query],
    ({ pageParam = 1, signal }) => getContacts({ page: pageParam, search: query, signal: signal! }),
    {
      enabled: !!query,
      getNextPageParam: (lastPage) => {
        if (!lastPage[lastPage.length - 1]) return;
        const lastPageIdNo = parseInt(lastPage[lastPage.length - 1].id);
        const lastPageNo = Math.ceil(lastPageIdNo / 10) + 1;
        if (lastPageNo > totalPageNo) return;
        return lastPageNo;
      },
    },
  );

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  const contacts = useMemo(() => {
    return data ? data.pages.flatMap((item) => item) : [];
  }, [data]);

  useEffect(() => {
    const fetchContactsCount = async () => {
      const contactsCount = await getContactsCount();
      setTotalPageNo(contactsCount / 10);
    };
    fetchContactsCount();
  }, []);

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
  overflow: scroll;
  height: 460px;
`;

const ContactCardWrapper = styled.ul`
  width: 100%;
`;

const Target = styled.div`
  height: 1px;
`;

export default Search;
