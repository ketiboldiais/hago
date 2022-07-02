import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';
import React from 'react';

export function Maths({ val }) {
  return <TeX block>{`${val}`}</TeX>;
}
