//  This file isn't transpiled, so you must used CommonJS and ES5

//  Register babel to transpiled before our tests run.
require('babel-register')();

//  Disable webpack features that Mocha doesn't understand.
require.extensions['.css'] = () => {};
