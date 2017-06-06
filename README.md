
[![Build Status](https://secure.travis-ci.org/thomasdavis/w3cjs.png?branch=master)](http://travis-ci.org/thomasdavis/w3cjs)
[![Dependencies](https://david-dm.org/thomasdavis/w3cjs.png)](https://david-dm.org/thomasdavis/w3cjs)

# w3cjs

A node.js library for testing files or url's against the w3c html validator.

## Installation

```js
npm install w3cjs
```

## Usage

```js
var w3cjs = require('w3cjs');

var results = w3cjs.validate({
	file: 'demo.html', // file can either be a local file or a remote file
	//file: 'http://html5boilerplate.com/',
	//input: '<html>...</html>',
	//input: myBuffer,
	output: 'json', // Defaults to 'json', other option includes html
	proxy: 'http://proxy:8080', // Default to null
	callback: function (res) {
		console.log(res);
		// depending on the output type, res will either be a json object or a html string
	}
});
```

## Example async testing with Mocha

```js
var w3cjs = require('w3cjs');
describe('html validation', function(){
	it('index page should have no html errors', function(done){
		w3cjs.validate({
			file: 'index.html',
			callback: function (error, res) {
				console.log(error || res);
				if (res && res.messages.length > 0 ) {
					throw {error: 'html errors have been found', results: res};
				};
				done();
			}
		})
	})
})

```

## Older versions < 0.2.0

w3c has changed their validator API to not include some old options. It will eventually be fully deprecated and everyone is advised to update to 0.3.0 of this module.

```js
doctype: 'HTML5', // Defaults false for autodetect
charset: 'utf-8', // Defaults false for autodetect
```
