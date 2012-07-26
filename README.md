
[![Build Status](https://secure.travis-ci.org/thomasdavis/wc3js.png?branch=master)](http://travis-ci.org/thomasdavis/wc3js)

# wc3js

A node.js library for testing files or url's against the wc3 html validator.

## Installation

```js
npm install wc3js
```

## Usage

```js
var wc3js = require('wc3js.js');

var results = wc3js.validate({
	file: 'demo.html', // file can either be a local file or a remote file
	//file: 'http://html5boilerplate.com/',
	output: 'json', // Defaults to 'json', other option includes html
	callback: function (res) {
		console.log(res);
		// depending on the output type, res will either be a json object or a html string
	}
});
```





<img alt="Clicky" width="1" height="1" src="//in.getclicky.com/66606907ns.gif" />
