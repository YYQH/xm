module.exports = {
	preprocessor: function() {
		_.Message.trigger('setTime', 'cache');
		// _.Message.trigger('pipe', 'cache', 'ready');
	},
	processor: function() {
		// _.Message.trigger('pipe', 'cache', 'running');
		xm.cache.clear();
	},
	postprocessor: function() {
		_.Message.trigger('outputTime', 'cache');
		// _.Message.trigger('pipe', 'cache', 'done');
	}
}