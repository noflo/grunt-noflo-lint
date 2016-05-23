/*
 * grunt-noflo-lint
 * https://github.com/noflo/grunt-noflo-lint
 *
 * Copyright (c) 2016 Henri Bergius
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var Promise = require('bluebird');
var nofloLint = Promise.promisifyAll(require('noflo-lint').graph);

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('noflo_lint', 'Grunt plugin for linting NoFlo projects', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      baseDir: process.cwd(),
      description: 'warn',
      icon: 'ignore',
      port_descriptions: 'ignore',
      wirepattern: 'warn',
      process_api: 'warn',
      asynccomponent: 'error',
      legacy_api: 'error'
    });
    // Linting is asynchronous
    var done = this.async();

    // Graphs to lint
    var graphs = [];

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return path.basename(filepath, path.extname(filepath));
      });
      graphs = graphs.concat(src);
    });

    Promise.map(graphs, function (graph) {
      return nofloLint.lintAsync(options.baseDir, graph, {})
      .then(function (deps) {
        return nofloLint.analyzeAsync(deps, options);
      })
      .then(function (results) {
        results.graph = graph;
        return Promise.resolve(results);
      });
    })
    .nodeify(function (err, results) {
      if (err) {
        grunt.fail.fatal(err);
        return;
      }
      var errors = 0;
      var warnings = 0;
      results.forEach(function (graphResults) {
        grunt.log.subhead(graphResults.graph + ' dependencies');
        if (graphResults.errors === 0 && graphResults.warnings === 0) {
          grunt.log.ok(graphResults.components.length + ' components OK');
          return;
        }
        graphResults.components.forEach(function (component) {
          grunt.log.writeln('   _' + component.name + '_');
          if (!component.error && !component.warn) {
            grunt.log.ok('Everything OK');
            return;
          }
          if (component.error) {
            component.error.forEach(function (failure) {
              grunt.log.error(failure);
              errors++;
            });
          }
          if (component.warn) {
            component.warn.forEach(function (failure) {
              grunt.log.writeln('>> ' + failure);
              warnings++;
            });
          }
        });
      });
      if (errors === 0 && warnings === 0) {
        done();
        return;
      }
      if (errors > 0) {
        grunt.fail.warn(errors + ' errors and ' + warnings + ' warnings');
        done();
        return;
      }
      grunt.log.writeln();
      grunt.log.writeln(errors + ' errors and ' + warnings + ' warnings');
      done();
    });
  });

};
