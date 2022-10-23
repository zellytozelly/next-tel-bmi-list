import { css } from '@emotion/react';

const globals = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI',
      'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input,
  button {
    border: none;
  }

  input:focus,
  input:active,
  button:focus,
  button:active {
    outline: none;
    box-shadow: none;
  }

  ::-webkit-scrollbar {
    /* display: none; */
  }

  * {
    box-sizing: border-box;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    body {
      color: white;
      background: black;
    }
  }
`;

export default globals;
