/***
 * @File 	Stylus解析
 * @Writer 	zhangrongming
 * @Data	2016-01-28
 **/

'use strict';

var stylus = require('stylus');
var projectRoot = xm.config.get('project.root');

module.exports = function(content, opt, file) {
	var result = '';
	opt = _.extend({}, {
			paths: [file.pathName, projectRoot],
		    filename: file.subPath,
			compress: true
		}, opt);
	stylus.render(content, opt, function(err, css) {
		if (err) {
			console.log(err);
		} else {
			result = css;
		}
	});
	return result;
}