import axios from 'axios';

import { Contact } from '@/types/contact';

const API_URL = 'https://632bfe295568d3cad8795b77.mockapi.io/api/v1';
const CONTACTS = '/contacts';

// 전체 연락처 개수
interface GetContactsTotalPageParams {
  search?: string;
  signal: AbortSignal;
}

type GetContactsTotalPageResponse = Contact;

export const getContactsTotalPage = async ({ signal, search = '' }: GetContactsTotalPageParams) => {
  const { data } = await axios.get<GetContactsTotalPageResponse[]>(`${API_URL}${CONTACTS}`, {
    params: {
      search,
    },
    signal,
  });
  return Math.ceil(data.length / 10);
};

// 연락처 10개
interface GetContactsParams {
  page: number;
  search?: string;
  signal: AbortSignal;
}

type GetContactsResponse = Contact;

export const getContacts = async ({ page, search = '', signal }: GetContactsParams) => {
  const { data } = await axios.get<GetContactsResponse[]>(`${API_URL}${CONTACTS}`, {
    params: {
      page,
      limit: 10,
      search,
    },
    signal,
  });
  return data;
};
