/***
 * @File    LESS解析
 * @Writer  zhangrongming
 * @Data    2016-01-28
 **/

'use strict';

var less = require('less');
var projectRoot = xm.config.get('project.root');

module.exports = function(content, opt, file) {
	var result = '';
  	opt = _.extend({}, {
			paths: [file.pathName, projectRoot],  // @import
			filename: file.subPath, // error file
			syncImport: true,
			compress: true
	    }, opt);
	less.render(content, opt, function(err, output) {
    	if (err) {
    		_.log(err.message + ' at line ' + err.line + ' index ' + err.index + ' in ' + err.filename);
    	} else {
    		result = output.css;
    	}
    });
    return result;
}