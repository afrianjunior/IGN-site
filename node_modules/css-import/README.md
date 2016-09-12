Merge multiple css files with @import clauses.

## Installation

~~~
npm install css-import
~~~

## Usage

Given a file like this:
~~~css
@import "imported.css";
@import "imported2.css";

p {
  font-size: 2px;
}
~~~

From code:

~~~javascript
var cssImport = require('css-import');
cssImport('/path/to/my/file', {dirs: ['extra base dirs']}, function (err, content) {
	console.log(content); //the joined content
});
~~~

From CLI:

~~~
cssimport /path/to/my/file \ 
	/path/to/some/extra/base/dir \
	/path/to/some/other/base/dir
~~~


## LICENSE

MIT - 2013 - José F. Romaniello