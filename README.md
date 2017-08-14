# gulp-csv-angular-translate (gCat)
Gulp plugin for generating multiple language JSON files out of one CSV File.

## What's it for?
When using angular-translate with [asynch loading](https://github.com/angular-translate/angular-translate/wiki/Asynchronous-loading) and splitted language files for minimizing the network traffic, writing the different JSON-Files can be confusing.

This Plugin provides a simple way of translating the different languages in only one .csv-File and generating the needed .json-Files.

The .csv-File:

Key | de_DE | en_US | en_UK
------------ | ------------- | ------------- | -------------
HELLO | Hallo | Hello | Hello
WORLD | Welt | World | World

Results in the three .json-Files: de_DE.json, en_US.json, en_UK.json

de_DE.json:
`{"HELLO":"Hallo","WORLD":"Welt"}`

en_US.json:
`{"HELLO":"Hello","WORLD":"World"}`

en_UK.json:
`{"HELLO":"Hello","WORLD":"World"}`

## How to use the plugin

Install the plugin:

`npm install --save gulp-csv-angular-translate`

Write the gulp task:

```javascript
var gCat = require('gulp-csv-angular-translate');
gulp.task('lang', function() {
     gulp.src('lang.csv') //language source .csv
         .pipe(gCat()) //run the plugin
         .pipe(gulp.dest('build')); //put out the .json-files in a specified folder
});
```

## Configurations

#### Configure the csv-parser options

The options for the csv parser can be configured under `csvParserOptions`. Find the possible configurations [here](http://csv.adaltas.com/parse/).

Example:

```javascript
gulp.task('lang', function() {
    gulp.src('lang.csv')
        .pipe(gCat({
            csvParseOptions: {
                delimiter: ';',
                trim: true
            }
        }))
        .pipe(gulp.dest('build'));
});
```

#### Skip empty translations

The option `skipEmptyTranslations` always empty translations to be skipped. This means that empty columns don't result in an empty translation string.

Example: 

```javascript
gulp.task('lang', function() {
    gulp.src('lang.csv')
        .pipe(gCat({
            skipEmptyTranslations: true
        }))
        .pipe(gulp.dest('build'));
});
```