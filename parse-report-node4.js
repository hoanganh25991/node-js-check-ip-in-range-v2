module.exports = function parse(stdout){
	var os = require('os');
	var arr = stdout.split(os.EOL);
	//shift bcs first line is ''	
	arr.shift();

	//store data in result
	var result = {title: '', devices: []}; //{title: '', devices: []}
	result.title = arr[0];
	var devices = result.devices;
	//shift bcs ignore|remove title
	arr.shift();

	arr.forEach((val, index)=>{
		var i = Math.floor(index/3);
		var pos = index % 3;
		//create new device
		if(pos == 0)
			devices.push({});

		var device = devices[i];
		if(pos == 0){
			// var arr = val.replace('Nmap scan report for ', '').split(' ');
			// device.name = arr[0];
			// device.ip = arr[1].replace(/\(|\)/g, '');
			device.ip = val.replace('Nmap scan report for ', '');
		}

		if(pos == 2){
			var arr = val.replace('MAC Address: ', '').split(' ');
			device.mac = arr[0];
			device.manufacturer = arr[1].replace(/\(|\)/g, '');
		}

	});
	// console.log(devices);
	//remove "" just blank
	devices.pop();
	
	// var lastDevice = devices[devices.length - 1];
	// lastDevice.mac = `Unknown-${new Date().getTime()}`;
	// lastDevice.manufacturer = null;
	//the last point is info of the computer run scan
	devices.pop();

	// result.devices = devices;

	// console.log(devices);
	// console.log(result);
	return result;
}