import { useEffect, useState } from 'react';
import Head from 'next/head';

import { CalculateForm, Result } from '@/components/bmi';
import { HeaderTitle } from '@/components/common';

const Bmi = () => {
  const [bmi, setBmi] = useState(0.0);
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    setIsNext(false);
  }, []);

  return (
    <>
      <Head>
        <title>나의 BMI - 해피문데이</title>
      </Head>
      <div>
        <HeaderTitle>나의 BMI 계산하기</HeaderTitle>
        {!isNext && <CalculateForm setBmi={setBmi} setIsNext={setIsNext} />}
        {isNext && <Result bmi={bmi} setIsNext={setIsNext} />}
      </div>
    </>
  );
};

export default Bmi;
