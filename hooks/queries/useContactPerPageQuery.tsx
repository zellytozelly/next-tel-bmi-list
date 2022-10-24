import { useQuery } from 'react-query';

import { contactKeys } from '@/constant/queryKeys';
import { getContacts } from '@/services/contact';

export const useContactPerPageQuery = (page: number) => {
  return useQuery(contactKeys.contactPerPage(page), ({ signal }) => getContacts({ page, signal: signal! }), {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
