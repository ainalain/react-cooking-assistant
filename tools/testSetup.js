process.env.NODE_ENV = 'test';

var sinon = require('sinon');

require('babel-register')();

var hook = require('css-modules-require-hook');
var sass = require('node-sass');

hook({
  extensions: [ '.scss', '.css' ],
  generateScopedName: '[local]__[hash:base64:10]',
  preprocessCss: ( data, file ) => sass.renderSync({ file }).css
});

//add .svg right comprehension to mocha tests
const fs = require('fs');

require.extensions['.svg'] = function (module, filename) {
   module.exports = fs.readFileSync(filename, 'utf8');
};

global.sinon = sinon;

global.navigator = {
  userAgent: 'node.js'
};
