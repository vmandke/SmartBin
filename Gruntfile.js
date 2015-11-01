module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                stage: 0,
                "experimental": true
            },
            dist: {
                files: [{
                  expand: true,     // Enable dynamic expansion.
                  cwd: 'scripts/third_party/react-native-tab-navigator/',      // Src matches are relative to this path.
                  src: ['*.js'],
                  dest: 'build/react-native-tab-navigator/',   // Destination path prefix.
                  ext: '.js',   // Dest filepaths will have this extension.
                  extDot: 'first'   // Extensions in filenames begin after the first dot
                },
                {
                  expand: true,     // Enable dynamic expansion.
                  cwd: 'scripts/third_party/react-native-charts/src/',      // Src matches are relative to this path.
                  src: ['*.js','*/**/*.js'],
                  dest: 'build/react-native-charts/',   // Destination path prefix.
                  ext: '.js',   // Dest filepaths will have this extension.
                  extDot: 'first'   // Extensions in filenames begin after the first dot
                }]
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'scripts/third_party/react-native-charts/node_modules/',
                    src: ['**'],
                    dest: 'build/react-native-charts/node_modules/'
                }]
            }
        },

        eslint: {
            options: {
                config: '.eslintrc',
                reset: true,
                quiet: true
            },
            target: ['scripts/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['babel', 'eslint', 'copy']);

};