/***
 * @File 	CSS压缩
 * @Writer 	zhangrongming
 * @Data	2016-01-28
 **/

'use strict';

var CleanCSS = require('clean-css');

module.exports = function(content, opt, file) {

	var result = new CleanCSS(opt).minify(content);

	return result.styles;
}