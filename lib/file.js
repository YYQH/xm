var conf = xm.config;
var FILE_TYPE = conf.contants('FILE_TYPE');
var projectRoot = xm.config.get('project.root');

function File(pth) {
	// this.path = pth;
	this._contents = _.readBuffer(_.readFile(pth));
	_.extend(this, _.pathInfo(pth, projectRoot));
	// this.subPath = pth.slice(projectRoot.length);
	// this.subPathName = this.subPath.slice(0, this.subPath.indexOf(this.fileName))
	// this.ext = .extName;
	// this.init();
}

File.prototype = {
	// projectRoot: conf.get('project.root'),
	// deployRoot: conf.get('deploy.root'),
	// realPath: function() {
	// 	var relativePath = this.path.slice(this.projectRoot.length);
	// 	return _.pathJoin(this.projectRoot, this.deployRoot, relativePath);
	// },
	contents: function(value) {
		if (value) {
			this._contents = value;
		} else {
			return this._contents;
		}
	},
	set: function(key, value) {
		this[key] = value;
	},
	get: function(key) {
		return this[key];
	}
	// setFileType: function() {
	// 	var that = this;
	// 	// 文件类型配置
	// 	that.extName = _.pathInfo(this.path).extName;
	// 	_.each(FILE_TYPE, function(value, key) {
	// 		if (!!~value.indexOf(that.extName)) {
	// 			// 文件打包配置
	// 			that.pkg = key.slice(0, key.indexOf('_')).toLowerCase();
	// 		}
	// 	})

	// },
	// postSpider: 	function() {},
	// preParser: 		function() {},
	// postParser: 	function() {},
	// preCheck: 		function() {},
	// postCheck: 		function() {},
	// preCompile: 	function() {},
	// postCompile: 	function() {},
	// prePackages: 	function() {},
	// postPackages: 	function() {},
	// preDeploy: 		function() {},
	// postDeploy: 	function() {},
	// init: function() {
	// 	this.setFileType();
	// }
}
module.exports = File;