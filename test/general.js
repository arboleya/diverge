var path        = require('path');
var should      = require('chai').should();
var condilation = require('..');


var fixture = path.join(__dirname, 'fixtures', 'general.js');

var cjs     = path.join(__dirname, 'fixtures', 'cjs.js');
var meteor  = path.join(__dirname, 'fixtures', 'meteor.js');
var globals = path.join(__dirname, 'fixtures', 'globals.js');


describe('[general]', function(){
  it('should properly condional-compile files', function(){
    condilation(fixture, cjs, {env: 'cjs'});
    condilation(fixture, meteor, {env: 'meteor'});
    condilation(fixture, globals, {env: 'globals'});

    // fakes global window
    window = {};

    // require generated files
    var mod = require(cjs);
    require(meteor);
    require(globals);

    // all should exist
    should.exist(mod);
    should.exist(MyModule);
    should.exist(window.MyModule);

    // and all should work as expected
    mod().should.be.equal('condilation');
    MyModule().should.be.equal('condilation');
    window.MyModule().should.be.equal('condilation');
  });
});