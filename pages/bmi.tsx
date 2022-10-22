import { useState } from 'react';

import CalculateForm from '@/components/bmi/CalculateForm';
import HeaderTitle from '@/components/common/HeaderTitle';

const Bmi = () => {
  const [bmi, setBmi] = useState(0.0);

  return (
    <div>
      <HeaderTitle>나의 BMI 계산하기</HeaderTitle>
      <CalculateForm setBmi={setBmi} />
    </div>
  );
};

export default Bmi;
