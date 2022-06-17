import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Tree, TreeProps } from '../src/Tree/Tree';

const meta: Meta = {
  title: 'Tree',
  component: Tree,
};

export default meta;

export const Intro = () => (
  <Tree
    data={[
      ['a', ''],
      ['b', 'a'],
      ['c', 'a'],
      ['e', 'c'],
      ['f', 'c'],
      ['g', 'b'],
      ['h', 'b'],
      ['i', 'g'],
      ['j', 'g'],
      ['k', 'e'],
      ['l', 'e'],
      ['m', 'h'],
      ['n', 'h'],
    ]}
    slim={10}
    id="Tree1"
  />
);
