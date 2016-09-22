// var File = require('../file');
var File = xm.File;
var conf = xm.config;

var Spider = {
	realDeployRoot: function() {
		return _.pathJoin(conf.get('project.root'), conf.get('deploy.root'));
	},
	listToMap : function(list, root) {
		root = root || xm.config.get('project.root');
		var map = {}, file;
		list.forEach(function(value) {
			var file = new File(value);
			map[file.subPath] = file;
		});
		return map;
	}
};

module.exports = {
	preprocessor: function() {
		_.Message.trigger('setTime', 'spider');
	},
	processor: function() {
		var path = Spider.realDeployRoot();
		_.removePath(path);
		var root 	= xm.config.get('project.root');
		var list 	= _.findFile(root);
		xm.cache.set('spider.map',  Spider.listToMap(list));
	},
	postprocessor: function() {
		_.Message.trigger('outputTime', 'spider');
	}
}

// var File = require('../file');
// var conf = xm.config;

// function Spider() {}

// exports.init = function() {
// 	var plg = conf.plugin('spider');
// 	var a = require(plg);
// 	a.pre()
// 	a.init()
// 	a.next()
// }

// var spider = {
// 	realDeployRoot: function() {
// 		return _.pathJoin(conf.get('project.root'), conf.get('deploy.root'));
// 	},
// 	listToMap : function(list, root) {
// 		root = root || xm.config.get('project.root');
// 		// var result = {
// 		// 	map : {},
// 		// 	// keys:[]
// 		// },
// 			// len = root.length,
// 			// ctx;
// 		var map = {};
// 		list.forEach(function(value) {
// 			// ctx = value.slice(len);
// 			// result.map[ctx] = fsvalue;
// 			// result.keys.push(ctx);
// 			map[value] = new File(value);
// 		});
// 		return map;
// 		// return result;
// 	}
// }
// exports.init = function() {
// 	var path = spider.realDeployRoot();
// 	_.removePath(path);
// 	var root 	= xm.config.get('project.root');
// 	var list 	= _.findFile(root);
// 	// var result 	= spider.listToMap(list);
// 	// xm.cache.set('spider.list', list);
// 	// xm.cache.set('spider.map',  result.map);
// 	xm.cache.set('spider.map',  spider.listToMap(list));
// 	// xm.cache.set('spider.keys',  result.keys);
// }

// exports.getMap = function() {
// 	return xm.cache.get('spider.map');
// }
// exports.getList = function() {
// 	return xm.cache.get('spider.list');
// }