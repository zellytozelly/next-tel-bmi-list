import React from 'react';
import styled from '@emotion/styled';

import { colors } from '@/styles/colors';
import { Contact } from '@/types/contact';

import Image from 'next/future/image';

interface Props {
  item: Contact;
}

const ContactCard = ({ item }: Props) => {
  return (
    <ContactItem>
      <ContactImage src={item.profileImage} width={40} height={40} alt={item.name} />
      <ContactTextWrapper>
        <p>{item.name}</p>
        <p>{item.phoneNumber}</p>
      </ContactTextWrapper>
    </ContactItem>
  );
};

const ContactItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  width: inherit;
  height: 75px;
  border-radius: 10px;
  background-color: ${colors.LIGHT_BROWN};
`;

const ContactImage = styled(Image)({
  borderRadius: '50%',
});

const ContactTextWrapper = styled.div`
  padding-left: 20px;
  height: 40px;
  margin-top: 3px;

  p:nth-child(1) {
    margin: 0;
    font-size: 16px;
    line-height: 16px;
    color: ${colors.TEXT_39};
  }

  p:nth-child(2) {
    margin: 5px 0 0;
    font-size: 14px;
    line-height: 14px;
    color: ${colors.TEXT_59};
  }
`;

export default ContactCard;
