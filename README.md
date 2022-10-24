## ✅ 프로젝트 실행방법

1. run the development server:

```bash
$ npm i
$ npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser

## ✅ Deploy on Vercel

- 배포 사이트 : [https://project-tel.vercel.app/](https://project-tel.vercel.app/)

## ✅ 기술 스택

- 언어 : TypeScript
- 프레임워크 : Next.js
- UI 라이브러리 : Emotion
- 상태관리 : jotai

## ✅ TODO

- 메인 페이지 `/contacts`

  - 연락처 조회 리스트

  - pagination / 10개 (별도의 컴포넌트)

- 검색 페이지 `/search`

  - 연락처 검색

  - infinite scroll / 10개

- BMI 계산 페이지 `/bmi`

  - BMI 계산

    - input 이름/이메일주소(유효성검사)/신장/체중 (소수점 한자리)

## ✅ 고려사항

- 함수컴포넌트 구현
- 모바일 화면 기준 구현

## ✅ Tree

- components
  - IdCard // 연락처 카드 컴포넌트
  - PaginationButton.tsx // 페이지네이션 버튼 컴포넌트
  - FNB.tsx // 네비게이션
- pages
  - Contacts // 연락처 전체보기. 페이지네이션
  - Search // 연락처 검색하기. 무한스크롤
  - Bmi // BMI 계산
  - \_app.tsx
  - index.tsx

## ✅ 추가 고려사항

- 입력정보 유형에 최적화된 모바일 키보드 적용을 위해 input type / inputMode 지정
