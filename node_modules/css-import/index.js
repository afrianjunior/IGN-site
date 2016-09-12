var fs       = require('fs');
var path     = require('path');

var cssParse = require('css-parse');
var async    = require('async');

function getImports(content, dirs) {
    var parsedCss = cssParse(content, {position: true});
    var imports = parsedCss.stylesheet.rules
                  .filter(function(rule){
                    return rule.type === 'import';
                  })
                  .map(function (rule) {
                    if(rule.type !== 'import') return;
                    var fileName = rule.import.replace(/^\"/ig, '').replace(/\"$/ig, '');
                    var filePath = dirs.map(function (dir) {
                      return path.join(dir, fileName);
                    }).filter(fs.existsSync)[0];
                    if (!filePath) return null;
                    return {
                      path: filePath,
                      line: rule.position.start.line - 1
                    };
                  })
                  .filter(function (imp) {
                    return !!imp;
                  });
  return imports;
}

function readAndReplace(imp, content, callback) {
  fs.readFile(imp.path, 'utf8', function (err, contentToInclude) {
    if (err) return callback(err);
    var lines = content.split('\n');
    lines[imp.line] = contentToInclude;
    return callback(null, lines.join('\n'));
  });
}

module.exports = function (file, options, callback) {
  
  if (typeof options === 'function') {
    callback = options;
    options  = options || {dirs:[]};
  }

  var dirs = [path.dirname(file)].concat(options.dirs);

  fs.readFile(file, 'utf8', function (err, content) {
    if (err) return callback(err);
    var imports = getImports(content, dirs);
    if (imports.length === 0) return callback(null, content);

    var currentImport = imports[0];

    async.doWhilst(function(callback){
      readAndReplace(currentImport, content, function (err, newContent) {
        if (err) return callback(err);
        content = newContent;
        callback();
      });
    }, function test() {
      currentImport = getImports(content, dirs)[0];
      return !!currentImport;
    }, function (err) {
      if (err) return callback(err);
      callback(null, content);
    });

  });
};