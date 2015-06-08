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

/*
* buildOrder
*/
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
	'height',
	'color',
	'bgcolor',
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

/*
* blueprints
*/
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
			if(spec===null) spec = 10;
			return 'position:relative;clear:both;margin:-_px 0px 0px 0px;width:100%;height:_px;padding:0px;'.replace(/_/g, spec);
		},
		nthProperties: function(spec, n) {
			return 'height:_px;margin-top:-_px;'.replace(/_/g, spec);
		}
	},
	footerspacer: {
		staticSelectors: ['.footerspacer'],
		rootProperties: function(spec) {
			if(spec===null) spec = 10;
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
			if(spec===null) spec = 0;
			var tokens = spec.split('x');
			if(tokens.length===1) {
				return 'width:_%;'.replace(/_/g, tokens[0]);
			} else {
				return 'width:_px;'.replace(/_/g, tokens[0]);
			}
		}
	},
	height: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			if(spec===null) spec = 0;
			var tokens = spec.split('x');
			if(tokens.length===1) {
				return 'height:_%;'.replace(/_/g, tokens[0]);
			} else {
				return 'height:_px;'.replace(/_/g, tokens[0]);
			}
		}
	},
	color: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			if(spec===null) spec = '000';
			return 'color:#_;'.replace(/_/g, spec);
		}
	},
	bgcolor: {
		selectorPrefixes: ['.'],
		nthProperties: function(spec, n) {
			if(spec===null) spec = 'FFF';
			return 'background-color:#_;'.replace(/_/g, spec);
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

/*
* scanner
*/
(function() {
	
	// key = str
	// return = [str, str, ...]
	function getStoredTokens(key) {
		var tokens = localStorage.getItem(key);
		return (tokens===null) ? [] : tokens.split(',');
	};
	
	// key = str :: tokens = [str, str, ...]
	function setStoredTokens(key, tokens) {
		localStorage.setItem(key, tokens.join(','));
	};
	
	// key = str
	function clearStoredTokens(key) {
		localStorage.removeItem(key);
	};
	
	// source = DOM element
	// return = [str, str, ...]
	function getLiveTokens(source) {
		var i, j, 
			tokens = [], 
			slug, slugs, 
			elements = source.getElementsByTagName('*');
		for(i=0; i<elements.length; i++) {
			slug = elements[i].className.trim();
			slugs = (slug==='') ? [] : slug.split(/[ ]+/);
			for(j=0; j<slugs.length; j++) {
				tokens.push(slugs[j]);
			}
		}
		return tokens;
	};
	
	// tokens1 = [str, str, ...] :: tokens2 = [str, str, ...]
	// return = [str, str, ...]
	function getUniqueTokens(tokens1, tokens2) {
		var i, 
			sorted = (tokens1 && tokens2) ? tokens1.concat(tokens2).sort() : tokens1.sort(), 
			unique = [], 
			lastToken;
		for(i=0; i<sorted.length; i++) {
			if(sorted[i] !== lastToken) {
				lastToken = sorted[i];
				unique.push(sorted[i]);
			}
		}
		return unique;
	};
	
	/*
	*
	*/
	
	// storageKey = null | str
	var scanner = function(storageKey) {
		this.storageKey = (storageKey) ? storageKey : 'esoCssScanner';
	};
	
	// source = null | dom element
	// return = [str, ...]
	scanner.prototype.scan = function(source) {
		var source = (source) ? source : document.body,
			liveTokens = getLiveTokens(source),
			uniqueTokens = getUniqueTokens(liveTokens, []);
		return uniqueTokens;
	}
	
	// source = null | dom element
	// return = [str, ...]
	scanner.prototype.report = function(source) {
		var source = (source) ? source : document.body,
			liveTokens = getLiveTokens(source),
			storedTokens = getStoredTokens(this.storageKey),
			uniqueTokens = getUniqueTokens(liveTokens, storedTokens);
		setStoredTokens(this.storageKey, uniqueTokens);
		return uniqueTokens;
	}
	
	// 
	scanner.prototype.clean = function() {
		clearStoredTokens(this.storageKey);
	}
	
	//
	esocss.scanner = scanner;
	
})();

/*
* builder
*/
(function() {
	
	// bluprint = object
	// return = str || null ? no blueprint or upstream pattern
	function getUpstreamPattern(blueprint) {
		if(blueprint && blueprint.upstreamPattern) {
			return blueprint.upstreamPattern;
		}
		return null;
	}
	
	// bluprint = object
	// return = str || null ? no blueprint or downstream pattern
	function getDownstreamPattern(blueprint) {
		if(blueprint && blueprint.downstreamPattern) {
			return blueprint.downstreamPattern;
		}
		return null;
	}
	
	// blueprint = {} :: projects = [str, str, ...]
	// return = str :: return = null ? no selectors
	function getSelectors(blueprint, projects) {
		var i, j, k, selectors = [];
		if(blueprint && blueprint.staticSelectors) {
			selectors = blueprint.staticSelectors;
		}
		if(blueprint && blueprint.selectorPrefixes && blueprint.selectorPostfixes) {
			for(i=0; i<projects.length; i++) {
				for(j=0; j<blueprint.selectorPrefixes.length; j++) {
					for(k=0; k<blueprint.selectorPostfixes.length; k++) {
						selectors.push(blueprint.selectorPrefixes[j] + projects[i] + blueprint.selectorPostfixes[k]);
					}
				}
			}
		} else if(blueprint && blueprint.selectorPrefixes) {
			for(i=0; i<projects.length; i++) {
				for(j=0; j<blueprint.selectorPrefixes.length; j++) {
					selectors.push(blueprint.selectorPrefixes[j] + projects[i]);
				}
			}
		} else if(blueprint && blueprint.selectorPostfixes) {
			for(i=0; i<projects.length; i++) {
				for(j=0; j<blueprint.selectorPostfixes.length; j++) {
					selectors.push(projects[i] + blueprint.selectorPostfixes[j]);
				}
			}
		}
		if(selectors.length !== 0) {
			return selectors.join(', ');
		} else {
			return null;
		}
	}
	
	// blueprint = {} :: spec = int | str :: depth = int
	// return = str :: return = null ? no properties for spec and depth
	function getProperties(blueprint, spec, depth) {
		if(depth === 0 && blueprint && blueprint.rootProperties) {
			return blueprint.rootProperties(spec);
		} else if(blueprint && blueprint.nthProperties) {
			return blueprint.nthProperties(spec, depth);
		}
		return null;
	}
	
	/*
	*
	*/
	
	// blueprints = null | {}
	var builder = function(buildOrder, blueprints) {
		this.buildOrder = (buildOrder) ? buildOrder : [];
		this.blueprints = (blueprints) ? blueprints : {};
	};
	
	// pattern = str :: projects = [str, str, ...] :: spec = int | str :: depth = int
	// return = str
	builder.prototype.build = function(pattern, projects, spec, depth) {
		var css = '',
			upstreamPattern = getUpstreamPattern(this.blueprints[pattern]),
			downstreamPattern = getDownstreamPattern(this.blueprints[pattern]),
			selectors = getSelectors(this.blueprints[pattern], projects),
			properties = getProperties(this.blueprints[pattern], spec, depth);
		if(upstreamPattern) {
			css += this.build(upstreamPattern, projects, spec, depth);
		}
		if(selectors && properties) {
			css += selectors + ' {' + properties + '}';
		}
		if(downstreamPattern) {
			css += this.build(downstreamPattern, projects, spec, depth);
		}
		return css;
	};
	
	//
	esocss.builder = builder;
	
})();

/*
* generator
*/
(function() {
	
	// cutoff = null | int
	// return = str :: return = null ? cutoff null
	function getMediaQuery(cutoff) {
		if(cutoff) {
			return '@media screen and (max-width:' + cutoff + 'px)';
		}
		return null;
	}
	
	// projects = [str, str, ...] :: depth = int
	// return = {pattern: {spec: [project, ...]}, ...}
	function getClusters(projects, depth) {
		var i,
		clusters = {},
		tokens;
		for(i=0; i<projects.length; i++) {
			tokens = projects[i].split('-');
			if(depth === 0 || tokens[depth+1]) {
				if(!clusters[tokens[0]]) {
					clusters[tokens[0]] = {};
				}
				if(!clusters[tokens[0]][tokens[depth+1]]) {
					clusters[tokens[0]][tokens[depth+1]] = [];
				}
				clusters[tokens[0]][tokens[depth+1]].push(projects[i]);
			}
		}
		return clusters;
	}
	
	// builder = object :: clusters = {pattern: {spec: [project, ...]}, ...} :: depth = int
	// return = str
	function getCss(builder, clusters, depth) {
		var i, j, css = '',
			pattern, cluster, projects, spec,
			builderOrder = builder.buildOrder;
		for(i=0; i<buildOrder.length; i++) {
			pattern = builderOrder[i];
			cluster = clusters[pattern];
			for(spec in cluster) {
				projects = cluster[spec];
				css += builder.build(pattern, projects, spec, depth);
			}
		}
		return css;
	}
	
	/*
	*
	*/
	
	// 
	var generator = function() {
		
	};
	
	// builder = object :: projects = [str, str, ...] :: regions = [null, int, int, ...]
	// return = str
	generator.prototype.generate = function(builder, projects, regions) {
		var i, j, css = '',
			regionQuery, regionClusters, regionCss;
		for(i=0; i<regions.length; i++) {
			regionQuery = getMediaQuery(regions[i]);
			regionClusters = getClusters(projects, i);
			regionCss = getCss(builder, regionClusters, i);
			if(regionCss && regionQuery) {
				css += regionQuery + ' {' + regionCss + '}';
			} else if(regionCss) {
				css += regionCss;
			}
		}
		return css;
	}
	
	// output = dom element :: css = str
	generator.prototype.implement = function(output, css) {
		if(output && css) {
			output.appendChild(document.createTextNode(css));
		}
	}
	
	//
	esocss.generator = generator;
	
})();
