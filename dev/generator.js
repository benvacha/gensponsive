/* esocss : github.com/esocode/esocss :: v0.0.1 : Mar 2014 :: esocode : esocode.com */

//
var esocss = esocss || {};

/*
*
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