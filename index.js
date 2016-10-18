let exec = require('child_process').exec;

console.time('nmap -sn');
let c1 = exec('nmap -sn 192.168.1.0/24', parseResult);
/**
 * DEBUG
 * @type {[type]}
 */
let repl = require('repl');

function parseResult(err, stdout){
	if (err) throw err;
	console.timeEnd('nmap -sn');
	
	let result = require(`${__dirname}/parse-report`)(stdout.toString());
	
	// repl.start('>').context.result = result;
	// console.log(result.devices[0]);
	updateDb(result);
}

function updateDb(result){
	
}