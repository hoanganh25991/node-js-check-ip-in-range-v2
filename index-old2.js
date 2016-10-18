let nmap = require('libnmap');

console.time('discover');

nmap.discover((err, report)=>{
	console.log(report);
	console.end('discover');
});