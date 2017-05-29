module.exports = function (config) {
  var customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '30'
    },
    sl_ios_safari: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.9',
      version: '7.1'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
  }

  config.set({
    frameworks: ['mocha'],
    reporters: ['mocha', 'coverage-istanbul', 'saucelabs'],
    // browsers: ['Chrome'],

    // customLaunchers: {
    //   Chrome_travis_ci: {
    //     base: 'Chrome',
    //     flags: ['--no-sandbox']
    //   }
    // },

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
            loader: 'istanbul-instrumenter-loader'
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    sauceLabs: {
      testName: 'Web App Unit Tests'
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    // reporters: ['dots', 'saucelabs'],
    singleRun: true
  })

  if (process.env.TRAVIS) {
    // config.browsers = ['Chrome_travis_ci']
  }
}
