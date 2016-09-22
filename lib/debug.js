var _pipeTime = +new Date();
_.Message.on('pipe', function(pipe, state) {
	var msg = 'State of ' + pipe + ' pipe is ' + state + '! ' + _.color.green(xm.getTime(_pipeTime) + 'ms');
	_pipeTime = +new Date();
	_.log(msg, 'info');
});

var timeContainer = {};
_.Message.on('setTime', function(name) {
	timeContainer[name] = +new Date();
})
_.Message.on('outputTime', function(name, isSave, message) {
	if (timeContainer[name]) {
		var msg = 'The time of ' + name + ' process is ' + _.color.green(+new Date() - timeContainer[name] + 'ms!');
		_.log(message || msg, 'info');
		if (!isSave) {
			delete timeContainer[name];
		}
	} else {
		_.log('Please set the ' + name + ' time of origin!', 'warning')
	}
})