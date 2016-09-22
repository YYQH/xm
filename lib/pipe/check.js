var conf = xm.config;
var plugin = conf.pipe('check').plugin;
var FileType = xm.CONSTANTS.FILE_TYPE;
var pluginCache = {};
var Check = {
	compress: function(file, plgObj) {
		var plg = conf.plugin('check-' + plgObj.plugin);
		var opg = pluginCache[plg] || (pluginCache[plg] = require(plg));
		var cnt = opg(file.contents(), plgObj.option, file);
		file.contents(cnt);
	}
};

module.exports = {
	preprocessor: function() {
		_.Message.trigger('setTime', 'check');
	},
	processor: function() {
		var fileMap = xm.cache.get('spider.map');
		_.each(fileMap, function(file) {
			if (plugin[file.extName]) {
				Check.compress(file, plugin[file.extName]);
			} else {
				var extLike = _.fileLikeType(FileType, file.extName);
				_.each(plugin, function(pluginObj, fileLike) {
					if (_.sameFileLike(fileLike, extLike)) {
						Check.compress(file, pluginObj);
					}
				})
			}
		})
	},
	postprocessor: function() {
		_.clearCache(pluginCache);
		_.Message.trigger('outputTime', 'check');
	}
}