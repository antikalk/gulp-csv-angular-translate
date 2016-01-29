'use strict';

var through = require('through2');
var parse = require('csv-parse');
var gutil = require('gulp-util');
var path = require('path');

// consts
var PLUGIN_NAME = 'gulp-csv-angular-translate';

module.exports = function() {
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
            parse(csvText, {comment: '#'}, function(err, output) {
                if (err) {
                    console.error('gulp-csv-angular-translate: COULD NOT PARSE CSV FILE');
                } else {
                    var files = [];
                    //initialize file names
                    if (output[0]) {
                        for (var i=1; i<output[0].length; i++) {
                            files.push({langName: output[0][i], fileContent: {}});
                        }
                    }

                    //iterate over rows
                    for (var i=1; i<output.length; i++) {
                        //iterate over columns
                        for (var j=1; j<output[i].length; j++) {
                            files[j-1].fileContent[output[i][0]] = output[i][j];
                        }
                    }

                    //create and push files
                    for (var i=0; i<files.length; i++) {
                        var tempFile = new gutil.File({
                            base: '.',
                            cwd: __dirname,
                            path: files[i].langName+fileEnding
                        });
                        var content = JSON.stringify(files[i].fileContent);
                        tempFile.contents = new Buffer(content);
                        sthis.push(tempFile);
                    }

                }
            });
        }

        callback(null, file);
    };

    return through.obj(readCsvAndCreateJsonFiles);
};