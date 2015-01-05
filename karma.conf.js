/* jshint ignore:start, node:true */
module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'js/**/*.js',
      'test/**/*.spec.js'
    ],
    singleRun: true
  });
};
