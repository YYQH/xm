var conf = xm.config;
var plugin = conf.pipe('optimizer').plugin;
var FileType = xm.CONSTANTS.FILE_TYPE;
var pluginCache = {};
var Optimizer = {
	compress: function(file, plgObj) {
		var plg = conf.plugin('optimizer-' + plgObj.plugin);
		var opg = pluginCache[plg] || (pluginCache[plg] = require(plg));
		var cnt = opg(file.contents(), plgObj.option, file);
		file.contents(cnt);
	}
};

module.exports = {
	preprocessor: function() {
		_.Message.trigger('setTime', 'optimizer');
	},
	processor: function() {
		var fileMap = xm.cache.get('spider.map');
		_.each(fileMap, function(file) {
			if (plugin[file.extName]) {
				Optimizer.compress(file, plugin[file.extName]);
			} else {
				var extLike = _.fileLikeType(FileType, file.extName);
				_.each(plugin, function(pluginObj, fileLike) {
					if (_.sameFileLike(fileLike, extLike)) {
						Optimizer.compress(file, pluginObj);
					}
				})
			}
		})
	},
	postprocessor: function() {
		_.clearCache(pluginCache);
		_.Message.trigger('outputTime', 'optimizer');
	}
}
// var conf = xm.config;


// module.exports = {
// 	init : function() {
// 		var fileMap = xm.cache.get('spider.map');
// 		_.each(fileMap, function(file) {
// 			// console.log(file.get().replace(/\s*/g, ''))
// 			file.set(file.get().replace(/\s*/g, ''));
// 		})
// 	}
// }