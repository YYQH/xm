module.exports = {
	preprocessor: function() {},
	processor: function() {},
	postprocessor: function() {}
}
// var Conf = xm.config;
// var Cache = xm.cache;

// // Packages package 保留字
// function Packaged() {}

// _.extend(Packaged.prototype, {
// 	init : function() {
// 		this.configs = Conf.get('packages');
// 		// this.isDefault = C
// 		var fileMap = Cache.get('spider.map');
// console.log(this.configs);
// 		// _.each(fileMap, function(file) {
// 		// 	// console.log(file.get().replace(/\s*/g, ''))
// 		// 	file.set(file.get().replace(/\s*/g, ''));
// 		// })
// 	}
// });
// module.exports = new Packaged();