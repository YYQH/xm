module.exports = {
	preprocessor: function() {
		_.Message.trigger('setTime', 'config');
		// _.Message.trigger('pipe', 'config', 'ready');
	},
	processor: function() {
		// _.Message.trigger('pipe', 'config', 'running');
	},
	postprocessor: function() {
		_.Message.trigger('outputTime', 'config');
		// _.Message.trigger('pipe', 'config', 'done');
	}
}