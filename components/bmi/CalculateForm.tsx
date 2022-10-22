import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';

import { EMAIL_REGEXP, FIRST_DECIMAL_REGEXP } from '@/constant';

interface Props {
  setBmi: Dispatch<SetStateAction<number>>;
}

const CalculateForm = ({ setBmi }: Props) => {
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [nameEmailInput, setNameEmailInput] = useState({
    name: '',
    email: '',
  });

  const [heightWeightInput, setHeightWeightInput] = useState({
    height: '',
    weight: '',
  });

  const handleSubmitBmi = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsValidEmail(EMAIL_REGEXP.test(nameEmailInput.email));
    const heightFloat = Number(heightWeightInput.height) / 100;
    const weightFloat = Number(heightWeightInput.weight);
    const calculateBmi = Number((weightFloat / (heightFloat * heightFloat)).toFixed(1));
    setBmi(calculateBmi);
  };

  const handleChangeNameEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === 'email' && EMAIL_REGEXP.test(value)) setIsValidEmail(true);

    setNameEmailInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeHeightWeightInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (!FIRST_DECIMAL_REGEXP.test(value)) return;

    setHeightWeightInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmitBmi}>
      <InputBox>
        <InputText>이름</InputText>
        <Input type="text" name="name" value={nameEmailInput.name} onChange={handleChangeNameEmailInput} />
      </InputBox>

      <InputBox>
        <InputText>이메일</InputText>
        <Input
          type="text"
          name="email"
          value={nameEmailInput.email}
          placeholder="example@gmail.com"
          inputMode="email"
          onChange={handleChangeNameEmailInput}
        />
        {!isValidEmail && <InputValidText>유효한 이메일로 작성해주세요.</InputValidText>}
      </InputBox>

      <InputBox>
        <InputText>신장</InputText>
        <Input
          type="text"
          name="height"
          value={heightWeightInput.height}
          placeholder="000.0"
          inputMode="decimal"
          onChange={handleChangeHeightWeightInput}
        />
      </InputBox>

      <InputBox>
        <InputText>체중</InputText>
        <Input
          type="text"
          name="weight"
          value={heightWeightInput.weight}
          placeholder="000.0"
          inputMode="decimal"
          onChange={handleChangeHeightWeightInput}
        />
      </InputBox>

      <CalculateButton type="submit">계산하기</CalculateButton>
    </form>
  );
};

const InputBox = styled.div`
  padding-top: 15px;
`;

const InputText = styled.p`
  font-size: 16px;
  color: ${colors.TEXT_39};
`;

const Input = styled.input`
  margin-top: 10px;
  padding: 14px;
  width: 100%;
  height: 46px;
  font-size: 16px;
  color: ${colors.TEXT_39};
  border-radius: 10px;
  border: solid 1px;
  border-color: ${colors.LIGHT_GREY};

  &:focus {
    border-color: ${colors.COFFEE_ORANGE};
  }

  &::placeholder {
    color: ${colors.GREY_AA};
  }
`;

const InputValidText = styled.p`
  margin: 10px 0 0 14px;
  font-size: 14px;
  color: ${colors.RED};
`;

const CalculateButton = styled.button`
  margin-top: 20px;
  width: 100%;
  height: 46px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  color: ${colors.TEXT_39};
  background-color: ${colors.LIGHT_BROWN};
  cursor: pointer;
`;

export default CalculateForm;
