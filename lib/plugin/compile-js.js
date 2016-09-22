/***
 * @File 	编译JS
 * @Writer 	zhangrongming
 * @Data	2016-01-28
 **/

'use strict';

var conf = xm.config;
// var projectRoot = xm.config.get('project.root');
var compileHock = conf.pipe('compile').hook;
var Hock = function(type, path, deps){
	this.startHock = '';
	this.endHock = '';
	this.path = path;
	this.deps = deps;
	this.init(type);
}
_.extend(Hock.prototype, {
	hockList: 'cmd commonjs amd seajs requirejs systemjs',
	cmdHock: function() {
		this.startHock = 'define("' + this.path + '",' + this.deps + ',function(require,module,exports){';
		this.endHock = '});';
	},
	commonjsHock: function() {this.cmdHock()},
	amdHock: function() {this.cmdHock()},
	seajsHock: function() {this.cmdHock()},
	requirejsHock: function() {this.cmdHock()},
	systemjsHock: function() {this.cmdHock()},
	init: function(type) {
		var that = this;
		type = type.toLowerCase();
		this.hockList.split(' ').forEach(function(value) {
			if (value === type) {
				that[value + 'Hock']();
			}
		})
	}
});

/***
 * js 编译
 * - __inline(path) to embedd resource content or base64 encodings
 * - __uri(path) 	relative path to absolute path
 * - require(path) 	require resource
 *
 **/
module.exports = function(content, opt, file) {
	var deps = [];
	var fileMap = xm.cache.get('spider.map');
	var reg = /\b(__inline|__uri|require)\s*\(\s*("(?:[^\\"\r\n\f]+)?"|'(?:[^\\'\r\f\n]+)?')\s*\)(?:\s*;|$)?/g;
	var callback = (opt && opt.callback) || function(match, type, value) {
		value = _.stringFilterSign(value, '\' "');
		if (!value) {
			_.log('Please set ' + type + ' value!');
		}
		var path = _.addFileExt(_.pathJoin(file.subPathName, value), 'js');
		var result = fileMap[path];
		if (!result) {
			_.log('Not find file: ' + path + value);
		}
		switch (type) {
			case 'require':
				deps.push(path);
				break;
			case '__uri':
				return '\'' +  path + '\'';
			case '__inline':
				return '\'' + result.contents() + '\'';
		}
	}
	content = content.replace(reg, callback);
	var hock = new Hock(compileHock, file.subPathName, deps);
	file.contents(hock.startHock + content + hock.endHock);
	console.log(file.contents());
}
