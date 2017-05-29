module.exports = function (config) {
  var customLaunchers = {
    SL_Chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '51'
    },
    SL_Firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '47'
    },
    SL_Safari_8: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10',
      version: '8'
    },
    SL_Safari_9: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.11',
      version: '9'
    },
    SL_IE_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 2008',
      version: '9'
    },
    SL_IE_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 2012',
      version: '10'
    },
    SL_IE_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    SL_EDGE: {
      base: 'SauceLabs',
      browserName: 'microsoftedge',
      platform: 'Windows 10',
      version: '14'
    },
    SL_iOS: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.10',
      version: '8.1'
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
      build: 'TRAVIS #' +
        process.env.TRAVIS_BUILD_NUMBER +
        ' (' +
        process.env.TRAVIS_BUILD_ID +
        ')',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
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
