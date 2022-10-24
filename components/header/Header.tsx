import { useAtom } from 'jotai';

import { HeaderTitle } from '@/components/common';
import { headerTextAtom } from '@/store/headerAtoms';

const Header = () => {
  const [headerText] = useAtom(headerTextAtom);

  return (
    <header>
      <HeaderTitle>{headerText}</HeaderTitle>
    </header>
  );
};

export default Header;
