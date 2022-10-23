import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';

import { EMAIL_REGEXP, FIRST_DECIMAL_REGEXP } from '@/constant';
import { colors } from '@/styles/colors';

interface Props {
  setBmi: Dispatch<SetStateAction<number>>;
  setIsNext: Dispatch<SetStateAction<boolean>>;
}

const CalculateForm = ({ setBmi, setIsNext }: Props) => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const [input, setInput] = useState({
    name: '',
    email: '',
    height: '',
    weight: '',
  });

  const handleSubmitBmi = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isPassedEmail = EMAIL_REGEXP.test(input.email);
    setIsValidEmail(isPassedEmail);
    const heightFloat = Number(input.height) / 100;
    const weightFloat = Number(input.weight);
    const calculateBmi = Number((weightFloat / (heightFloat * heightFloat)).toFixed(1));
    setBmi(calculateBmi);
    if (isPassedEmail) setIsNext(true);
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
        <Input type="text" name="name" value={input.name} onChange={handleChangeInput} />
      </InputBox>

      <InputBox>
        <InputText>이메일</InputText>
        <Input
          type="text"
          name="email"
          value={input.email}
          placeholder="example@gmail.com"
          inputMode="email"
          onChange={handleChangeInput}
        />
        {!isValidEmail && input.email && <InputValidText>유효한 이메일로 작성해주세요.</InputValidText>}
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
interface CalculateButtonProps {
  isActive: boolean;
}
const CalculateButton = styled.button<CalculateButtonProps>`
  margin-top: 20px;
  width: 100%;
  height: 46px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? colors.WHITE : colors.GREY_AA)};
  background-color: ${(props) => (props.isActive ? colors.COFFEE_ORANGE : colors.LIGHT_BROWN)};
  cursor: ${(props) => (props.isActive ? 'pointer' : 'default')};
`;

export default CalculateForm;
