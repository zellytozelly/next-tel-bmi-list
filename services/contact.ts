import axios from 'axios';

import { Contact } from '@/types/contact';

const API_URL = 'https://632bfe295568d3cad8795b77.mockapi.io/api/v1';
const CONTACTS = '/contacts';

// 전체 연락처 개수
interface GetContactsCountResponse extends Contact {}

export const getContactsCount = async () => {
  const { data } = await axios.get<GetContactsCountResponse[]>(`${API_URL}${CONTACTS}`);
  return data.length;
};

// 연락처 10개
interface GetContactsParams {
  page: number;
  search?: string;
}

interface GetContactsResponse extends Contact {}

export const getContacts = async ({ page, search = '' }: GetContactsParams) => {
  const { data } = await axios.get<GetContactsResponse[]>(`${API_URL}${CONTACTS}`, {
    params: {
      page,
      limit: 10,
      search,
    },
  });
  return data;
};
