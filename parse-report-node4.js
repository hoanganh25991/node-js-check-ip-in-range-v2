module.exports = function parse(stdout){
	let os = require('os');
	let arr = stdout.split(os.EOL);
	//shift bcs first line is ''	
	arr.shift();

	//store data in result
	let result = {title: '', devices: []}; //{title: '', devices: []}
	result.title = arr[0];
	let devices = result.devices;
	//shift bcs ignore|remove title
	arr.shift();

	arr.forEach((val, index)=>{
		let i = Math.floor(index/3);
		let pos = index % 3;
		//create new device
		if(pos == 0)
			devices.push({});

		let device = devices[i];
		if(pos == 0){
			// let arr = val.replace('Nmap scan report for ', '').split(' ');
			// device.name = arr[0];
			// device.ip = arr[1].replace(/\(|\)/g, '');
			device.ip = val.replace('Nmap scan report for ', '');
		}

		if(pos == 2){
			let arr = val.replace('MAC Address: ', '').split(' ');
			device.mac = arr[0];
			device.manufacturer = arr[1].replace(/\(|\)/g, '');
		}

	});
	// console.log(devices);
	//remove "" just blank
	devices.pop();
	
	// let lastDevice = devices[devices.length - 1];
	// lastDevice.mac = `Unknown-${new Date().getTime()}`;
	// lastDevice.manufacturer = null;
	//the last point is info of the computer run scan
	devices.pop();

	// result.devices = devices;

	// console.log(devices);
	// console.log(result);
	return result;
}