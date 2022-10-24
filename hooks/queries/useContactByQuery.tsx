import { useInfiniteQuery } from 'react-query';

import { contactKeys } from '@/constant/queryKeys';
import { getContacts } from '@/services/contact';

interface Props {
  query: string;
  totalPageNo: number | undefined;
}

export const useContactByQuery = ({ query, totalPageNo }: Props) => {
  return useInfiniteQuery(
    contactKeys.contactByQuery(query),
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
};
