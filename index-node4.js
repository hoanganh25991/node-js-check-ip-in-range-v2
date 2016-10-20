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

	let result = require(`${__dirname}/parse-report-node4`)(stdout.toString());
	updateDb(result.devices);
}

let fs = require('fs');
let logFileName = 'req.log';

function updateDb(result) {
	let data = JSON.stringify(result);
	console.log(data);

	var options = {
		method: 'POST',
		url: 'https://tinker.press/manage-devices-on-network/device/update',
		headers: {
			'cache-control': 'no-cache',
			'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
		},
		formData: {data}
	};

	request(options, function(error, response, body) {
		if (error) throw new Error(error);

		console.log(body);
//content templet to log
		let content =
`------------req data--------------
${data}
-------------res body--------------
${body}

LOG AT: ${new Date().toString()}
`;
//what we log is there
		fs.appendFile(logFileName, content, ()=>{
			console.log('log writen');
		});
	});
}