module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    reporters: ['mocha', 'coverage-istanbul'],
    browsers: ['Chrome'],

    files: [
      'test/**/*.spec.js'
      // 'src/**/*.js'
    ],

    preprocessors: {
      'test/**/*.spec.js': ['webpack', 'sourcemap']
      // 'src/**/*js': ['webpack', 'sourcemap']
    },

    coverageIstanbulReporter: {
      dir: 'coverage',
      reports: ['html', 'lcovonly', 'text-summary']
    },

    webpack: {
      module: {
        rules: [
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|test)/,
            enforce: 'post',
            loader: 'istanbul-instrumenter-loader'
          }
        ]
      }
    },

    webpackMiddleware: {
      noInfo: true
    }
  })
}
