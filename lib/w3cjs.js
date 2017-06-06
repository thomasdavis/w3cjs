var request = require('superagent');
var proxyRequest = require('superagent-proxy')(request);

var fs = require('fs');

var w3cCheckUrl = 'http://validator.w3.org/nu/';
var defaultOutput = 'json';
var defaultDoctype = null;
var defaultCharset = null;
var defaultProxy = null;

var defaultCallback = function (res) {
	console.log(res);
}

function setW3cCheckUrl(newW3cCheckUrl) {
	w3cCheckUrl = newW3cCheckUrl;
}

function validate(options) {
	var output = options.output || defaultOutput;
	var callback = options.callback || defaultCallback;
	var doctype = options.doctype || defaultDoctype;
	var charset = options.charset || defaultCharset;
	var file = options.file;
	var input = options.input;
	var context = '';

	var type;
	if(typeof input !== 'undefined'){
		type = 'string';
		context = input;
	} else if(typeof file !== 'undefined' && (file.substr(0,5) === 'http:' || file.substr(0, 6) === 'https:')){
		type = 'remote';
		context = file;
	} else if(typeof file !== 'undefined'){
		type = 'local';
		context = file;
	} else {
		return false;
	}

	var req = getRequest(type !== 'remote', options);

	if(type === 'remote') {
		req.query({ out: output });
		req.query({ doc: file });
	} else {
		req.query({ out: output });
		req.send((type === 'local') ? fs.readFileSync(file, 'utf8') : input + "");
	};
	req.end(function(error, res){
		if(error) {
			callback(error);
		} else if(output === 'json'){
			res.body.context = context;
			callback(null, res.body);
		} else {
			callback(null, res.text);
		}
	});
}

var getRequest = function(isLocal, options) {
	var req = isLocal ? proxyRequest.post(w3cCheckUrl) : proxyRequest.get(w3cCheckUrl);

	var proxy = options.proxy || defaultProxy;
	if (proxy !== null) {
		req.proxy(proxy);
	}

	req.set('User-Agent', 'w3cjs - npm module');
	req.set('Content-Type', 'text/html; encoding=utf-8');

	return req;
}

var w3cjs = {
	validate: validate,
	setW3cCheckUrl: setW3cCheckUrl
}
if (typeof exports !== 'undefined') {
	if (typeof module !== 'undefined' && module.exports) {
	exports = module.exports = w3cjs;
	}
	exports.w3cjs = w3cjs
} else {
	root['w3cjs'] = w3cjs;
}
