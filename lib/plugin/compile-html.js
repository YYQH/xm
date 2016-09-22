/***
 * @File 	编译HTML
 * @Writer 	zhangrongming
 * @Data	2016-01-28
 **/

'use strict';

var projectRoot = xm.config.get('project.root');

/***
 * 编译html
 * - <script|style ... src="path"></script|style>
 * - <script|style ... src="path?__inline"></script|style>
 * - <script|style ...>...</script|style>
 * - <img|embed|audio|video|link|object ... (data-)src="path" />
 * - <img|embed|audio|video|link|object ... (data-)src="path?__inline" />
 * - <link ... href="path">
 * - <!--inline[path]-->
 **/

// /(\s(?:data-)?src(?:set)?\s*=\s*)('[^']+'|"[^"]+"|[^\s\/>]+)/ig
//

module.exports = function(content, opt, file) {
	var reg = /<script(?:(?=\s)(.*)?>|>)(.*)?(?:<\/script>|$)?|<style(?:(?=\s)(.*)?>|>)(.*)?(?:<\/style>|$)?|<(img|embed|audio|video|object|source)\s+([^>]*)?\/?>|<link\s+(?:.*)?href\s*\=\s*('[^']+'|"[^"]+"|[^\s]+)(?:.*)?(?=\/?>)|<!--\s*@inline\s+(.*)?\s*-->/gi;
	content.replace(reg, function(match, scriptSrcType, scriptValue, styleType, styleValue, imgType, imgSrc, link, inline) {
		// console.log(match, 1,scriptSrcType, 2,scriptValue, 3,styleType, 4,styleValue, 5,imgType, 6,imgSrc, 7,link, 8,inline)
	})

}