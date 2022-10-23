import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { colors } from '@/styles/colors';
import { MENU_DATA } from '@/constant';

const FNB = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <Footer>
      <nav>
        <NavList>
          {MENU_DATA.map((menu) => {
            return (
              <li key={menu.name}>
                <Link href={menu.path}>
                  <LinkBox isActive={currentRoute === menu.path}>
                    {menu.icon}
                    <span>{menu.name}</span>
                  </LinkBox>
                </Link>
              </li>
            );
          })}
        </NavList>
      </nav>
    </Footer>
  );
};

const Footer = styled.footer`
  position: fixed;
  width: inherit;
  padding: 16px;
  bottom: 0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px -2px 3px -3px, rgba(0, 0, 0, 0.3) 0px -1px 1px -1px;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  font-size: 10px;

  li + li {
    padding-left: 24px;
  }
`;

interface LinkBoxProps {
  isActive: boolean;
}
const LinkBox = styled.div<LinkBoxProps>`
  text-align: center;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => (props.isActive ? colors.TEXT_59 : colors.LIGHT_GREY)};
  }

  span {
    display: block;
    margin-top: 5px;
    color: ${(props) => (props.isActive ? colors.TEXT_59 : colors.LIGHT_GREY)};
  }
`;

export default FNB;
