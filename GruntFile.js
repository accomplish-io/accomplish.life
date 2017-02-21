module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      app: {
        files: {
          'dist/<%= pkg.name %>.ng.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['client/**/*.js', 'server/**/*.js', 'spec/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.ng.js']
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ng-annotate');


  grunt.registerTask('default', ['concat', 'ngAnnotate', 'uglify']);

};