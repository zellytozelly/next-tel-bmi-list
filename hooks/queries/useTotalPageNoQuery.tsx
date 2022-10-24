import { useQuery } from 'react-query';

import { contactKeys } from '@/constant/queryKeys';
import { getContactsTotalPage } from '@/services/contact';

export const useTotalPageNoQuery = () => {
  return useQuery(contactKeys.totalPageNo, ({ signal }) => getContactsTotalPage({ signal: signal! }));
};
