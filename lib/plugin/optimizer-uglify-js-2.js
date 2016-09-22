/***
 * @File 	JS压缩
 * @Writer 	zhangrongming
 * @Data	2016-01-28
 **/

'use strict';

var UglifyJS = require('uglify-js');

module.exports = function(content, opt, file) {
	var result = UglifyJS.minify(content, {fromString:true});
	return result.code;
}