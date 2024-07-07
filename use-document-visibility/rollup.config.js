import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: 'inline',
  },
  plugins: [typescript({ sourceMap: true, inlineSources: true, tsconfig: './tsconfig.json' })],
  external: ['react', 'react-dom'],
};
