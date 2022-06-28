import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
// import commonjs from '@rollup/plugin-commonjs';
// const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// export default [
//   {
//     onwarn: function (warning, warn) {
//       if (warning.code === 'CIRCULAR_DEPENDENCY') return;
//       warn(warning);
//     },
//     input: 'src/index.tsx',
//     output: [
//       {
//         file: packageJson.main,
//         format: 'cjs',
//         sourcemap: false,
//       },
//       {
//         file: packageJson.module,
//         format: 'esm',
//         sourcemap: false,
//         name: 'hago',
//       },
//     ],
//     plugins: [
//       peerDepsExternal(),
//       nodeResolve(),
//       commonjs(),
//       typescript({ tsconfig: './tsconfig.json', module: 'esnext' }),
//       babel({
//         exclude: 'node_modules/**',
//         presets: ['@babel/preset-react'],
//         extensions,
//       }),
//       terser(),
//     ],
//     external: ['react', 'react-dom'],
//   },
//   {
//     input: 'dist/esm/types/index.d.ts',
//     output: [{ file: 'dist/index.d.ts', format: 'esm' }],
//     plugins: [dts()],
//   },
// ];

export default [
  {
    input: 'src/index.tsx',
    onwarn: function (warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    },
    output: [
      { file: pkg.main, format: 'es', sourcemap: false },
      { file: pkg.module, format: 'cjs', sourcemap: false },
    ],
    external: [
      /@babel\/runtime/,
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [

      PeerDepsExternalPlugin(),
      nodeResolve(),
      typescript({
        typescript: require('typescript'),
        tsconfig: './tsconfig.json',
      }),
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react', '@babel/preset-typescript'],
      }),
      terser(),
      visualizer()
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: pkg.types, format: 'esm' }],
    plugins: [dts()],
  },
];
