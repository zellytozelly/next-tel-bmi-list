import Link from 'next/link';
import { MouseEvent, useMemo } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useUpdateAtom } from 'jotai/utils';

import { headerTextAtom } from '@/store/headerAtoms';
import { colors } from '@/styles/colors';
import { MENU_DATA } from '@/constant';

const FNB = () => {
  const router = useRouter();
  const setHeaderAtom = useUpdateAtom(headerTextAtom);
  const currentRoute = router.pathname;

  const handleClickMenu = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget.dataset;
    if (!name) return;
    setHeaderAtom(name);
  };

  const pathRegexp = useMemo(() => {
    const regexp = !currentRoute.slice(1) ? '^/$' : `${currentRoute.slice(1).split('/')[0]}`;
    return new RegExp(`${regexp}`, 'g');
  }, [currentRoute]);

  return (
    <Footer>
      <nav>
        <NavList>
          {MENU_DATA.map(({ name, path, icon }) => {
            return (
              <li key={name}>
                <NavButton type="button" data-name={name} onClick={handleClickMenu}>
                  <Link href={path}>
                    <LinkBox isActive={pathRegexp.test(path)}>
                      {icon}
                      <span>{name}</span>
                    </LinkBox>
                  </Link>
                </NavButton>
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
  background-color: ${colors.WHITE};
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

const NavButton = styled.button`
  background: none;
  padding: 0;
  margin: 0;
  font-size: smaller;
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
