import { useEffect, useState } from 'react';

import CalculateForm from '@/components/bmi/CalculateForm';
import HeaderTitle from '@/components/common/HeaderTitle';
import Result from '@/components/bmi/Result';

const Bmi = () => {
  const [bmi, setBmi] = useState(0.0);
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    setIsNext(false);
  }, []);

  return (
    <div>
      <HeaderTitle>나의 BMI 계산하기</HeaderTitle>
      {!isNext && <CalculateForm setBmi={setBmi} setIsNext={setIsNext} />}
      {isNext && <Result bmi={bmi} setIsNext={setIsNext} />}
    </div>
  );
};

export default Bmi;
