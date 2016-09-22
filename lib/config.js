var CONSTANTS = xm.CONSTANTS;
var _config = {
	project : {
		files : './index.html',
		// root : process.env.PWD,
		root: process.cwd(),
		conf : 'xm-conf.js',
		// initChain: 'config cache spider parser check compile optimizer packages deploy test watch'.split(' '),
		initChain: 'spider compile packages'.split(' '),
		updateChain: 'spider parser check compile optimizer packages deploy test'.split(' ')
	},
	command: {},
	watch: {},
	config: {},
	cache: {},
	spider: {},
	parser : {
		defaultSetting: {
			plugin: {
				less: {plugin: 'less', option: {}},
				styl: {plugin: 'stylus', option: {}},
				jsx: {plugin: 'label', option: {}},
				ts: {plugin: 'label', option: {}},
				tsx: {plugin: 'label', option: {}},
			}
		},
		userSetting: {}
	},
	check: {
		defaultSetting: {
			plugin: {
				jsLike: 	{plugin: 'keyword-js', option: {}},
			}
		},
		userSetting: {}
	},
	compile: {
		defaultSetting: {
			plugin: {
				jsLike: 	{plugin: 'js', option: {}},
				cssLike: 	{plugin: 'css', option: {}},
				htmlLike: 	{plugin: 'html', option: {}}
			},
			hook: 'cmd'

		},
		userSetting: {}
	},
	optimizer: {
		defaultSetting: {
			plugin: {
				jsLike: 	{plugin: 'uglify-js', option: {}},
				cssLike: 	{plugin: 'clean-css', option: {}},
			}
			// png: 		{plugin: 'png-compressor'}
		},
		userSetting: {},
		// isDefault: true
	},
	packages: {
		defaultSetting: {
			pkg: [
				{from: '*.js', to: '/static/pkg/module.js', real: false},
				{from: '*.css', to: '/static/pkg/module.css', real: false},
			],
			plugin: {
				// {exp: '*.js', 	uri: '/static/pkg/module.js'},
				// {exp: '*.css', 	uri: '/static/pkg/module.css'}
			}
		},
		userSetting: {},
		// isDefault: true
	},
	deploy: {
		root: '../output'
	},
	test: {},
	debug: {
		open: true
	}
};

module.exports = {
	_set : function(key, value) {
		var keys 	= _.stringToArray(key, '.'),
			last 	= keys.pop();
		this._get(keys, _config)[last] = value;
	},
	set : function(key, value) {
		if (_.isString(key)) {
			this._set(key, value);
		} else if (_.isObject(key)) {
			for (var i in key) {
				this._set(i, key[i]);
			}
		}
	},
	_get : function(keys, container){
		var ctx = container;
		keys.forEach(function(k) {
			ctx[k] === undefined && (ctx[k] = new Object());
			ctx = ctx[k];
		});
		return ctx;
	},
	get : function(key) {
		var keys 	= _.stringToArray(key, '.');
		return this._get(keys, _config);
	},
	contants: function(contantPath) {
		return this._get(_.stringToArray(contantPath, '.'), CONSTANTS);
	},
	pipe: function(pipe) {
		var conf = this.get(pipe);
		return _.extend({}, conf.defaultSetting, conf.userSetting);
	},
	plugin: function(key, isPipe) {
		var plugins = CONSTANTS.PLUGIN;
		var name = key;
		if (isPipe) {
			name = _.xmPlugin(_config[key].plugin) || './pipe/' + key;
		} else {
			name = _.xmPlugin(key);
		}
		//内置插件
		_.each(plugins, function(v, k) {
			if (k === key) {
				name = v;
			}
		})
		return name;
	},
	init : function() {
		var path = this.get('project.root') + '/' + this.get('project.conf');
		_.exists(path) && require(path);
	}
}