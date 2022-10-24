import { ChangeEvent, FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import { useUpdateAtom } from 'jotai/utils';

import { EMAIL_REGEXP, FIRST_DECIMAL_REGEXP } from '@/constant';
import { bmiValueAtom } from '@/store/bmiAtoms';
import { colors } from '@/styles/colors';
import Router from 'next/router';

const Bmi = () => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const setBmi = useUpdateAtom(bmiValueAtom);

  const [input, setInput] = useState({
    name: '',
    email: '',
    height: '',
    weight: '',
  });

  const handleSubmitBmi = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, height, weight } = input;

    const isPassedEmail = EMAIL_REGEXP.test(email);
    setIsValidEmail(isPassedEmail);

    const heightFloat = Number(height) / 100;
    const weightFloat = Number(weight);
    const calculateBmi = Number((weightFloat / (heightFloat * heightFloat)).toFixed(1));
    setBmi(calculateBmi);

    if (isPassedEmail) Router.push('/bmi/result');
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if ((name === 'height' || name === 'weight') && !FIRST_DECIMAL_REGEXP.test(value)) return;
    if (name === 'email' && EMAIL_REGEXP.test(value)) setIsValidEmail(true);

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (input.name && input.email && input.height && input.weight && value) setIsActive(true);
  };

  return (
    <form onSubmit={handleSubmitBmi}>
      <InputBox>
        <InputText>이름</InputText>
        <Input type="text" name="name" value={input.name} autoComplete="off" onChange={handleChangeInput} />
      </InputBox>

      <InputBox>
        <InputText>이메일</InputText>
        <Input
          type="text"
          name="email"
          value={input.email}
          placeholder="example@gmail.com"
          inputMode="email"
          autoComplete="off"
          onChange={handleChangeInput}
        />
        {!isValidEmail && input.email && <InputValidText>올바른 이메일 형식으로 작성해주세요.</InputValidText>}
      </InputBox>

      <InputBox>
        <InputText>신장(cm)</InputText>
        <Input
          type="text"
          name="height"
          value={input.height}
          placeholder="000.0"
          inputMode="decimal"
          autoComplete="off"
          onChange={handleChangeInput}
        />
      </InputBox>

      <InputBox>
        <InputText>체중(kg)</InputText>
        <Input
          type="text"
          name="weight"
          value={input.weight}
          placeholder="000.0"
          inputMode="decimal"
          autoComplete="off"
          onChange={handleChangeInput}
        />
      </InputBox>

      <CalculateButton type="submit" isActive={isActive} disabled={!isActive}>
        계산하기
      </CalculateButton>
    </form>
  );
};

const InputBox = styled.div`
  padding-top: 30px;
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
  background-color: ${colors.WHITE};
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
interface CalculateButtonProps {
  isActive: boolean;
}
const CalculateButton = styled.button<CalculateButtonProps>`
  margin-top: 30px;
  width: 100%;
  height: 46px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? colors.WHITE : colors.GREY_AA)};
  background-color: ${(props) => (props.isActive ? colors.COFFEE_ORANGE : colors.LIGHT_BROWN)};
  cursor: ${(props) => (props.isActive ? 'pointer' : 'default')};
`;

export default Bmi;
