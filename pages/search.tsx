import { SetStateAction, useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import HeaderTitle from '@/components/common/HeaderTitle';
import ContactSearch from '@/components/contact/ContactSearch';
import { getContacts, getContactsCount } from '@/services/contact';

const Search = () => {
  const [query, setQuery] = useState('');
  const [totalPageNo, setTotalPageNo] = useState(0);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['contacts'],
    ({ pageParam = 1 }) => getContacts({ page: pageParam, search: query }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage) return;
        const lastPageIdNo = parseInt(lastPage[lastPage.length - 1].id);
        const lastPageNo = Math.ceil(lastPageIdNo / 10) + 1;
        if (lastPageNo > totalPageNo) return;
        return lastPageNo;
      },
    },
  );

  useEffect(() => {
    const fetchContactsCount = async () => {
      const data = await getContactsCount();
      setTotalPageNo(data / 10);
    };
    fetchContactsCount();
  }, []);

  return (
    <div>
      <HeaderTitle>연락처 검색하기</HeaderTitle>
      <ContactSearch setQuery={setQuery} />
    </div>
  );
};

export default Search;
