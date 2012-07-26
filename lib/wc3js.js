var request = require('superagent');
var fs = require('fs');

var wc3CheckUrl = 'http://validator.w3.org/check';
var defaultOutput = 'json';
var defaultCallback = function (res) {
	console.log(res);
}

function validate(options) {
	var output = options.output || defaultOutput;
	var callback = options.callback || defaultCallback;
	var file = options.file;
	if(typeof file === 'undefined') {
		return false;
	}

	var isLocal = true;
	if(file.substr(0,5) === 'http:' || file.substr(0, 6) === 'https:') {
		isLocal = false;
	};

	if(isLocal) {
		var req = request.post(wc3CheckUrl);
		req.field('output', output);
		req.field('uploaded_file', fs.readFileSync(file, 'utf8'));
	} else {
		var req = request.get(wc3CheckUrl);
		req.send({
			uri: file,
			output: output
		});
	};
	req.end(function(res){
		if(output === 'json'){
			callback(res.body);
		} else {
			callback(res.text);
		}
	});
}
var wc3js = {
	validate: validate
}
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = wc3js;
  }
  exports.wc3js = wc3js
} else {
  root['wc3js'] = wc3js;
}