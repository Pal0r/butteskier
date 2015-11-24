module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    preprocessors: {
      'app/assets/**/*.html': ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
      // we want all templates to be loaded in the same module called 'templates'
      moduleName: 'templates'
    },
    files: [
      'vendor/assets/javascripts/bower_components/angular/angular.js',
      'vendor/assets/javascripts/bower_components/angular-mocks/angular-mocks.js',
      'vendor/assets/javascripts/bower_components/angular-cookies/angular-cookies.js',
      'vendor/assets/javascripts/bower_components/jquery/dist/jquery.js',
      'vendor/assets/javascripts/bower_components/angular-ui-router/release/angular-ui-router.js',
      'vendor/assets/javascripts/bower_components/api-check/dist/api-check.js',
      'vendor/assets/javascripts/bower_components/angular-formly/dist/formly.js',
      'vendor/assets/javascripts/bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
      'vendor/assets/javascripts/bower_components/angular-upload/angular-upload.js',
      'vendor/assets/javascripts/bower_components/angular-ui-calendar/src/calendar.js',
      'vendor/assets/javascripts/bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
      'vendor/assets/javascripts/bower_components/angular-slick/dist/slick.js',
      'app/assets/**/*.html',
      'vendor/assets/javascripts/*.js',
      'app/assets/javascripts/app.js',
      'app/assets/javascripts/**/*.js',
      'spec/javascripts/*_spec.js'
    ],
    exclude: [],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}
