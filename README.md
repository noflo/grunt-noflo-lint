# grunt-noflo-lint

> Grunt plugin for linting NoFlo projects

See [noflo-lint](https://github.com/noflo/noflo-lint) for more information.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-noflo-lint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-noflo-lint');
```

## The "noflo_lint" task

### Overview
In your project's Gruntfile, add a section named `noflo_lint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  noflo_lint: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

See [noflo-lint](https://github.com/noflo/noflo-lint) for available options.

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  noflo_lint: {
    options: {},
    files: {
      src: ['graphs/*.json']
    },
  },
});
