/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild')
const { dependencies } = require('./package.json')
const { Generator } = require('npm-dts')

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  external: Object.keys(dependencies),
}

build({
  ...shared,
  outfile: 'dist/index.js',
})

build({
  ...shared,
  outfile: 'dist/index.esm.js',
  format: 'esm',
})

new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
}).generate()