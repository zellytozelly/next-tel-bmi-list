import Link from 'next/link';
import styled from '@emotion/styled';

import { HeaderTitle } from '@/components/common';

import { MENU_DATA } from '@/constant';
import { colors } from '@/styles/colors';

const Home = () => {
  const menuList = MENU_DATA.slice(1);

  return (
    <div>
      <main>
        <ul>
          {menuList.map(({ name, path, description }) => {
            return (
              <li key={name}>
                <Link href={path}>
                  <ColorBox>
                    <p>{name}</p>
                    <span>{description}</span>
                  </ColorBox>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

const ColorBox = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 140px;
  border-radius: 10px;
  background-color: ${colors.LIGHT_BROWN};
  cursor: pointer;

  p {
    font-weight: bold;
    color: ${colors.COFFEE_BROWN};
    padding: 30px 0 10px 30px;
  }

  span {
    font-size: 14px;
    color: ${colors.COFFEE_ORANGE};
    padding: 30px;
  }
`;

export default Home;
