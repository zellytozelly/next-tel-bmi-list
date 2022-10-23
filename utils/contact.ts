export const getPrevPage = (page: number) => {
  return page % 5 ? Math.floor(page / 5) * 5 : Math.floor((page - 1) / 5) * 5;
};

export const getNextPage = (page: number) => {
  return Math.ceil(page / 5) * 5 + 1;
};
