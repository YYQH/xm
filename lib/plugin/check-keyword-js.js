/***
 * @File 	js保留字检测
 * @Writer 	zhangrongming
 * @Data	2016-01-28
 **/

'use strict';

var keyWord = 'abstract boolean byte char class const debugger double enum export extends fimal float goto implements import int interface long mative package private protected public short static super synchronized throws transient volatile'.split(' ');

module.exports = function(content, opt, file) {
	keyWord.forEach(function(value) {
		// include value in a line
		var reg = new RegExp('(?:[^\\n\\r]*)?\\b' + value + '\\b(?:[^\\n\\r]*)?', 'g');
		// '|" value is string '|"
		var stringReg = new RegExp('[\'"][^\'"]*\\b' + value + '\\b[^\'"]*[\'"]', 'g');
		// find value position
		var errReg = new RegExp('\\b' + value + '\\b');

		var result = content.match(reg);

		if (result) {
			result.forEach(function(res) {
				if (stringReg.test(res)) {
					return;
				}
				_.log(res.replace(errReg, _.color.yellow(value)) + ' in file: ' + file.subPath, 'warning')
			})
		}
	})
}