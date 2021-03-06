var vowFs = require('enb/lib/fs/async-fs');
var unitCoverage = require('unit-coverage');
var Instrumenter = unitCoverage.Instrumenter;
var BasenameFileSet = unitCoverage.fileSets.BasenameFileSet;
var MochaPhantomTestDriver = unitCoverage.testDrivers.MochaPhantomTestDriver;

/**
 * Инструментирует JS-код тестов для coverage.
 */
module.exports = require('enb/lib/build-flow').create()
    .name('js-cov')
    .target('target', '?.js')
    .useSourceFilename('source', '?.cov.js')
    .builder(function (sourceFilename) {
        return vowFs.read(sourceFilename, 'utf8').then(function (content) {
            var instrumenter = new Instrumenter(new BasenameFileSet(), process.cwd(), {
                driver: new MochaPhantomTestDriver()
            });
            return instrumenter.instrumentTests(content, sourceFilename);
        });
    })
    .createTech();
