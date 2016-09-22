var conf = xm.config;
var plugin = conf.pipe('compile').plugin;
var FileType = xm.CONSTANTS.FILE_TYPE;
var pluginCache = {};
var Compile = {
	compress: function(file, plgObj) {
		var plg = conf.plugin('compile-' + plgObj.plugin);
		var opg = pluginCache[plg] || (pluginCache[plg] = require(plg));
		var cnt = opg(file.contents(), plgObj.option, file);
		file.contents(cnt);
	}
};

module.exports = {
	preprocessor: function() {
		_.Message.trigger('setTime', 'compile');
	},
	processor: function() {
		var fileMap = xm.cache.get('spider.map');
		_.each(fileMap, function(file) {
			if (plugin[file.extName]) {
				Compile.compress(file, plugin[file.extName]);
			} else {
				var extLike = _.fileLikeType(FileType, file.extName);
				_.each(plugin, function(pluginObj, fileLike) {
					if (_.sameFileLike(fileLike, extLike)) {
						Compile.compress(file, pluginObj);
					}
				})
			}
		})
	},
	postprocessor: function() {
		_.clearCache(pluginCache);
		_.Message.trigger('outputTime', 'compile');
	}
}