var xm = module.exports = {};
var _time = new Date().getTime();

xm.until = require('./until');

// register global variable
Object.defineProperty(global, 'xm', {
  enumerable: true,
  writable: false,
  value: xm
});

Object.defineProperty(global, '_', {
	enumerable: true,
	writable: false,
	value: xm.until
})

_.extend(xm, _.loadPlugin('./api'));

xm.getTime = function(time){
	return new Date().getTime() - (time || _time);
}

xm.CONSTANTS = _.loadPlugin('./constants');
xm.config = _.loadPlugin('./config');
xm.cache = _.loadPlugin('./cache');
xm.config.init();

xm.File = _.loadPlugin('./file');

// debugger
if (xm.config.get('debug.open')) {
	_.loadPlugin('./debug')
}

// 初始化配置 初始化缓存 检索文件[map] 解析文件[less] 语法检测[代码规范，语法检测] 编译文件[inline,amd] 优化文件[ugliyjs] 打包文件 发布文件 单元测试
// 说明：理论上check应该在parser之前，但是很多解析工具已经包含check步骤，故将check放在parser之后，1是对js,css,html检测，2是对变以后的再检测，但主要还是对原生的js,css,html检测
// var chain = 'config cache spider parser check compile optimizer packages deploy test watch'.split(' ');
// var chain = 'config cache spider check compile packages test watch'.split(' ');
// var watchChain

function doPipe(chain) {
	xm.config.get(chain).forEach(function(key){
		var pipePath = xm.config.plugin(key, true);
		var pipePlugin = _.loadPlugin(pipePath);
		pipePlugin.preprocessor && pipePlugin.preprocessor();
		pipePlugin.processor && pipePlugin.processor();
		pipePlugin.postprocessor && pipePlugin.postprocessor();
	})
}

xm.init = function() {
	doPipe('project.initChain');
}
xm.update = function() {
	doPipe('project.updateChain');
}

xm.command = _.loadPlugin(xm.config.plugin('command', true));

