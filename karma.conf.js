module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    reporters: ['mocha', 'coverage-istanbul'],
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    files: ['test/**/*.spec.js'],

    preprocessors: {
      '**/*': ['webpack', 'sourcemap']
    },

    coverageIstanbulReporter: {
      dir: 'coverage',
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },

    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|test)/,
            enforce: 'pre',
            loader: 'istanbul-instrumenter-loader',
            query: {
              esModules: true
            }
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true
  })

  if (process.env.TRAVIS) {
    config.browsers = ['Chrome_travis_ci']
  }
}
