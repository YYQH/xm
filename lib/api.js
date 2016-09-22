/***
 * @File 	公共API
 * @Writer 	zhangrongming
 * @Data	2016-01-28
 **/

'use strict';

module.exports = {
	set: function(key, value) {
		xm.config.set(key, value);
		return this;
	},
	get: function(key) {
		return xm.config.get(key);
	},
	spider: function(src) {
		this.pipe('spider', src);
		return this;
	},
	deploy: function(src) {
		this.pipe('deploy', src);
		return this;
	},
	pipe: function(plugin, param) {
		if (plugin === 'spider') {
			this.filesFilter = src;
		}
		else if (plugin === 'deploy') {

		}
		else {
			if (!this.filesFilter) {
				_.log('Please spider files!');
			}
		}
		return this;
	},

}