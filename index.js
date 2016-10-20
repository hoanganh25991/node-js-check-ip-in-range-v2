var request = require("request");

let gateway = '192.168.1.0-255';
if(process.argv[2])
	gateway = process.argv[2];
let cmd = `sudo nmap -sP ${gateway}`;

console.time('nmap -sP');

let pingRoom = function(){
	let exec = require('child_process').exec;
	let c1 = exec(cmd, parseResult);
};


//DEBUG
// let repl = require('repl');

function parseResult(err, stdout) {
	if (err) throw err;

	console.timeEnd('nmap -sP');

	let result = require(`${__dirname}/parse-report`)(stdout.toString());

	// repl.start('>').context.result = result;
	// console.log(result);
	updateDb(result.devices);
}


function updateDb(result) {
	console.log(JSON.stringify(result));
	var options = {
		method: 'POST',
		url: 'https://tinker.press/manage-devices-in-range/device/update',
		headers: {
			'cache-control': 'no-cache',
			'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
		},
		formData: {
			data: JSON.stringify(result)
		}
	};

	request(options, function(error, response, body) {
		if (error) throw new Error(error);

		console.log(body);
	});
}