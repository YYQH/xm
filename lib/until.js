var fs 		= require('fs'),
	Path 	= require('path'),
	color 	= require('colors');

module.exports = {
	IS_WIN : process.platform.indexOf('win') === 0,
	exists : fs.existsSync || Path.existsSync,
	toString : Object.prototype.toString,
	pathJoin: Path.join,
	color: color,
	extend: function(target) {
		var that = this;
		var args = [].slice.call(arguments, 1);
		args.forEach(function(obj) {
			that.each(obj, function(value, key) {
				target[key] = value;
			})
		})
		return target;
	},
	each: function(obj, callback) {
		for (var i in obj) {
			callback && callback(obj[i], i, obj);
		}
	},
	loadPlugin: function(pluginName) {
		try {
			var plugin = require(pluginName);
		} catch (e) {
			this.log(e.toString() + '! Please npm install ' + pluginName);
		}
		return plugin;
	},
	xmPlugin: function(key) {
		if (!key) {
			return '';
		}
		return 'xm-' + key.replace(/^xm\-/, '')
	},
	clearCache: function(cache) {
		for (var i in cache) {
			cache[i] = null;
			delete cache[i];
		}
		return cache;
	},
	setValue: function(val, def) {
		return val === undefined ? def : val;
	},
	stringFilterSign: function(str, filter){
		if(!str) {
			return '';
		}
		var reg = new RegExp(filter.split(' ').join('|'), 'g');
		return str.replace(reg, '');
	},
	type : function(value) {
		return this.toString.call(value).replace(/\[object\s|\]/g, '');
	},
	isObject :function(obj) {
		return this.type(obj) === 'Object';
	},
	isString : function(str) {
		return this.type(str) === 'String';
	},
	stringToArray : function(str, spt) {
		return str.trim().split(spt);
	},
	dotStringToCamel : function(str) {
		return str.replace(/\.(\w)/g, function(match, $1){return $1.toUpperCase()});
	},
	getStringSign: function(str, sign, dir) {
		var pos = dir ? str.lastIndexOf(sign) : str.indexOf(sign);
		return pos === -1 ? str.length : pos
	},
	fileLikeType: function(fileMap, fileLike) {
		var result = '';
		this.each(fileMap, function(value, key) {
			if (value.indexOf(fileLike) >= 0) {
				result = key;
			}
		})
		return result;
	},
	sameFileLike: function(constants, fileLike) {
		return constants.replace('_', '').toLowerCase() === fileLike.replace('_', '').toLowerCase();
	},
	pathInfo: function(path, hidePath) {
		hidePath = (hidePath && hidePath.length ? hidePath.length : hidePath) || 0;
		var lastPathSign 	= this.getStringSign(path, '/', true),
			searchSign 		= this.getStringSign(path, '?'),
			extSign 		= this.getStringSign(path, '.'),
			hashSign 		= this.getStringSign(path, '#');
		return {
			path: 		path,
			pathName: 	path.slice(0, lastPathSign + 1),
			subPath: 	path.slice(hidePath),
			subPathName:path.slice(hidePath, lastPathSign + 1),
			fullName: 	path.slice(lastPathSign + 1, searchSign),
			fileName: 	path.slice(lastPathSign + 1, extSign),
			ext: 		path.slice(extSign, searchSign),
			extName: 	path.slice(extSign + 1, searchSign),
			search: 	path.slice(searchSign),
			query: 		path.slice(searchSign + 1, hashSign),
			hash: 		path.slice(hashSign),

		}
	},
	addFileExt: function(path, ext) {
		if (path.indexOf('.') < 0) {
			return path + '.' + ext.replace(/^\./, '');
		}
		return path;
	},
	mkdir: function(path, mode) {
		if (this.exists(path))
			return;
		var that = this;
		path = this.pathInfo(path).pathName,
		mode = this.setValue(mode, 511 & ~process.umask());
		path.split('/').reduce(function(prev, next) {
			if (prev && !that.exists(prev)) {
				fs.mkdirSync(prev, mode);
			}
			return prev + '/' + next;
		})
		if (!that.exists(path)) {
			fs.mkdirSync(path, mode);
		}

	},
	fileType: function(path, type) {
		var ext = path.split('.');
		return conf[type].indexOf(ext[ext.length - 1]) > 0;
	},
	readBuffer: function(content) {
		// 简单支持UTF-8编码
		return content.toString('utf8');
	},
	writeFile: function(path, data, append) {
		if (!this.exists(path)) {
			this.mkdir(path)
		}
		if (append) {
			fs.appendFileSync(path, data);
		} else {
			fs.writeFileSync(path, data);
		}
	},
	readFile: function(path, encodeType) {
		var content = false;
		if (this.exists(path)) {
			content = fs.readFileSync(path, encodeType);
			// if (isText || this.fileType(path, 'TEXT_FILE')) {
			// 	content = this.readBuffer(content);
			// }
		} else {
			this.log('File ' + path + ' no exists');
		}
		return content;
	},
	readJSON : function(path) {
		var content 	= this.readFile(path),
			result 		= {};
		try {
			result = JSON.parse(content);
		} catch (e) {
			throw new Error(e);
		}
		return result;
	},
	realPath : function(path) {
		if (path && this.exists(path)) {
			path = fs.realpathSync(path);
			if (this.IS_WIN) {
				path = path.replace(/\\/g, '/');
			}
			return path;
		} else {
			return false;
		}
	},
	findFile : function(path) {
		var that 		= this,
			list 		= [],
			path 		= that.realPath(path);
		if (path) {
			var states = fs.statSync(path);
			if (states.isDirectory()) {
				fs.readdirSync(path).forEach(function(p) {
					// 屏蔽.开头隐藏文件
					if (p[0] !== '.') {
						list = list.concat(that.findFile(path + '/' + p));
					}
				})
			} else if (states.isFile()) {
				list.push(path);
			}
		} else {
			this.log('unable to find ' + path + ': No such file or directory.');
		}
		return list.sort();
	},
	removePath: function(pathName) {
		var that = this;
		var path = Path.resolve(pathName);
		if (!this.exists(path)) {
			return;
		}
		var state = fs.lstatSync(path);
		if (state.isDirectory()) {
			fs.readdirSync(path).forEach(function(name) {
				if (name != '.' && name != '..') {
					that.removePath(path + '/' + name);
				}
			})
			fs.rmdirSync(path);
		} else {
			fs.unlinkSync(path);
		}
	},
	exec: function(command, success, fail) {
		var exec = require('child_process').exec;
		exec(command, function(error, output) {
			if (error) {
				fail && fail(error);
			} else {
				success && success(output)
			}
		})
	},
	log: function(msg, type) {
		var method = {
			info: function(msg) {
				process.stdout.write('\n ' + '[INFO]'.green + ' ' + msg + '\n');
			},
			notice: function(msg) {
				process.stdout.write('\n ' + '[NOTICE]'.cyan + ' ' + msg + '\n');
			},
			warning: function(msg) {
				process.stdout.write('\n' + '[WARNING]'.yellow + ' ' + msg + '\n');
			},
			error: function(msg) {
				process.stdout.write('\n' + '[ERROR]'.red + ' ' + msg + '\n');
				process.exit();
			}
		}
		method[type || 'error'](String(msg));
	},
	Message: (function() {
		// 防止消息队列暴漏篡改
		var __messages = {};
		return {
			on : function(type, fn){
				if(typeof __messages[type] === 'undefined'){
					__messages[type] = [fn];
				}else{
					__messages[type].push(fn);
				}
				return this;
			},
			trigger : function(type){
				if(!__messages[type])
					return;
				var events = [].concat(Array.prototype.slice.call(arguments, 1), [type]),
				i = len = __messages[type].length;
				// 先添加先触发
				while (i--) {
					__messages[type][len - i - 1].apply(this, events);
				}
				return this;
			},
			off : function(type, fn){
				if(__messages[type] instanceof Array){
					var len = __messages[type].length;
					while (len--) {
						__messages[type][len] === fn && __messages[type].splice(len, 1);
					}
				}
				return this;
			}
		}
	})()
};

