import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import es3 from 'rollup-plugin-es3'

function makeDest (format) {
  return `dist/${pkg.name}.${format}${minify ? `.min` : ``}.js`
}

const minify = !!process.env.MINIFY
const pkg = require('./package.json')

let targets = [
  { dest: makeDest('cjs'), format: 'cjs' },
  { dest: makeDest('umd'), format: 'umd', moduleName: pkg.name }
]

export default {
  entry: 'src/index.js',
  useStrict: false,
  sourceMap: minify,
  plugins: [
    resolve({
      jsnext: true
      // main: false,
      // browser: false
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false
          }
        ]
      ]
    }),
    minify ? uglify() : {},
    es3()
  ],
  targets: minify
    ? targets
    : targets.concat([{ dest: makeDest('es'), format: 'es' }])
}
