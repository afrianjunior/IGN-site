var cssImport = require('../');
var expect = require('chai').expect;

describe('css-import', function () {
  it('should work', function (done) {
    
    cssImport(__dirname + '/fixture/test.css', function (err, result) {
      if (err) return done(err);
      expect(result).to.contain('span {');
      expect(result).to.contain('p {');
      done();
    });

  }); 

  it('should work when importing two files', function (done) {
    
    cssImport(__dirname + '/fixture/test2.css', function (err, result) {
      if (err) return done(err);
      expect(result).to.contain('h2 {');
      expect(result).to.contain('span {');
      expect(result).to.contain('p {');
      done();
    });

  });  

  it('should work when importing from different dir', function (done) {
    
    cssImport(__dirname + '/fixture/test3.css', {dirs: [__dirname + '/other-fixture-dir']}, function (err, result) {
      if (err) return done(err);
      expect(result).to.contain('h5 {');
      expect(result).to.contain('h2 {');
      expect(result).to.contain('span {');
      expect(result).to.contain('p {');
      done();
    });

  });  
});