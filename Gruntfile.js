// Generated on 2016-05-10 using generator-angular-fullstack 3.6.1
'use strict';

module.exports = function (grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch(e) {
    localConfig = {};
  }

  require("load-grunt-tasks")(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),

    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server',
          debug: true
        }
      },
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      ngconstant: {
        files: ['server/config/environment/shared.js'],
        tasks: ['ngconstant']
      },
      injectJS: {
        files: [
          'client/{app,components}/**/!(*.spec|*.mock).js',
        ],
        tasks: ['newer:injector:scripts']
      },
      injectStylus: {
        files: ['client/{app,components}/**/*.{css,styl}'],
        tasks: ['newer:injector:stylus']
      },
      livereload: {
        files: [
          'public/index.html',
          'public/bundle.js'//,
          //'public/style.css'
        ],
        options: {
          livereload: true
        }
      },
      express: {
        files: ['server/**/*.{js,json}'],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          spawn: false //Without this option specified express won't be reloaded
        }
      }
    },
    webpack : {
      dev : require('./webpack.config.js')(true),
      pre : require('./webpack.config.js')()
    },
    // Empties folders to start fresh
    clean: {
      public: {
        files: [{
          dot: true,
          src: [
            'public'
          ]
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '**/*.js',
          dest: '.tmp/concat'
        }]
      }
    },

    // Dynamically generate angular constant `appConfig` from
    // `server/config/environment/shared.js`
    ngconstant: {
      options: {
        name: 'pickngoApp.constants',
        dest: 'client/app/app.constant.js',
        deps: [],
        configPath: 'server/config/environment/shared'
      },
      app: {
        constants: function() {
          return {
            appConfig: require('./' + grunt.config.get('ngconstant.options.configPath'))
          };
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      dev: {
        tasks: ['client', 'dev'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    },


    injector: {
      options: {
        relative: true
      },
      scripts: {
        options: {
          transform: function(filePath) {
            return 'require(\'.' + filePath + '\');';
          },
          starttag: '// injector',
          endtag: '// endinjector',
        },
        files: {
          'client/index.js': [
               [
                 'client/{app,components}/**/!(*.spec|*.mock).js',
                 '!clint/app/app.js'
               ]
            ]
        }
      },
      stylus: {
        options: {
          transform: function(filePath) {
            return '@import \'.' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          'client/app/app.styl': [
            'client/{app,components}/**/*.{css,styl}',
            '!client/app/app.styl'
          ]
        }
      }
    },
  });

  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('client', [
    'ngconstant',
    'webpack:dev'
  ]);
  grunt.registerTask('dev', [
    'express:dev',
    'wait',
    'open',
    'watch'
  ]);

  grunt.registerTask('serve', [
    'clean:public',
    'webpack:pre',
    'env:all',
    'injector',
    'concurrent:dev',
  ]);
};
