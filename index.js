const INTERVAL_PING_ROOM = 270000;
const START_RECORD_TIME = 6; //6h
const END_RECORD_TIME = 23; //6h

var request = require("request");

let gateway = '192.168.1.0-255';
if(process.argv[2])
	gateway = process.argv[2];
let cmd = `sudo nmap -sP ${gateway}`;

/**
 * MAIN LOGIC, exec nmap command, then post data to server
 * @return {[type]} [description]
 */
let pingRoom = function(){
	let hour = new Date().getHours();
	if(hour >= START_RECORD_TIME && hour <= END_RECORD_TIME){
		let exec = require('child_process').exec;
		let c1 = exec(cmd, parseResult);
	}
};

let interval = setInterval(pingRoom, INTERVAL_PING_ROOM);

process.on('exit', ()=>{
	console.log('bye-bye');
	clearInterval(interval);
});

function parseResult(err, stdout) {
	if (err) throw err;

	let result = require(`${__dirname}/parse-report`)(stdout.toString());
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