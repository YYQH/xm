/***
 * @File 	编译CSS
 * @Writer 	zhangrongming
 * @Data	2016-01-28
 **/

'use strict';

var projectRoot = xm.config.get('project.root');

var Compile = {
	isInline: function(str) {
		return /\b__inline\b/.test(str);
	}
}

/***
 * css编译
 * - url(path) | @import path 	relative path to absolute path
 * - url(path?__inline) 		to embed resource content or base64 encoding
 * - src=path 					relative path to absolute path
 * - src=path?__inline 			to embed resource content or base64 encoding
 *
 **/

module.exports = function(content, opt, file) {
	var reg = /\burl\s*\(?("(?:[^\\"\r\n\f]+)?"|'(?:[^\\'\n\r\f]+)?'|[^\\\s\}\)'"]+)\)?|\bsrc\s*=\s*("(?:[^\\"\r\n\f]+)?"|'(?:[^\\'\n\r\f]+)?'|[^\\\s\}'"\(\)]+)|(\/\*+\s*@inline\s*(.*)?\s*\*+\/)/g;
	var callback = (opt && opt.callback) || function(match, url, filter, comment, requireUrl) {
		url = _.stringFilterSign(url,  '\' "');
		filter = _.stringFilterSign(filter,  '\' "');
		// console.log('css', match, url, _.stringFilterSign(filter, '\' "'), 111, comment, requireUrl)
	}
	content.replace(reg, callback);
}
