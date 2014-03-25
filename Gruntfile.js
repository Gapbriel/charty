//
// Helper for connect. The idea behind it is to load a middle with a given
// directory.
//
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    'use strict';

    /** Load all grunt tasks */
    require('matchdep')
        .filterDev('grunt-*')
        .forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        config: {
            src: 'src',
            dist: 'dist',
            ghPages: 'gh-pages',
            tmp: '.tmp'
        },

        pkg: grunt.file.readJSON('package.json'),

        /** Concat */
        concat: {
            dist: {
                src: [
                    '<%= config.src %>/utils/datavalidator/datavalidator.js',
                    '<%= config.src %>/api/chartyinit.js',
                    '<%= config.src %>/api/chartynames.js',
                    '<%= config.src %>/components/scales/*.js',
                    '<%= config.src %>/composition/datamapper/datamapper.js',
                    '<%= config.src %>/components/base/basechart.js',
                    '<%= config.src %>/composition/simpledatagroup.js',
                    '<%= config.src %>/components/axis/axis.js',
                    '<%= config.src %>/components/bar/bar.js',
                    '<%= config.src %>/components/bar/horizontalbar.js',
                    '<%= config.src %>/components/bar/winlossbar.js',
                    '<%= config.src %>/components/circle/circle.js',
                    '<%= config.src %>/components/donut/donut.js',
                    '<%= config.src %>/components/line/line.js',
                    '<%= config.src %>/components/roundedrectangle/roundedrectangle.js',
                    '<%= config.src %>/components/text/text.js',
                    '<%= config.src %>/components/text/abovetext.js',
                    '<%= config.src %>/components/text/righttext.js',
                    '<%= config.src %>/components/text/winlosstext.js',
                    '<%= config.src %>/components/triangle/triangle.js',
                    '<%= config.src %>/composition/multipledatagroup.js',
                    '<%= config.src %>/composition/multipleinstancesmixin.js',
                    '<%= config.src %>/composition/axis/xyaxis.js',
                    '<%= config.src %>/composition/axis/yxyaxis.js',
                    '<%= config.src %>/composition/barchart/barchart.js',
                    '<%= config.src %>/composition/groupedbarchart/groupedbarchart.js',
                    '<%= config.src %>/composition/donutwithinnertext/donutwithinnertext.js',
                    '<%= config.src %>/composition/labeledtrianglechart/labeledtrianglechart.js',
                    '<%= config.src %>/composition/linechart/*.js',
                    '<%= config.src %>/composition/scatterplot/scatterplot.js',
                    '<%= config.src %>/utils/accessor/accessor.js',
                    '<%= config.src %>/utils/events/functionevent.js',
                    '<%= config.src %>/utils/events/bootstrapevent.js',
                    '<%= config.src %>/utils/events/eventfactory.js',
                    '<%= config.src %>/utils/events/eventmanager.js',
                    '<%= config.src %>/api/chartinterface.js',
                    '<%= config.src %>/api/chartyapi.js',
                    '<%= config.src %>/api/charty.js',
                ],
                dest: '<%= config.dist %>/charty.js'
            }
        },

        /** Minimify code */
        uglify: {
            options: {
                sourceMap: true
            },
            default: {
                files: {
                    '<%= config.dist %>/<%= pkg.name %>.min.js': '<%= config.dist %>/<%= pkg.name %>.js'
                }
            }
        },

        /** Plato */
        plato: {
            your_task: {
                files: {
                    '<%= config.ghPages %>/plato': ['<%= config.src %>/**/*.js'],
                }
            },
        },

        /** Yuidoc */
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                options: {
                    paths: 'src/',
                    outdir: 'gh-pages/doc/'
                }
            }
        },

        /** JSHint */
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '<%= config.src %>/**/*.js'
            ]
        },

        /** JSBeautifier */
        jsbeautifier: {
            modify: {
                src: ['Gruntfile.js', '<%= config.src %>/**/*.js'],
                options: {
                    config: '.jsbeautifyrc'
                }
            },
            verify: {
                src: ['Gruntfile.js', '<%= config.src %>/**/*.js'],
                options: {
                    mode: 'VERIFY_ONLY',
                    config: '.jsbeautifyrc'
                }
            }
        },

        /** Server **/
        connect: {
            default: {
                options: {
                    port: 9000,
                    middleware: function(connect, options) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'gh-pages')
                        ];
                    }
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            html: {
                files: [
                    '<%= config.ghPages %>/examples/*.html'
                ]
            },
            js: {
                files: [
                    '<%= config.src %>/**/*.js'
                ]
            }
        }

    });

    /**
    Server
    **/
    grunt.registerTask('server', [
        'connect',
        'watch'
    ]);

    /** Build js */
    grunt.registerTask('build-js', [
        'concat',
        'uglify'
    ]);

    /** Build js with plato */
    grunt.registerTask('build-js-plato', [
        'plato',
        'concat',
        'uglify'
    ]);

    /** Build js with plato and yuidoc */
    grunt.registerTask('build-js-all', [
        'plato',
        'concat',
        'uglify',
        'yuidoc'
    ]);
};
