var path        = require('path');
var should      = require('chai').should();
var diverge = require('..');


var fixture = path.join(__dirname, 'fixtures', 'general.js');

var cjs     = path.join(__dirname, 'fixtures', 'cjs.js');
var meteor  = path.join(__dirname, 'fixtures', 'meteor.js');
var globals = path.join(__dirname, 'fixtures', 'globals.js');


describe('[general]', function(){
  it('should properly condional-compile files', function(){
    diverge(fixture, cjs, {env: 'cjs'});
    diverge(fixture, meteor, {env: 'meteor'});
    diverge(fixture, globals, {env: 'globals'});

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
    mod().should.be.equal('diverge');
    MyModule().should.be.equal('diverge');
    window.MyModule().should.be.equal('diverge');
  });
});