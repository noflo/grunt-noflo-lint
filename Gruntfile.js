/*
 * grunt-noflo-lint
 * https://github.com/noflo/grunt-noflo-lint
 *
 * Copyright (c) 2016 Henri Bergius
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ]
    },

    // Configuration to be run (and then tested).
    noflo_lint: {
      default_options: {
        options: {
          baseDir: process.cwd() + '/spec/fixtures'
        },
        files: {
          src: ['spec/fixtures/graphs/*.fbp']
        }
      },
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Run the tests
  grunt.registerTask('test', ['noflo_lint']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
