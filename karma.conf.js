module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'https://code.jquery.com/jquery-3.1.1.slim.min.js',
      'https://code.jquery.com/jquery-3.1.1.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.js',
      'client/bower_components/chart.js/dist/Chart.min.js',
      'client/bower_components/angularjs-datepicker/src/css/angular-datepicker.css',
      'client/bower_components/angular-chart.js/dist/angular-chart.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-materialize/0.2.2/angular-materialize.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.4.2/angular-ui-router.min.js',
      'client/bower_components/auth0-lock/build/lock.js',
      'client/bower_components/angular-lock/dist/angular-lock.js',
      'client/bower_components/angular-jwt/dist/angular-jwt.js',
      'client/app/auth/auth0-variables.js',
      'client/bower_components/angularjs-datepicker/src/js/angular-datepicker.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-mocks.js',
      'client/app/app.js',
      'client/app/GoalFactory.js',
      'client/app/app.run.js',
      'client/app/auth/auth.js',
      'client/app/dashboard/dashboard.js',
      'client/app/goal-complete/goal-complete.js',
      'client/app/goal-details/goal-details.js',
      'client/app/goal-new/goal-new.js',
      'client/app/services/auth.js',
      'client/app/services/user.js',
      'spec/controllerSpec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};