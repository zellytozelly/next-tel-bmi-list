import { useQuery } from 'react-query';

import { contactKeys } from '@/constant/queryKeys';
import { getContactsTotalPage } from '@/services/contact';

export const useTotalPageNoByQuery = (query: string) => {
  return useQuery(contactKeys.totalPageNoByQuery(query), ({ signal }) =>
    getContactsTotalPage({ search: query, signal: signal! }),
  );
};
