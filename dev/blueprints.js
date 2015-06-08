/* esocss : github.com/esocode/esocss :: v0.0.1 : Mar 2014 :: esocode : esocode.com */

//
var esocss = esocss || {};

/*
	pattern: {
		upstreamPattern: 'pattern',
		downstreamPattern: 'pattern',
		staticSelectors: ['static', 'static', ...],
		selectorPrefixes: ['.', 'prefix', 'prefix', ...],
		selectorPostfixes: ['postfix', 'postfix', ...],
		rootProperties: function(spec) {
			return 'properties';
			return null;
		},
		nthProperties: function(spec, n) {
			return 'properties';
			return null;
		}
	}
*/

//
esocss.buildOrder = [
	'body',
	'footer',
	'grid',
	'col',
	'clear',
	'hide',
	'show',
	'pos',
	'width',
	'widthx',
	'height',
	'heightx',
	'pad',
	'padtb',
	'padlr',
	'padt',
	'padr',
	'padb',
	'padl',
	'push',
	'pushtb',
	'pushlr',
	'pusht',
	'pushr',
	'pushb',
	'pushl'
];

//
esocss.blueprints = {
	html: {
		staticSelectors: ['html', 'body'],
		rootProperties: function(spec) {
			return 'margin:0px;width:100%;height:100% !important;height:auto;min-height:100%;';
		}
	},
	body: {
		upstreamPattern: 'html',
		selectorPrefixes: ['.'],
		rootProperties: function(spec) {
			return 'position:relative;margin:0px;width:100%;height:auto !important;height:100%;min-height:100%;';
		}
	},
	footer: {
		downstreamPattern: 'footerspacer',
		selectorPrefixes: ['.'],
		rootProperties: function(spec) {
			return 'position:relative;clear:both;margin:-_px 0px 0px 0px;width:100%;height:_px;padding:0px;'.replace(/_/g, spec);
		},
		nthProperties: function(spec, n) {
			return 'height:_px;margin-top:-_px;'.replace(/_/g, spec);
		}
	},
	footerspacer: {
		staticSelectors: ['.footerspacer'],
		rootProperties: function(spec) {
			return 'position:relative;clear:both;margin:0px;width:100%;height:_px;padding:0px;'.replace(/_/g, spec);
		},
		nthProperties: function(spec, n) {
			return 'height:_px;'.replace(/_/g, spec);
		}
	},
	grid: {
		downstreamPattern: 'gridafter',
		selectorPrefixes: ['.'],
		rootProperties: function(spec) {
			return 'position:relative;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-background-clip:padding;-moz-background-clip:padding;background-clip:padding-box;';
		}
	},
	gridafter: {
		selectorPrefixes: ['.'],
		selectorPostfixes: [':after'],
		rootProperties: function(spec) {
			return "content:'';display:block;clear:both;";
		}
	},
	col: {
		downstreamPattern: 'colafter',
		selectorPrefixes: ['.'],
		rootProperties: function(spec) {
			return 'position:relative;display:block;float:left;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-background-clip:padding;-moz-background-clip:padding;background-clip:padding-box;';
		}
	},
	colafter: {
		selectorPrefixes: ['.'],
		selectorPostfixes: [':after'],
		rootProperties: function(spec) {
			return "content:'';display:block;clear:both;";
		}
	},
	clear: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			if(spec === 'f') {
				return 'clear:none;height:0px;';
			}
			return 'clear:both;height:_px;'.replace(/_/g, spec);
		}
	},
	hide: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			if(spec === 't') {
				return 'display:none;';
			} else if(spec === 'f') {
				return 'display:block;';
			}
		}
	},
	show: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			if(spec === 't') {
				return 'display:block;';
			} else if(spec === 'f') {
				return 'display:none;';
			}
		}
	},
	pos: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			if(spec === 'l') {
				return 'float:left;';
			} else if(spec === 'r') {
				return 'float:right;';
			} else if(spec === 'c') {
				return 'float:none;margin-left:auto;margin-right:auto;';
			}
		}
	},
	width: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'width:_%;'.replace(/_/g, spec);
		}
	},
	widthx: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'width:_px;'.replace(/_/g, spec);
		}
	},
	height: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'height:_%;'.replace(/_/g, spec);
		}
	},
	heightx: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'height:_px;'.replace(/_/g, spec);
		}
	},
	pad: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'padding:_px;'.replace(/_/g, spec);
		}
	},
	padtb: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'padding-top:_px;padding-bottom:_px;'.replace(/_/g, spec);
		}
	},
	padlr: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'padding-left:_px;padding-right:_px;'.replace(/_/g, spec);
		}
	},
	padt: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'padding-top:_px;'.replace(/_/g, spec);
		}
	},
	padr: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'padding-right:_px;'.replace(/_/g, spec);
		}
	},
	padb: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'padding-bottom:_px;'.replace(/_/g, spec);
		}
	},
	padl: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'padding-left:_px;'.replace(/_/g, spec);
		}
	},
	push: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'border:_px solid transparent;'.replace(/_/g, spec);
		}
	},
	pushtb: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'border-top:_px solid transparent;border-bottom:_px solid transparent;'.replace(/_/g, spec);
		}
	},
	pushlr: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'border-left:_px solid transparent;border-right:_px solid transparent;'.replace(/_/g, spec);
		}
	},
	pusht: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'border-top:_px solid transparent;'.replace(/_/g, spec);
		}
	},
	pushr: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'border-right:_px solid transparent;'.replace(/_/g, spec);
		}
	},
	pushb: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'border-bottom:_px solid transparent;'.replace(/_/g, spec);
		}
	},
	pushl: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			return 'border-left:_px solid transparent;'.replace(/_/g, spec);
		}
	}
};
