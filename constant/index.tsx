import { colors } from '@/styles/colors';

import HomeIcon from '@/assets/svg/home.svg';
import ContactIcon from '@/assets/svg/contact.svg';
import ContactBookIcon from '@/assets/svg/contact-book.svg';
import BmiIcon from '@/assets/svg/weight.svg';

// deploy url
export const DEPLOY_URL = 'https://project-tel.vercel.app';

// pagination
export const PAGE_INDEX = [1, 2, 3, 4, 5];

// regexp
export const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

export const FIRST_DECIMAL_REGEXP = /(^\d*$)|(^\d{1,}[.]\d{0,1}$)/;

// menu href
export const MENU_DATA = [
  { name: 'HOME', path: '/', description: '', icon: <HomeIcon /> },
  { name: '연락처 전체보기', path: '/contacts', description: '모든 연락처를 볼 수 있어요', icon: <ContactIcon /> },
  {
    name: '연락처 검색하기',
    path: '/search',
    description: '이름을 검색해 연락처를 찾아보아요',
    icon: <ContactBookIcon />,
  },
  { name: 'BMI 계산하기', path: '/bmi', description: '키와 몸무게로 건강 체크해보기!', icon: <BmiIcon /> },
];

export const MENU_COMPACT_DATA: { [key: string]: string } = {
  '/': 'HOME',
  '/contacts': '연락처 전체보기',
  '/search': '연락처 검색하기',
  '/bmi': 'BMI 계산하기',
};

export const META_DATA = { title: '해피문데이', description: '해피문데이 : 연락처 목록 검색 & BMI 계산하기' };

// bmi
export const BMI_COLOR_LIST = [
  colors.LIGHT_GREY,
  colors.DARK_YELLOW,
  colors.DARK_GREEN,
  colors.DARK_MINT,
  colors.DARK_BLUE,
  colors.DARK_PINK,
  colors.DARK_RED,
];
