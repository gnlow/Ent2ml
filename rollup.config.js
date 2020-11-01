import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

import preprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

function basicConf(filename) {
  return {
    input: `src/${filename}.js`,
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: `public/${filename}.js`,
    },
    plugins: [
      svelte({
        dev: !production,
        preprocess: preprocess(),
        css: css => {
          css.write(`public/${filename}.css`);
        },
      }),
      resolve({ browser: true }),
      commonjs(),
      !production && livereload('public'),
      production && terser(),
    ],
    watch: {
      clearScreen: false,
    },
  }
};

export default [
  basicConf("home"),
  basicConf("user"),
];
