const { log } = require('console');

// NOTE: every module(file) is wrapped into IIFE with parameters
// (exports, require, module, __filename, __dirname)
// that can be checked with `arguments`
// (proof we are inside a function)
// this is needed so NodeJS differentiate all the modules(files)
// log(arguments);
// log(require('module').wrapper);

// const Calc = require('./test-module-1');
// const calc1 = new Calc();
// log(calc1.add(1, 2));

// const calc2 = require('./test-module-2')
// const { add } = require('./test-module-2');
// log(add(1, 2));

// NOTE: caching - module is executed only once one importing, cause of every modules is cached
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
