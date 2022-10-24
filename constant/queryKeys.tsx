export const contactKeys = {
  totalPageNo: ['totalPageNo'] as const,
  contactPerPage: (page: number) => ['contacts', page] as const,
  totalPageNoByQuery: (query: string) => ['totalPageNo', query] as const,
  contactByQuery: (query: string) => ['contacts', query] as const,
};
