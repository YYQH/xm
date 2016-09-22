var conf = xm.config;

var Deploy = {
	projectRoot: conf.get('project.root'),
	deployRoot: conf.get('deploy.root'),
	realPath: function(pth) {
		var relativePath = pth.slice(this.projectRoot.length);
		return _.pathJoin(this.projectRoot, this.deployRoot, relativePath);
	}
};

module.exports = {
	preprocessor: function() {
		_.Message.trigger('setTime', 'deploy');
	},
	processor: function() {
		var fileMap = xm.cache.get('spider.map');
		_.each(fileMap, function(file) {
			_.writeFile(Deploy.realPath(file.path), file.contents());
		})
	},
	postprocessor: function() {
		_.Message.trigger('outputTime', 'deploy');
	}
}
// var conf = xm.config;

// var Deploy = {}

// module.exports = {
// 	init : function() {
// 		var fileMap = xm.cache.get('spider.map');
// 		_.each(fileMap, function(file) {
// 			_.writeFile(file.realPath(), file.contents);
// 		})
		
// 	}
// }