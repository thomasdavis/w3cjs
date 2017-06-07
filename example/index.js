var w3cjs = require('..');

var results = w3cjs.validate({
	file: __dirname + '/demo.html', // file can either be a local file or a remote file
	// file: 'http://html5boilerplate.com/',
	// input: '<html>...</html>',
	// input: myBuffer,
	output: 'json', // Defaults to 'json', other option includes html
	// proxy: 'http://proxy:8080', // Default to null
	callback: function (error, res) {
		console.log(error || res);
		// depending on the output type, res will either be a json object or a html string
	}
});
