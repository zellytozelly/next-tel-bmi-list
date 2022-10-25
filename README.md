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

- [x] 메인 페이지 `/contacts`

  - 연락처 조회 리스트

  - pagination / 10개 (별도의 컴포넌트)

- [x] 검색 페이지 `/search`

  - 연락처 검색

  - infinite scroll / 10개

- [x] BMI 계산 페이지 `/bmi`

  - BMI 계산

    - input 이름/이메일주소(유효성검사)/신장/체중 (소수점 한자리)

- 함수컴포넌트 구현
- 모바일 화면 기준 구현

## ✅ Tree

```
src
 ┣ assets       // svg, image 파일
 ┣ components   // 공통으로 사용하는 컴포넌트
 ┣ constant     // 상수값 저장
 ┣ hooks        // Custom Hooks
 ┣ pages        // 페이지
 ┣ services     // API axios 호출
 ┣ store        // 전역 상태
 ┣ styles       // 전역 style
 ┣ types        // 필요한 type 정의
 ┣ utils        // 필요한 util 함수 정의

```

## ✅ 추가 작업

### Code

- eslint, prettier 설정
- preFetching : 1페이지 보고있을 경우 2페이지 값 미리 가져옴.
- AbortController 활용 : 불필요한 API 요청 방지.
- custom hooks : 컴포넌트 내부 로직 분리
- 404, 500 페이지 추가
- FNB 추가 : Footer navigation bar로 현재 페이지가 어디인지 확인가능하고, 접근 가능성을 높임.

### UX

- 전체

  - 페이지 로딩 스피너 구현 : 유저가 로딩시간동안 빈 화면을 보지 않도록 함.
  - Header 이름 지정. 사용자 친화적 네이밍을 위한 고려.
  - Home 화면 구현. 모든 페이지 접근 가능하도록 설계.

- contacts & search

  - 검색 창에서 x를 눌러 검색어 전체를 지울 수 있음.
  - 검색 결과가 없을 경우, 텍스트 표기
  - 스크롤을 내릴 경우, 데이터를 불러올 때 로딩 스피너를 보여줌.

- BMI
  - 모든 값을 입력해야 계산하기 버튼을 입력할 수 있도록 구현.
  - input type / inputMode 지정 : 입력정보 유형에 최적화된 모바일 키보드 적용을 위함.
  - 이메일 validation 체크시, 올바른 이메일을 입력하면 경고메시지가 사라지도록 설계.
  - 경고메시지는 계산하기 버튼을 눌렀을 때만 뜨도록 설계.
  - placeholder에 넣어야하는 데이터를 보여주도록 설계.
  - 결과 창에서, 이미지와 함께 bmi 구간 보여주도록 설계.

### Detail

- 파비콘 지정.
- 페이지마다 브라우저 탭 타이틀 다르게 나오도록 구현.
- og tag 구성.
- vercel 배포.
