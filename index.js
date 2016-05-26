'use strict';

var through = require('through2');
var parse = require('csv-parse');
var gUtil = require('gulp-util');
var path = require('path');

// consts
var PLUGIN_NAME = 'gulp-csv-angular-translate';

module.exports = function(options) {
    var readCsvAndCreateJsonFiles = function(file, enc, callback) {
        //check if file is null
        if (file.isNull()) {
            console.log("gulp-csv-angular-translate: FILE IS NULL");
            return callback(null, file);
        }
        //check if file is steam
        if (file.isStream()) {
            console.log("gulp-csv-angular-translate: FILE IS STREAM");
            return callback(null, file);
        }
        //check if file is buffer
        if (file.isBuffer()) {
            var csvText = file.contents;
            var fileEnding = '.json';
            var sthis = this;

            //parseOptions
            var parseOptions;
            if (options && options.csvParseOptions) {
                parseOptions = options.csvParseOptions;
            } else {
                parseOptions = {comment: '#'};
            }

            parse(csvText, parseOptions, function(err, output) {
                if (err) {
                    console.error('gulp-csv-angular-translate: COULD NOT PARSE CSV FILE [ERROR: '+err+']');
                } else {
                    var files = [];

                    //iterate over rows
                    for (var row=0; row<output.length; row++) {
                        //iterate over columns
                        for (var column=1; column<output[row].length; column++) {
                            if (row===0) {
                                //initialize the files with file names from the header row
                                files.push({langName: output[0][column], fileContent: {}});
                            } else {
                                files[column - 1].fileContent[output[row][0]] = output[row][column];
                            }
                        }
                    }

                    //create and push files
                    for (var file=0; file<files.length; file++) {
                        //create file
                        var tempFile = new gUtil.File({
                            base: '.',
                            cwd: __dirname,
                            path: files[file].langName+fileEnding
                        });
                        //JS Object -> JSON
                        var content = JSON.stringify(files[file].fileContent);
                        //set file content
                        tempFile.contents = new Buffer(content);
                        //push file
                        sthis.push(tempFile);
                    }
                }
            });
        }

        //drop input file
        callback(null);
    };

    return through.obj(readCsvAndCreateJsonFiles);
};