/***
 * @File 	ES6解析
 * @Writer 	zhangrongming
 * @Data	2016-01-28
 **/

'use strict';

var babel = require('babel-core');
var projectRoot = xm.config.get('project.root');

module.exports = function(content, opt, file) {
	opt = _.extend({}, {
		// paths: [file.pathName, projectRoot],  // @import
		filename: file.subPath
	}, opt);
	var result = babel.transform(content, opt);
	return result.code;
}