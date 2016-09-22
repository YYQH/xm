var path 	= require('path');

var command = module.exports = {};

command.info 	= xm.until.readJSON(path.join(path.dirname(__dirname) + '/../package.json'));
command.name 	= command.info.name;
command.version = function() {
	console.log(' v' + command.info.version);
}
command.release = function() {
	xm.init();
}
command.map = {
	'-v' 		: command.version,
	'release'	: command.release
};
command.run 	= function(){
	var cmd = process.argv.slice(2).join('');
	if (this.map[cmd]) {
		this.map[cmd]();
	} else {
		throw new Error(process.argv.slice(2) + ' not exit!')
	}
}