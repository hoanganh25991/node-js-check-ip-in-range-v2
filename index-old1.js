// let scanner = require('node-libnmap');
let scanner = require('libnmap');

let opts = {
	range: [
		'192.18.1.0-255'
	]
};

let repl = require('repl');

scanner.scan(opts, (err, report) => {
	if (err) throw err;
	repl.start('>').context.result = report;
	// console.log(report);
});