var _cache = {}

module.exports = {
	get : function(key) {
		return _cache[_.dotStringToCamel(key)];
	},
	set : function(key, value) {
		_cache[_.dotStringToCamel(key)] = value;
	},
	clear : function() {
		_.clearCache(_cache);
	}
}