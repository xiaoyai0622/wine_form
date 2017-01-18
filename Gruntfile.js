module.exports = function(grunt) { // the general grunt function that is run

  grunt.initConfig({ // here we setup our config object with package.json and all the tasks

    pkg: grunt.file.readJSON('package.json'),

    sass: { // sass tasks
      dist: {
        
        files: {
          'stylesheets/app.css': 'sass/application.scss' // this is our main scss file
        }
      }
    },

    cssmin: { // minifying css task
      dist: {
        files: {
          'stylesheets/app.min.css': 'stylesheets/app.css'
        }
      }
    },

    watch: { // watch task for general work
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      },
      styles: {
        files: ['stylesheets/app.css'],
        tasks: ['cssmin']
      }
    }
  });

  // all the plugins that is needed for above tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // registering the default task that we're going to use along with watch
  grunt.registerTask('default', ['sass', 'cssmin']);
};