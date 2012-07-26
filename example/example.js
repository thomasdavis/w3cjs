var wc3js = require('wc3js.js');

var results = wc3js.validate({
	file: 'demo.html',
	//file: 'http://html5boilerplate.com/',
	callback: function (res) {
		console.log(res);
	}
});