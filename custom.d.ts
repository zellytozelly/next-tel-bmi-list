declare module '*.svg' {
  import React from 'react';
  const svg: React.SFC<React.SVGProps<SVGSVGElement>>;
  export default svg;
}
