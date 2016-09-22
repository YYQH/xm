module.exports = {
	FILE_TYPE: {
		JS_LIKE: ' js jsx ts tsx ',
		CSS_LIKE: ' css sass scss less styl ',
		HTML_LIKE: ' html htm tpl xml xhtml ',
		IMAGE_LIKE: ' png gif jpg jpeg '
	},
	PLUGIN: {
		'optimizer-uglify-js': 	'../plugin/optimizer-uglify-js-2',
		'optimizer-clean-css': 	'../plugin/optimizer-clean-css-3',
		'parser-less': 			'../plugin/parser-less-2',
		'parser-stylus': 		'../plugin/parser-stylus',
		'parser-label': 		'../plugin/parser-babel-5',
		'check-keyword-js': 	'../plugin/check-keyword-js',
		'compile-js': 			'../plugin/compile-js',
		'compile-css': 			'../plugin/compile-css',
		'compile-html': 		'../plugin/compile-html',
		// 'packages'
	}
};