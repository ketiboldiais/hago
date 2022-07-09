import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';
import React from 'react';

export function Maths({ val, block = true }) {
  if (block) {
    return <TeX block>{`${val}`}</TeX>;
  } else {
    return <TeX>{`${val}`}</TeX>;
  }
}
