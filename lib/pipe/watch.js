var fs = require('fs');
var projectRoot = xm.config.get('project.root');
var deployRoot = xm.config.get('deploy.root');
deployRoot = deployRoot.replace(/^\.\//, '');

module.exports = {
	preprocessor: function() {
		_.Message.trigger('setTime', 'watch');
	},
	processor: function() {
		fs.watch(projectRoot, {recursive: true}, function(event, fileName) {
			if (fileName.indexOf(deployRoot) < 0) {
				xm.update();
			}
		})
	},
	postprocessor: function() {
		_.Message.trigger('outputTime', 'watch');
	}
}